import {NavigationBar} from "~components/NavigationBar.jsx";
import { HeaderNavigation } from "~components/HeaderNavigation";

const bookmarksPage = () => {
    return (
        <>
            <HeaderNavigation title={"Saved Plan"} link={"/"} ></HeaderNavigation>
            
           
            <NavigationBar></NavigationBar>
        </>
    )
}

export default bookmarksPage;