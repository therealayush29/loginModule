import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, type, className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-xl py-2 hover:scale-105 hover:bg-white hover:text-[#002D74] hover:border-2  duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

