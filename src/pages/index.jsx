import {NavigationBar} from "~components/NavigationBar.jsx";
import ProfilePicture from "~assets/svg/ProfilePicture.png";
import "~style/components/WelcomeIntroduction.scss";
import {SearchBar} from "~components/SearchBar.jsx";

const mainPage = () => {
    return (
        <>
            <div className={"welcome-introduction"}>
                <div>
                    <p>Welcome Back,</p>
                    <p>Name</p>
                </div>
                <img className={"welcome-introduction__image"} src={ProfilePicture} alt="Profile Picture" />
            </div>

            <SearchBar></SearchBar>

            <NavigationBar></NavigationBar>
        </>
    )
}

export default mainPage;