import {ActionButton} from "~components/ActionButton.jsx";

const mainPage = () => {
    return (
        <div>
            <h2>Hello World!</h2>
            <ActionButton text={"Checkout"} anchorTagClass={"standard"} buttonClass={"standard__button"}></ActionButton>
            <ActionButton text={"Go Back To Page"} anchorTagClass={"backButton"} buttonClass={"backButton__button"}></ActionButton>
        </div>
    )
}

export default mainPage;