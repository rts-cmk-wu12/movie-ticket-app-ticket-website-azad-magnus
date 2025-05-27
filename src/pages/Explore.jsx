import {HeaderNavigation} from "~components/HeaderNavigation";
import {NavigationBar} from "~components/NavigationBar.jsx";
import {IoIosSearch} from "react-icons/io";
import "~style/components/Explore.scss"
import {useEffect, useState} from "react";
import {Link} from "react-router";


const discoverPage = () => {

    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchPopularMovies = async () => {
            try {
                const response = await fetch('http://localhost:3000/movie/popular');
                const genreResponse = await fetch("http://localhost:3000/genre/movie/list")

                const data = await response.json();
                const genreData = await genreResponse.json()
                console.log(genreData.genres)
                setGenres(genreData.genres);
                setMovies(data.results);
            } catch (error) {
                console.error('Failed to fetch movies:', error);
            }
        };

        fetchPopularMovies();
    }, []);


    return (
        <>
            <HeaderNavigation title={"Explore"} link={"/"} element={<IoIosSearch size={24}/>}></HeaderNavigation>

            <div className={"top-movies"}>
                <div className={"top-movies__heading"}>
                    <h2>Top Movies</h2>
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
                                    style={{width: `${(movie.vote_average / 10) * 100}%`}}
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
            <NavigationBar></NavigationBar>
        </>
    )
}

export default discoverPage;