import "~style/components/CardComponent.scss"
import masterCard from "~assets/svg/mastercard.png"
export const CardComponent = () => {
    return (
        <>
        <div className={"card__container"}>
            <div className="card">
                <div className="card__top">
                    <img className="card-img" src={masterCard} alt="Master Card" />
                    <div className="card__balance">
                        <div className="card__balance_label">Balance</div>
                        <div className="card__balance_value">$120,580,00</div>
                    </div>
                </div>
                <div className="card__bottom">
                    <div className="card-holder">
                        <div className="label">Card Holder</div>
                        <div className="name">Miles Morales</div>
                    </div>
                    <div className="card-number">**** **** **** 51446</div>
                </div>
            </div>
         </div>

        </>
    )
}