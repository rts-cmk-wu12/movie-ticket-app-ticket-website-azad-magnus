import {ActionButton} from "~components/ActionButton.jsx";
import {NavigationBar} from "~components/NavigationBar.jsx";

const discoverPage = () => {
    return (
        <>
            <ActionButton text={"Checkout"} anchorTagClass={"standard"} buttonClass={"standard__button"}></ActionButton>
            <ActionButton text={"Go Back To Page"} anchorTagClass={"backButton"} buttonClass={"backButton__button"}></ActionButton>
            <NavigationBar></NavigationBar>
        </>
    )
}

export default discoverPage;