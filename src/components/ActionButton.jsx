
import "~style/components/ActionButton.scss"
export const ActionButton = ({text, navigateTo, anchorTagClass, buttonClass}) => {
    return (
        <>
            <>
                <a className={anchorTagClass} href={navigateTo}>
                    <button className={buttonClass}>{text}</button>
                </a>
            </>
        </>
    )
}