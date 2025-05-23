import {NavigationBar} from "~components/NavigationBar.jsx";
import ProfilePicture from "~assets/svg/ProfilePicture.png";
import "~style/components/WelcomeIntroduction.scss";
import {SearchBar} from "~components/SearchBar.jsx";
import "~style/components/ComingSoon.scss"
import {ComingSoon} from "~components/ComingSoon.jsx";
import {CinemaNear} from "~components/CinemaNear.jsx";
import {useEffect, useState} from "react";


const mainPage = () => {
    const CINEMA_DATA_URL = "https://raw.githubusercontent.com/Sh3dow-ware/cinema-data/main/cinema-data.json"
    const [cinemas, setCinemas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(CINEMA_DATA_URL)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch cinema data");
                return res.json();
            })
            .then((data) => {
                const enrichedData = data.map((cinema) => ({
                    ...cinema, image: cinema.image,
                }));
                setCinemas(enrichedData);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return null;
    if (error) return null;


    return (<>
            <div className={"welcome-introduction"}>
                <div>
                    <p>Welcome Back,</p>
                    <p>Name</p>
                </div>
                <img className={"welcome-introduction__image"} src={ProfilePicture} alt="Profile Picture"/>
            </div>

            <SearchBar></SearchBar>
            <ComingSoon></ComingSoon>
            <div className={"cinema__section"}>
                <div className={"cinema-header"}>
                    <h2>Cinema near you</h2>
                    <p>See all</p>
                </div>
                {cinemas.map((cinema) => (<CinemaNear key={cinema.name} cinema={cinema}/>))}
            </div>
            <NavigationBar></NavigationBar>
        </>)
}

export default mainPage;