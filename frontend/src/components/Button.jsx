import React from 'react';

/**
 * Componente Button reutilizable
 * Props:
 * - children: Texto del botón
 * - onClick: Función al hacer click
 * - variant: 'primary' | 'secondary' | 'danger' | 'success'
 * - type: 'button' | 'submit'
 * - disabled: boolean
 * - className: clases adicionales
 */
const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  type = 'button',
  disabled = false,
  className = ''
}) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg',
    secondary: 'bg-gray-300 hover:bg-gray-400 text-gray-800',
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg',
    success: 'bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg',
  };

  const variantClass = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
