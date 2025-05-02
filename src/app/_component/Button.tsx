import React from 'react';

type ButtonType = 'button' | 'submit' | 'reset';
interface ButtonProps {
    // Define any props you want to pass to the button component
    type?: ButtonType;
    onClick?: (e:any) => void;
    disabled?: boolean;
    className?: string;
    children?: React.ReactNode;
    }
const Button:React.FC<ButtonProps> = ({
    type = "button",
    onClick,
    disabled = false,
    className = "",
    children = null,
}) => {
  return (
    <button type={type} onClick={onClick} className={`text-sm ${className}`} disabled={disabled}>
        {children}
    </button>
  )
}

export default Button;