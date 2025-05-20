import Fastify from 'fastify';
import cors from '@fastify/cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const fastify = Fastify({ logger: true });
await fastify.register(cors);

// Config of ENV to get API KEY
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

if (!TMDB_API_KEY) {
    throw new Error('TMDB_API_KEY is missing. Fix your .env file or create .env file');
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


fastify.get('/', async () => {
    return { message: '🎬 TMDB Fastify API is ready for action' };
});

fastify.get('/movie/:id', {
    schema: { params: movieIdParam },
}, async (req, reply) => {
    const { id } = req.params;
    const { data } = await tmdb.get(`/movie/${id}`);
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

// Start Function Boots our server with fastify
const start = async () => {
    try {
        const port = process.env.PORT || 3000;
        await fastify.listen({ port });
        console.log(`Server is running at http://localhost:${port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
