import React, { useEffect, useState } from "react";
import "~style/components/CinemaNear.scss";
export const CinemaNear = ({ cinema }) => {
    const [status, setStatus] = useState("loading");
    const [closingTime, setClosingTime] = useState(null);
    const [distance] = useState((Math.random() * 10).toFixed(1));

    useEffect(() => {
        const now = new Date();
        const days = [
            "søndag",
            "mandag",
            "tirsdag",
            "onsdag",
            "torsdag",
            "fredag",
            "lørdag",
        ];
        const todayName = days[now.getDay()];

        let openHoursStr = null;

        if (typeof cinema.opens === "object") {
            openHoursStr = cinema.opens[todayName];
        } else if (typeof cinema.opens === "string") {
            const regex = new RegExp(
                `${todayName}.*?(\\d{1,2}[.:]\\d{2})\\s?-\\s?(\\d{1,2}[.:]\\d{2})`,
                "i"
            );
            const match = cinema.opens.match(regex);
            if (match) {
                openHoursStr = `${match[1]}-${match[2]}`;
            }
        }

        if (!openHoursStr || openHoursStr.toLowerCase().includes("lukket")) {
            setStatus("closed");
            return;
        }

        const [startStr, endStr] = openHoursStr.replace("–", "-").split("-");
        const parseTime = (str) => {
            const [h, m] = str.split(/[:.]/);
            return { h: Number(h), m: Number(m) || 0 };
        };

        const start = parseTime(startStr);
        const end = parseTime(endStr);

        const startDate = new Date();
        startDate.setHours(start.h, start.m, 0, 0);
        const endDate = new Date();
        endDate.setHours(end.h, end.m, 0, 0);

        if (endDate <= startDate) endDate.setDate(endDate.getDate() + 1);

        if (now >= startDate && now <= endDate) {
            setStatus("open");
            setClosingTime(endDate);
        } else if (startDate - now <= 15 * 60 * 1000 && startDate - now > 0) {
            setStatus("soon");
        } else {
            setStatus("closed");
        }
    }, [cinema]);

    const formatTime = (date) =>
        date?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) || "";

    return (
        <div className={"cinema-near"}>
            <img
                className={"cinema-near__image"}
                src={cinema.image}
                alt={"Cinema near you"}
            />
            <div className={"cinema-near__info"}>
                <p className={"cinema-near__distance"}>{distance} km</p>
                <p className={"cinema-near__name"}>{cinema.name}</p>
                <p className={"cinema-near__closing"}>
                    {status === "open" && `Open to: ${formatTime(closingTime)}`}
                    {status === "soon" && "Opening soon: in 15 minutes"}
                    {status === "closed" && "Closed"}
                </p>
            </div>
            <p className={"cinema-near__rating"}>⭐ {cinema.rating}</p>
        </div>
    );
};
