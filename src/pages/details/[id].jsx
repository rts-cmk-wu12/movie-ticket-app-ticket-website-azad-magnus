import { useParams } from "react-router";
import { useEffect, useState } from "react";
import "~style/components/movie-details.scss";
import { HeaderNavigation } from "~components/HeaderNavigation";
import { BsBookmarkDash } from "react-icons/bs";

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [director, setDirector] = useState("Unknown");

    useEffect(() => {
        const fetchMovieAndDirector = async () => {
            try {
                const movieRes = await fetch(`http://localhost:3000/movie/${id}`);
                if (!movieRes.ok) throw new Error("Failed to fetch movie");

                const movieData = await movieRes.json();

                const creditsRes = await fetch(`http://localhost:3000/movie/${id}/credits`);
                if (!creditsRes.ok) throw new Error("Failed to fetch credits");

                const creditsData = await creditsRes.json();

                setMovie(movieData);
                setDirector(creditsData);
            } catch (error) {
                console.error("Error fetching movie or director:", error);
            }
        };

        fetchMovieAndDirector();
    }, [id]);

    if (!movie) return null;

    console.log(director.crew[0])

    return (

        <>
        <HeaderNavigation title={"Details Movie"} link={"/home"} element={<BsBookmarkDash />}></HeaderNavigation>
        
        <div className="movie-details">
            <img
                className="movie-details__image"
                src={`https://image.tmdb.org/t/p/w1920/${movie.poster_path}`}
                alt={movie.title}
            />
            <h2 className="movie-details__title">{movie.title}</h2>
            <p className="movie-details__director">
                {(() => {
                    const directors = director.crew.filter(personJob => personJob.job === "Director");
                    const DirectorName = directors.length === 1 ? "Director" : "Directors";
                    return `${DirectorName}: ${directors.map(person => person.name).join(', ')}`;
                })()}
            </p>

        </div>
        </>
    );
};

export default MovieDetails;
