import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import "~style/components/movie-details.scss";
import { HeaderNavigation } from "~components/HeaderNavigation";
import { BsBookmarkDash } from "react-icons/bs";
import { IoIosStar } from "react-icons/io";
import { ActionButton } from "~components/ActionButton.jsx";
import {getApiUrl} from "~utils/ApiUrl.jsx";

const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [director, setDirector] = useState("Unknown");

    useEffect(() => {
        const fetchMovieAndDirector = async () => {
            try {
                const movieRes = await fetch(getApiUrl(`movie/${id}`));
                if (!movieRes.ok) throw new Error("Failed to fetch movie");

                const movieData = await movieRes.json();

                const creditsRes = await fetch(getApiUrl(`movie/${id}/credits`));
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

    const handleBook = () => {
        navigate("/Cinema", { state: { movie } });
    };

    return (
        <>
            <HeaderNavigation
                title={"Details Movie"}
                link={"/"}
                element={<BsBookmarkDash className="bookmark" />}
            />

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
                        return `${DirectorName}: ${directors.map(person => person.name).join(", ")}`;
                    })()}
                    <span className="movie-details__rating-divider">|</span>
                    <IoIosStar className="movie-details__rating-star" />
                    {movie.vote_average.toFixed(1)}
                </p>

                <div className="movie-details__overview">
                    <p className="movie-details__genres">
                        {movie.genres.map((genre, index) => (
                            <span key={index} className="movie-details__genre">
                                {genre.name}
                            </span>
                        ))}
                    </p>

                    <p className="movie-details__runtime">
                        {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                    </p>
                </div>

                <h2 className="movie-details__title-under-genre">Synopsis</h2>

                <p className="movie-details__synopsis">
                    {movie.overview}
                </p>

                <ActionButton
                    onClick={handleBook}
                    anchorTagClass={"book"}
                    buttonClass={"book__button"}
                    text={"Book Ticket"}
                />
            </div>
        </>
    );
};

export default MovieDetails;
