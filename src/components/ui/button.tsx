import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
  return (
    <button
      {...props}
      className={`
        inline-flex items-center px-4 py-2 border border-transparent rounded-md font-medium
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${variant === 'primary' ? 'bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-500' : ''}
        ${variant === 'secondary' ? 'bg-gray-200 hover:bg-gray-300 text-gray-700 focus:ring-gray-500' : ''}
        ${variant === 'success' ? 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500' : ''}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
