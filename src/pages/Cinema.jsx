import {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router";
import CinemaComponent from "~components/CinemaComponent.jsx";
import {HeaderNavigation} from "~components/HeaderNavigation.jsx";
import "~style/components/CinemaDropdown.scss";
import {ActionButton} from "~components/ActionButton.jsx";

const CINEMA_API_URL = "https://cdn.jsdelivr.net/gh/Sh3dow-ware/cinema-data@v1.0.1/cinema-data.json";

const CustomDropdown = ({cinemas, selectedIndex, setSelectedIndex}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);


    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const onSelect = (index) => {
        setSelectedIndex(index);
        setIsOpen(false);
    };

    return (
        <div className="cinema-selector" ref={dropdownRef}>
            <h1 className="cinema-selector__title">Select a Cinema</h1>

            <div
                className="cinema-selector__custom-dropdown"
                onClick={toggleDropdown}
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleDropdown();
                    }
                }}
                role="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className="cinema-selector__custom-selected">
                    {cinemas[selectedIndex]?.name || "Select a cinema"}
                </span>
                <span className={`cinema-selector__arrow ${isOpen ? "open" : ""}`}>&#9662;</span>
            </div>

            {isOpen && (
                <ul className="cinema-selector__custom-options" role="listbox" tabIndex={-1}>
                    {cinemas.map((cinema, index) => (
                        <li
                            key={cinema.name}
                            className={`cinema-selector__custom-option ${index === selectedIndex ? "selected" : ""}`}
                            onClick={() => onSelect(index)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    onSelect(index);
                                }
                            }}
                            tabIndex={0}
                            role="option"
                            aria-selected={index === selectedIndex}
                        >
                            {cinema.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const Cinema = () => {
    const location = useLocation();
    const movie = location.state?.movie;
    const navigate = useNavigate();

    const [cinemas, setCinemas] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [selectedSeats, setSelectedSeats] = useState([]);

    const handleCheckoutClick = () => {
        if (selectedSeats.length === 0) {
            alert("You must select at least one seat before continuing to checkout!");
            return;
        }
        console.log(selectedSeats, movie, selectedCinema)
        navigate("/checkout", {state: {movie, selectedCinema, selectedSeats}});
    };


    useEffect(() => {
        fetch(CINEMA_API_URL)
            .then((res) => res.json())
            .then((data) => {
                setCinemas(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Failed to fetch cinema data:", error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading cinemas...</div>;
    if (!cinemas.length) return <div>No cinema data found.</div>;

    const selectedCinema = cinemas[selectedIndex];

    return (
        <>
            <HeaderNavigation title={"Select seats"} link={"/"}/>

            {movie ? (
                <div className="movie-summary" style={{marginBottom: "20px"}}>
                    <h2>{movie.title}</h2>
                    <img
                        src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                        alt={movie.title}
                        style={{maxWidth: "150px", borderRadius: "8px"}}
                    />
                    <p>{movie.overview}</p>
                </div>
            ) : (
                <p>No movie selected.</p>
            )}

            <CustomDropdown
                cinemas={cinemas}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
            />

            <div style={{marginTop: "20px"}}>
                <CinemaComponent rows={selectedCinema["cinema-rows"]}
                                 ocupiedSeats={[]}
                                 onSelectSeats={setSelectedSeats}/>
            </div>

            <ActionButton
                onClick={handleCheckoutClick}
                anchorTagClass={"standard"}
                buttonClass={"standard__button"}
                text={"Checkout"}
            />
        </>
    );
};

export default Cinema;
