import {ActionButton} from "~components/ActionButton.jsx";
import { HeaderNavigation } from "~components/HeaderNavigation";
import {NavigationBar} from "~components/NavigationBar.jsx";

const discoverPage = () => {
    return (
        <>
            <ActionButton text={"Checkout"} anchorTagClass={"standard"} buttonClass={"standard__button"}></ActionButton>
            <ActionButton text={"Go Back To Page"} anchorTagClass={"backButton"} buttonClass={"backButton__button"}></ActionButton>
            <HeaderNavigation title={"Explore"} link={"/home"} element={<h2>Hej</h2>}></HeaderNavigation>
            <NavigationBar></NavigationBar>
        </>
    )
}

export default discoverPage;