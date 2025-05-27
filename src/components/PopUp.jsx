import "~style/components/PopUp.scss"

export const PopUp = ({
                          icon,
                          title,
                          message,
                          actionElement,
                          className = '',
                          iconCircleClass = '',
                          titleTag: TitleTag = 'h2',
                          messageTag: MessageTag = 'p',
                      }) => {
    return (
        <div className={"pop-up-container"}>
            <div className={`pop-up ${className}`}>
                <div className={`pop-up__icon-circle ${iconCircleClass}`}>
                    {icon}
                </div>
                <TitleTag className="pop-up__title">{title}</TitleTag>
                <MessageTag className="pop-up__message">{message}</MessageTag>
                <div className="pop-up__action">{actionElement}</div>
            </div>
        </div>
    );
};
