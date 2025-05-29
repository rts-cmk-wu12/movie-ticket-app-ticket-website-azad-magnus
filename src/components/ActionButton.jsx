
import "~style/components/ActionButton.scss"
export const ActionButton = ({text, navigateTo, anchorTagClass, buttonClass, formType, onClick}) => {
    return (
        <>
            <>
                <a onClick={onClick} className={anchorTagClass} href={navigateTo}>
                    <button type={formType} className={buttonClass}>{text}</button>
                </a>
            </>
        </>
    )
}