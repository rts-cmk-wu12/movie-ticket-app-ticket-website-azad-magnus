import {HeaderNavigation} from "~components/HeaderNavigation.jsx";
import "~style/components/Checkout.scss";
import {CardComponent} from "~components/CardComponent.jsx";
import {ActionButton} from "~components/ActionButton.jsx";
import {PopUp} from "~components/PopUp.jsx";
import {IoShieldCheckmarkSharp} from "react-icons/io5";
import { useState } from "react";

const Checkout = () => {
    const [formData, setFormData] = useState({
        email: '',
        cardholderName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });
    const [errors, setErrors] = useState({});

    const validateForm = (e) => {
        e.preventDefault();
        const newErrors = {};

    
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.cardholderName) {
            newErrors.cardholderName = 'Cardholder name is required';
        }

        
        if (!formData.cardNumber) {
            newErrors.cardNumber = 'Card number is required';
        } else if (!/^\d{16}$/.test(formData.cardNumber)) {
            newErrors.cardNumber = 'Card number must be 16 digits';
        }

        
        if (!formData.expiryDate) {
            newErrors.expiryDate = 'Expiry date is required';
        }

        if (!formData.cvv) {
            newErrors.cvv = 'CVV is required';
        } else if (!/^\d{3}$/.test(formData.cvv)) {
            newErrors.cvv = 'CVV must be 3 digits';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
         
            console.log('Form is valid, processing payment...');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (<>
            <HeaderNavigation title={"Checkout"} link={"/"}></HeaderNavigation>
            <div className="payment-method">
                <h2>Payment Method</h2>
                <p>Change</p>
            </div>
            <CardComponent></CardComponent>
            <div className="payment-details-container">
                <h2>Payment Details</h2>
                <p>Your Email</p>
                <form onSubmit={validateForm}>
                    <input 
                        type="email" 
                        name="email"
                        placeholder="Milesmorales@gmail.com"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                
                    <p>Cardholder name</p>
                    <input 
                        type="text" 
                        name="cardholderName"
                        placeholder="Miles Morales"
                        value={formData.cardholderName}
                        onChange={handleInputChange}
                    />
                    {errors.cardholderName && <span className="error">{errors.cardholderName}</span>}
                
                    <p>Card Number</p>
                    <input 
                        type="text" 
                        name="cardNumber"
                        placeholder="**** **** **** 51446" 
                        maxLength="16" 
                        pattern="[0-9]*"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                    />
                    {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}

                    <div className="date-cvv">
                        <div>
                            <p>Date</p>
                            <input 
                                type="date" 
                                name="expiryDate"
                                placeholder="MM/YYYY"
                                value={formData.expiryDate}
                                onChange={handleInputChange}
                            />
                            {errors.expiryDate && <span className="error">{errors.expiryDate}</span>}
                        </div>

                        <div>
                            <p>CVV</p>
                            <input 
                                type="text" 
                                name="cvv"
                                placeholder="123" 
                                maxLength="3" 
                                pattern="[0-9]*"
                                value={formData.cvv}
                                onChange={handleInputChange}
                            />
                            {errors.cvv && <span className="error">{errors.cvv}</span>}
                        </div>
                    </div>
                          <ActionButton 
                anchorTagClass={"payment"} 
                buttonClass={"payment__button"}
                text={"Pay Now | $99.8"}
                formType={"submit"}
                onClick={validateForm}
            ></ActionButton>
                </form>
            </div>

            <PopUp
                icon={<IoShieldCheckmarkSharp size={48}/>}
                title="Your payment was successful"
                message="Adele is a Scottish heiress whose extremely wealthy family owns estates and grounds. When she was a teenager. Read More"
                actionElement={<ActionButton navigateTo={"/"} anchorTagClass={"backButton"} buttonClass={"backButton__button"}
                                             text={"See E-Ticket"}></ActionButton>}
            />
        </>)
}

export default Checkout;