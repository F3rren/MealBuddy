import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  onClick,
  disabled = false,
  className = '' 
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "bg-teal-600 text-white hover:bg-teal-700 hover:-translate-y-0.5 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2",
    secondary: "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2",
    danger: "bg-red-600 text-white hover:bg-red-700 hover:-translate-y-0.5 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
  };
  
  const sizeClasses = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg"
  };
  
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  return (
    <button 
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
