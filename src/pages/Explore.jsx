import {HeaderNavigation} from "~components/HeaderNavigation";
import {NavigationBar} from "~components/NavigationBar.jsx";
import {IoIosSearch} from "react-icons/io";
import "~style/components/Explore.scss"
import {useEffect, useState} from "react";
import {Link} from "react-router";


const discoverPage = () => {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchPopularMovies = async () => {
            try {
                const response = await fetch('http://localhost:3000/movie/popular');
                const data = await response.json();
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
            <NavigationBar></NavigationBar>
        </>
    )
}

export default discoverPage;