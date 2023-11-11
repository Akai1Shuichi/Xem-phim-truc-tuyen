import React from "react";
import './button.css'
const Button = ({index,text,full}) => {
    if (index == 1) {
        return (
            <button className="primary-btn" style={{width: full && '100%'}}>{text}</button>
        )
    } 
}

export default Button

