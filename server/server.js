import Fastify from 'fastify';
import cors from '@fastify/cors';
import axios from 'axios';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import crypto from 'crypto';
import path from "path";
import {fileURLToPath} from 'url';
import fastifyStatic from '@fastify/static';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({path: 'server/.env'});

const fastify = Fastify({ logger: true });
await fastify.register(cors);

// This code just serves our frontend dist.
fastify.register(fastifyStatic, {
    root: path.join(__dirname, "../dist"),
    wildcard: true,
})

fastify.setNotFoundHandler((request, reply) => {
    reply.sendFile("index.html") // Changed it to sendfile
})


// Config of ENV to get API KEY
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

if (!TMDB_API_KEY) {
    throw new Error('TMDB_API_KEY is missing. Fix your .env file or create .env file');
}


// Encryption config
const algorithm = 'aes-256-cbc';
const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET;
if (!ENCRYPTION_SECRET) {
    throw new Error('ENCRYPTION_SECRET missing from .env — don’t play with fire!');
}
const key = crypto.scryptSync(ENCRYPTION_SECRET, 'salt', 32);

function encrypt(text) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

const tmdb = axios.create({
    baseURL: TMDB_BASE_URL,
    params: { api_key: TMDB_API_KEY },
});


const movieIdParam = {
    type: 'object',
    properties: {
        id: { type: 'string' },
    },
    required: ['id'],
};

const searchQuery = {
    type: 'object',
    properties: {
        query: { type: 'string' },
    },
    required: ['query'],
};


fastify.get('/', async (request, reply) => {
    return reply.sendFile('index.html');
});


fastify.get('/movie/:id', {
    schema: { params: movieIdParam },
}, async (req, reply) => {
    const { id } = req.params;
    const { data } = await tmdb.get(`/movie/${id}`);
    return data;
});

fastify.get('/movie/:id/credits', {
    schema: { params: movieIdParam },
}, async (req, reply) => {
    const { id } = req.params;
    const { data } = await tmdb.get(`/movie/${id}/credits`);
    return data;
});

fastify.get('/search', {
    schema: { querystring: searchQuery },
}, async (req, reply) => {
    const { query } = req.query;
    const { data } = await tmdb.get('/search/movie', { params: { query } });
    return data;
});

fastify.get('/movie/upcoming', async () => {
    const { data } = await tmdb.get('/movie/upcoming');
    return data;
});

fastify.get('/movie/now_playing', async () => {
    const { data } = await tmdb.get('/movie/now_playing');
    return data;
});

fastify.get('/movie/popular', async () => {
    const { data } = await tmdb.get('/movie/popular');
    return data;
});


fastify.get('/genre/movie/list', async () => {
    const { data } = await tmdb.get('/genre/movie/list');
    return data;
});



const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    throw new Error('MONGO_URI missing. Put it in your .env file, genius.');
}
const client = new MongoClient(MONGO_URI);
async function connectDB() {
    if (!client.isConnected?.()) {
        await client.connect();
    }
    return client.db('cinemaDB');
}

fastify.post('/api/checkout', {
    schema: {
        body: {
            type: 'object',
            required: ['movie', 'selectedCinema', 'selectedSeats', 'paymentInfo'],
            properties: {
                movie: {
                    type: 'object',
                    properties: { id: { type: 'number' }, title: { type: 'string' } },
                    required: ['id', 'title'],
                },
                selectedCinema: {
                    type: 'object',
                    properties: { name: { type: 'string' } },
                    required: ['name'],
                },
                selectedSeats: {
                    type: 'array',
                    items: { type: 'string' },
                    minItems: 1,
                },
                paymentInfo: {
                    type: 'object',
                    properties: {
                        email: { type: 'string' },
                        cardholderName: { type: 'string' },
                        cardNumber: { type: 'string' },
                        expiryDate: { type: 'string' },
                        cvv: { type: 'string' },
                    },
                    required: ['email', 'cardholderName', 'cardNumber', 'expiryDate', 'cvv'],
                },
            },
        },
    },
}, async (request, reply) => {
    try {
        const db = await connectDB();
        const checkoutCollection = db.collection('checkouts');

        const { movie, selectedCinema, selectedSeats, paymentInfo } = request.body;

        const encryptedPaymentInfo = {
            email: paymentInfo.email,
            cardholderName: paymentInfo.cardholderName,
            cardNumber: encrypt(paymentInfo.cardNumber),
            expiryDate: encrypt(paymentInfo.expiryDate),
        };

        const result = await checkoutCollection.insertOne({
            movie,
            selectedCinema,
            selectedSeats,
            paymentInfo: encryptedPaymentInfo,
            purchasedAt: new Date(),
        });

        reply.code(201).send({ message: 'Checkout successful', checkoutId: result.insertedId });
    } catch (error) {
        request.log.error(error);
        reply.code(500).send({ error: 'Failed to save checkout data' });
    }
});


fastify.get('/api/getUnavailableSeats', {
    schema: {
        querystring: {
            type: 'object',
            required: ['movieId', 'cinemaName'],
            properties: {
                movieId: { type: 'number' },
                cinemaName: { type: 'string' }
            }
        }
    }
}, async (request, reply) => {
    try {
        const db = await connectDB();
        const checkoutCollection = db.collection('checkouts');

        const { movieId, cinemaName } = request.query;

        const checkouts = await checkoutCollection.find({
            'movie.id': movieId,
            'selectedCinema.name': cinemaName
        }).toArray();

        const allSeats = checkouts.flatMap(entry => entry.selectedSeats || []);

        reply.send({ unavailableSeats: allSeats });
    } catch (error) {
        request.log.error(error);
        reply.code(500).send({ error: 'Failed to fetch unavailable seats' });
    }
});


// Start Function Boots our server with fastify
const start = async () => {
    try {
        const port = process.env.PORT || 3000;
        await fastify.listen({ port, host: '0.0.0.0' });
        console.log(`Server is running at http://0.0.0.0:${port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();