// buttons 
const Button = (props) => {
        return(
            <button className={props.class} type={props.btnType} style={{backgroundColor: props.color}} onClick={props.onClick}>{props.text}</button>
        )
};

export default Button;