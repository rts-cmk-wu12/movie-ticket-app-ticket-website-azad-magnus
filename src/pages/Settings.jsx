import {NavigationBar} from "~components/NavigationBar.jsx";
import {HeaderNavigation} from "~components/HeaderNavigation.jsx";
import ProfilePicture from "~assets/svg/ProfilePicture.png";
import "~style/components/settings.scss";
import { MdArrowForwardIos } from "react-icons/md";
import Activity from "~assets/svg/Activity.svg";
import Ticket from "~assets/svg/Ticket.svg";
import Logout from "~assets/svg/Logout.svg";
import Notification from "~assets/svg/Notification.svg";
import Delete from "~assets/svg/Delete.svg";
import AddUser from "~assets/svg/AddUser.svg";


const profilePage = () => {
    return (
        <>
      <HeaderNavigation></HeaderNavigation>
            <div className="profile-section">
                <div className="profile-section-container">
                <img className={"welcome-introduction__image"} src={ProfilePicture} alt="Profile Picture" />
                <div className="profile-section-text">
               <h2>Miles Morales</h2>
               <h3>Film Hunter</h3> 
               </div>
               </div>
                <div>  
                      <MdArrowForwardIos className="arrow-icon" />
                </div>

            </div>

            <span className="line"></span>

<div className="account">
        <h2>Account</h2>
<div className="section-under-account">
<img className={"perosnal-data-image"} src={Activity} alt="Data Picture" />
<p>Personal Data</p>
<MdArrowForwardIos />
</div>

<div className="section-under-account">
<img className={"email-data-image"} src={AddUser} alt="AddUser Picture" />
<p>Email & Payment</p>
<MdArrowForwardIos />
</div>

<div className="section-under-account">
<img className={"delete-data-image"} src={Delete} alt="Delete Picture" />
<p>Deactive Account</p>
<MdArrowForwardIos />
</div>
     </div>       

     <span className="line"> </span>
    
    <div className="privacy">
        <h2>Privacy & Policy</h2>
<div className="section-under-privacy">
<img className={"Notification-data-image"} src={Notification} alt="Notification Picture" />
<p>Personal Data</p>
<MdArrowForwardIos />
</div>

<div className="section-under-privacy">
<img className={"Ticket-data-image"} src={Ticket} alt="Ticket Picture" />
<p>Email & Payment</p>
<MdArrowForwardIos />
</div>

<div className="section-under-privacy">
<img className={"Logout-data-image"} src={Logout} alt="Logout Picture" />
<p>Deactive Account</p>
<MdArrowForwardIos />
</div>
     </div>   
    
    <NavigationBar></NavigationBar>

        </>
    )
}

export default profilePage;