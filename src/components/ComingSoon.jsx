import {formatDateToMonthYear} from "~utils/DateTimerHelper.jsx";
import {useEffect, useState} from "react";
import {Link} from "react-router";

export const ComingSoon = () => {



    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/movie/upcoming", {
                    method: "GET",
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const result = await response.json();
                const dataResult = result.results
                setData(dataResult);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div  className={"coming_soon-movies"}>
                <h2>Coming Soon</h2>
                <div className={"coming_soon-movies__container"}>
                    {
                        data.map(result => {
                            return (
                                <Link key={result.id} to={`/details/${result.id}`}>
                                    <div>
                                        <img className={"coming_soon-movies__image"}
                                             src={"https://image.tmdb.org/t/p/w1920/" + result.poster_path}
                                             alt={result.title}/>
                                        <h2 className={"coming_soon-movies__title"}>{result.title}</h2>
                                        <p className={"coming_soon-movies__date"}>{formatDateToMonthYear(result.release_date)}</p>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}