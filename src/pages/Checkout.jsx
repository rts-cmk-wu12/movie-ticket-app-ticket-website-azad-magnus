import { HeaderNavigation } from "~components/HeaderNavigation.jsx";
import "~style/components/Checkout.scss";
import { CardComponent } from "~components/CardComponent.jsx";
import { ActionButton } from "~components/ActionButton.jsx";
import { PopUp } from "~components/PopUp.jsx";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { movie, selectedCinema, selectedSeats } = location.state || {};
    console.log(selectedCinema);

    const [formData, setFormData] = useState({
        email: "",
        cardholderName: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });
    const [errors, setErrors] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(false);

    if (!movie || !selectedCinema || !selectedSeats || selectedSeats.length === 0) {
        navigate("/", { replace: true });
        return null; // Bye bye, poor lost souls
    }

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = "Email is invalid";

        if (!formData.cardholderName)
            newErrors.cardholderName = "Cardholder name is required";

        if (!formData.cardNumber)
            newErrors.cardNumber = "Card number is required";
        else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s+/g, "")))
            newErrors.cardNumber = "Card number must be 16 digits";

        if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required";

        if (!formData.cvv) newErrors.cvv = "CVV is required";
        else if (!/^\d{3}$/.test(formData.cvv))
            newErrors.cvv = "CVV must be 3 digits";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        const payload = {
            movie,
            selectedCinema,
            selectedSeats,
            paymentInfo: {
                email: formData.email,
                cardholderName: formData.cardholderName,
                cardNumber: formData.cardNumber.replace(/\s+/g, ""),
                expiryDate: formData.expiryDate,
                cvv: formData.cvv,
            },
        };

        try {
            const res = await fetch("http://localhost:3000/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Payment failed, try again later.");

            setShowPopup(true);
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <HeaderNavigation title={"Checkout"} link={"/"} />
            <div className={"payment-method " + (showPopup ? "blurred__background" : "")}>
                <h2>Payment Method</h2>
                <p>
                   Change
                </p>
            </div>

            <CardComponent blurClass={showPopup} />

            <div className={"payment-details-container " + (showPopup ? "blurred__background" : "")}>
                <h2>Payment Details</h2>
                <p>Your Email</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="milesmorales@gmail.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={loading}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}

                    <p>Cardholder name</p>
                    <input
                        type="text"
                        name="cardholderName"
                        placeholder="Miles Morales"
                        value={formData.cardholderName}
                        onChange={handleInputChange}
                        disabled={loading}
                    />
                    {errors.cardholderName && <span className="error">{errors.cardholderName}</span>}

                    <p>Card Number</p>
                    <input
                        type="text"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        maxLength="16"
                        pattern="[0-9]*"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        disabled={loading}
                    />
                    {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}

                    <div className="date-cvv">
                        <div>
                            <p>Expiry Date</p>
                            <input
                                type="month"
                                name="expiryDate"
                                placeholder="MM/YYYY"
                                value={formData.expiryDate}
                                onChange={handleInputChange}
                                disabled={loading}
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
                                disabled={loading}
                            />
                            {errors.cvv && <span className="error">{errors.cvv}</span>}
                        </div>
                    </div>

                    <ActionButton
                        anchorTagClass={"payment"}
                        buttonClass={"payment__button"}
                        text={loading ? "Processing..." : "Pay Now | $99.8"}
                        formType={"submit"}
                        disabled={loading}
                    />
                </form>
            </div>

            {showPopup && (
                <PopUp
                    icon={<IoShieldCheckmarkSharp size={48} />}
                    title="Your payment was successful"
                    message="Adele is a Scottish heiress whose extremely wealthy family owns estates and grounds. When she was a teenager. Read More"
                    actionElement={
                        <ActionButton
                            navigateTo={"/E-Ticket"}
                            anchorTagClass={"backButton"}
                            buttonClass={"backButton__button"}
                            text={"See E-Ticket"}
                        />
                    }
                />
            )}
        </>
    );
};

export default Checkout;
