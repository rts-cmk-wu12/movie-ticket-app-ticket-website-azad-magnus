import HomeIcon from "~assets/svg/Home.svg?react";
import BookmarkIcon from "~assets/svg/Bookmark.svg?react";
import DiscoverIcon from "~assets/svg/Discovery.svg?react";
import ProfileIcon from "~assets/svg/Profile.svg?react";
import "~style/components/NavigationBar.scss";
import { Link, useLocation } from "react-router";

const icons = [HomeIcon, DiscoverIcon,  BookmarkIcon, ProfileIcon];
const routes = ["/", "/Explore", "/Plan", "/Settings"];

export const NavigationBar = () => {
    const location = useLocation();

    return (
        <div className="navigation-bar">
            {icons.map((Icon, index) => {
                const isActive = location.pathname === routes[index];
                return (
                    <Link to={routes[index]} key={index}>
                        <Icon
                            className={`navigation-bar__icon${isActive ? " navigation-bar__icon--active" : ""}`}
                        />
                    </Link>
                );
            })}
        </div>
    );
};
