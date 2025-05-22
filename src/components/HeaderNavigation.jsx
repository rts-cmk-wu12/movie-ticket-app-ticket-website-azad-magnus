import { MdArrowBackIos } from "react-icons/md";
import { Link } from "react-router";
import "~style/components/HeaderNavigation.scss";

export const HeaderNavigation = ({title , link, element}) => {
    return (
        <>
        <div className="header">
           <Link to={link}><MdArrowBackIos className="arrowback"/></Link>
           <h1 className="headline-in-settings">{title}</h1>
           {element}
           </div>
        </>
    )
}

