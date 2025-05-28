import {useEffect, useRef, useState} from "react";
import JsBarcode from "jsbarcode";
import "~style/components/ETicket.scss";
import {HeaderNavigation} from "~components/HeaderNavigation.jsx";
import {ActionButton} from "~components/ActionButton.jsx";
import {IoShieldCheckmarkSharp} from "react-icons/io5";
import {PopUp} from "~components/PopUp.jsx";
import html2pdf from "html2pdf.js";


const ETicket = () => {
    const barcodeRef = useRef(null);
    const [showPopup, setShowPopup] = useState(false);

    const generateRandomBarcode = () => {
        return Array.from({length: 12}, () =>
            Math.floor(Math.random() * 10)
        ).join("");
    };

    useEffect(() => {
        const randomCode = generateRandomBarcode();
        if (barcodeRef.current) {
            JsBarcode(barcodeRef.current, randomCode, {
                format: "CODE128",
                displayValue: false,
                height: 60,
                width: 2,
                margin: 0,
            });
        }
    }, []);

    const handleDownloadClick = async () => {
        const ETicketHtmlToPdf = document.querySelector(".ticket");

        if (!ETicketHtmlToPdf) {
            console.error("No element with class .ticket found.");
            return;
        }

        try {
            await html2pdf().from(ETicketHtmlToPdf).save();
            setShowPopup(true);
        } catch (error) {
            console.error("Failed to generate PDF:", error);
        }
    };

    return (
        <>
            <HeaderNavigation title={"E-Ticket"} link={"/"} />
            <div className={"ticket-wrapper" + (showPopup ? " blurred__background" : "")}>
                <div className={"instruction-wrapper"}>
                    <h2>Instruction</h2>
                    <p className={"instruction-wrapper__description"}>
                        Come to the cinema, show and scan the barcode to the space provided. Continue to comply with health protocols.
                    </p>
                </div>
                <div className="ticket">
                    <div className="ticket__notch ticket__notch--left"></div>
                    <div className="ticket__notch ticket__notch--right"></div>

                    <div className="ticket__header">
                        <span><strong>Film:</strong> Shang-Chi</span>
                        <span className="ticket__e-ticket">e-ticket</span>
                    </div>

                    <div className="ticket__grid">
                        <div><strong>Date</strong>
                            <div>06/09/2021</div>
                        </div>
                        <div><strong>Seats</strong>
                            <div>c4, c5</div>
                        </div>
                        <div><strong>Location</strong>
                            <div>Viva Cinema</div>
                        </div>
                        <div><strong>Time</strong>
                            <div>01.00 PM</div>
                        </div>
                        <div><strong>Payment</strong>
                            <div>Successful</div>
                        </div>
                        <div><strong>Order</strong>
                            <div>1904566</div>
                        </div>
                    </div>

                    <div className="ticket__separator">
                        <div className="ticket__dashed-line"></div>
                    </div>

                    <svg ref={barcodeRef} />
                </div>
                <ActionButton
                    text={"Download E-Ticket"}
                    anchorTagClass={"standard"}
                    buttonClass={"standard__button"}
                    onClick={handleDownloadClick}
                />
            </div>

            {showPopup && (
                <PopUp
                    icon={<IoShieldCheckmarkSharp size={48} />}
                    title="Your ticket has been downloaded"
                    message="Adele is a Scottish heiress whose extremely wealthy family owns estates and grounds. When she was a teenager. Read More"
                    actionElement={
                        <ActionButton
                            navigateTo={"/"}
                            anchorTagClass={"backButton"}
                            buttonClass={"backButton__button"}
                            text={"Back To Home"}
                        />
                    }
                />
            )}
        </>
    );
};

export default ETicket;
