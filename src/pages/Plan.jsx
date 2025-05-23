import {ActionButton} from "~components/ActionButton.jsx";
import {NavigationBar} from "~components/NavigationBar.jsx";

const bookmarksPage = () => {
    return (
        <>
            <ActionButton text={"Checkout"} anchorTagClass={"standard"} buttonClass={"standard__button"}></ActionButton>
            <ActionButton text={"Go Back To Page"} anchorTagClass={"backButton"} buttonClass={"backButton__button"}></ActionButton>
            <NavigationBar></NavigationBar>
        </>
    )
}

export default bookmarksPage;