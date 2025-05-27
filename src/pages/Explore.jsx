import { HeaderNavigation } from "~components/HeaderNavigation";
import { NavigationBar } from "~components/NavigationBar.jsx";
import { IoIosSearch } from "react-icons/io";
import "~style/components/Explore.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const DiscoverPage = () => {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [activeTab, setActiveTab] = useState("now");

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const url = activeTab === "now"
                    ? "http://localhost:3000/movie/popular"
                    : "http://localhost:3000/movie/upcoming";

                const [movieRes, genreRes] = await Promise.all([
                    fetch(url),
                    fetch("http://localhost:3000/genre/movie/list")
                ]);

                const movieData = await movieRes.json();
                const genreData = await genreRes.json();

                setMovies(movieData.results);
                setGenres(genreData.genres);
            } catch (err) {
                console.error("Failed to fetch movies:", err);
            }
        };

        fetchMovies();
    }, [activeTab]);

    return (
        <>
            <HeaderNavigation title={"Explore"} link={"/"} element={<IoIosSearch size={24} />} />

            <div className="tab-switcher">
                <div className="tab-container">
                    <div
                        className={`tab ${activeTab === "now" ? "active" : ""}`}
                        onClick={() => setActiveTab("now")}
                    >
                        Now Showing
                    </div>
                    <div
                        className={`tab ${activeTab === "upcoming" ? "active" : ""}`}
                        onClick={() => setActiveTab("upcoming")}
                    >
                        Upcoming
                    </div>
                </div>
            </div>

            <div className={"top-movies"}>
                <div className={"top-movies__heading"}>
                    <h2>{activeTab === "now" ? "Top Movies" : "Upcoming Movies"}</h2>
                    <p>See more</p>
                </div>
                <div className="top-movies__section">
                    {movies.map((movie) => (
                        <div key={movie.id} className="top-movies__movie">
                            <Link to={`/details/${movie.id}`}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    className="top-movies__image"
                                />
                            </Link>
                            <p className="top-movies__title">{movie.title}</p>
                            <div className="top-movies__stars">
                                <div
                                    style={{ width: `${(movie.vote_average / 10) * 100}%` }}
                                    className="top-movies__rating"
                                >
                                    <span>★★★★★</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={"recommend"}>
                <div className={"recommend__heading"}>
                    <h2>Recommended</h2>
                    <p>See more</p>
                </div>
                <div className={"recommend__section"}>
                    {movies.map((movie) => (
                        <div key={movie.id} className="recommend__section__movie">
                            <Link to={`/details/${movie.id}`}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    className="recommend__section__image"
                                />
                            </Link>
                            <p className="recommend__section__title">{movie.title}</p>
                            <p className="recommend__section__genre">
                                {genres.find((genre) => genre.id === movie.genre_ids[0])?.name || 'Unknown'}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <NavigationBar />
        </>
    );
};

export default DiscoverPage;



