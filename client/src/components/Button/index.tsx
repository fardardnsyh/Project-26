import { MouseEventHandler } from 'react';
import './assets/style.css'

interface buttonPropsI {
    text: string;
    classes?: string;
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
    type: "button" | "submit" | "reset" | undefined;
}

const Button = ({ text, classes, onClick, type }: buttonPropsI) => {
    
    return(
        <button className={`px-4 py-2 ${classes}`} onClick={onClick} type={type}>{text}</button>
    );
};

export default Button;