import {HeaderNavigation} from "~components/HeaderNavigation.jsx";
import "~style/components/Checkout.scss";
import {CardComponent} from "~components/CardComponent.jsx";
import {ActionButton} from "~components/ActionButton.jsx";

const Checkout = () => {
    return (
        <>
            <HeaderNavigation title={"Checkout"} link={"/"}></HeaderNavigation>
            <div className="payment-method">
                <h2>Payment Method</h2>
                <p>Change</p>
            </div>
            <CardComponent></CardComponent>
            <div className="payment-details-container">
            <h2>Payment Details</h2>
            <p>Your Email</p>
            <form action="">
            <input type="email" placeholder="Milesmorales@gmail.com" />
            </form>           
            <p>Cardholder name</p>
             <form action="">
            <input type="name" placeholder="Miles Morales" />
            </form>
            <p>Card Number</p>
            <form action="">
            <input type="text" placeholder="**** **** **** 51446" maxLength="16" pattern="[0-9]*" />
            </form>     

            

            <div className="date-cvv">
                <div>
           <p>Date</p> 
            <form action="">
            <input type="date" placeholder="MM/YYYY" />
            </form>
             </div>

<div>
<p>CVV</p>
            <form action="">
            <input type="text" placeholder="123" maxLength="3" pattern="[0-9]*" />
            </form> 
</div>


            </div>           
    
            </div>


            <ActionButton anchorTagClass={"payment"} buttonClass={"payment__button"} text={"Pay Now | $99.8"}></ActionButton>
        </>
    )
}

export default Checkout;