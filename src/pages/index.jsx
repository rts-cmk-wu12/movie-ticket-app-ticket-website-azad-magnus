import {NavigationBar} from "~components/NavigationBar.jsx";
import ProfilePicture from "~assets/svg/ProfilePicture.png";
import "~style/components/WelcomeIntroduction.scss";
import {SearchBar} from "~components/SearchBar.jsx";
import "~style/components/ComingSoon.scss"
import {ComingSoon} from "~components/ComingSoon.jsx";
const mainPage = () => {
    return (
        <>
            <div className={"welcome-introduction"}>
                <div>
                    <p>Welcome Back,</p>
                    <p>Name</p>
                </div>
                <img className={"welcome-introduction__image"} src={ProfilePicture} alt="Profile Picture"/>
            </div>

            <SearchBar></SearchBar>
            <ComingSoon></ComingSoon>
            <NavigationBar></NavigationBar>
        </>
    )
}

export default mainPage;