import "~style/components/CinemaComponent.scss";
import cinemaScreen from "~assets/svg/cinemascreen.svg";
import {PopUp} from "~components/PopUp.jsx";

export default function Cinema({rows, numberOfRows = 1, ocupiedSeats}) {
    const rowLabels = "abcdefghijklmnopqrstuvwxyz".split("");
    const seatCounter = {};

    const isSeatOccupied = (seatId) => ocupiedSeats.includes(seatId);

    return (
        <div className="cinema">
            <img className="cinema__image" src={cinemaScreen} alt="Cinema screen"/>

            <div className="cinema__view">
                {rows.map((rowGroup, groupIdx) => (
                    <div
                        key={`group-${groupIdx}`}
                        style={{justifyItems: rowGroup.align}}
                        className="cinema__collection"
                    >
                        {rowGroup.rows.map((seatCount, rowIdx) => {
                            const rowLabel = rowLabels[rowIdx];
                            if (!seatCounter[rowLabel]) {
                                seatCounter[rowLabel] = 0;
                            }

                            return (
                                <div key={`row-${groupIdx}-${rowIdx}`} className="cinema__row">
                                    {Array.from({length: seatCount}).map((_, seatIdx) => {
                                        seatCounter[rowLabel] += 1;
                                        const seatId = `${rowLabel}${seatCounter[rowLabel]}`;
                                        const occupied = isSeatOccupied(seatId);

                                        return (
                                            <div
                                                key={`seat-${seatId}`}
                                                id={seatId}
                                                className={`cinema__seat ${occupied ? "cinema__seat--occupied" : ""}`}
                                                onClick={
                                                    !occupied
                                                        ? (e) =>
                                                            e.target.classList.toggle("cinema__seat--selected")
                                                        : undefined
                                                }
                                            >
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
            <ul className="cinema__list">
                <li className="cinema__listItem">Selected</li>
                <li className="cinema__listItem">Reserved</li>
                <li className="cinema__listItem">Available</li>
            </ul>
        </div>
    );
}
