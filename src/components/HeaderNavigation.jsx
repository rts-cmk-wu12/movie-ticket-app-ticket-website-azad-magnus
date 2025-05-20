import { MdArrowBackIos } from "react-icons/md";
import "~style/components/HeaderNavigation.scss";

export const HeaderNavigation = () => {
    return (
        <>
        <div className="header">
           <MdArrowBackIos className="arrowback"/>
           <h1 className="headline-in-settings">Settings</h1>
           </div>
        </>
    )
}

