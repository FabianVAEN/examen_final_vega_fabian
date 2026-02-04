import React from 'react';

/**
 * Componente Input reutilizable
 * Props:
 * - label: Etiqueta del input
 * - name: Nombre del input
 * - value: Valor del input
 * - onChange: Función al cambiar
 * - type: 'text' | 'email' | 'password' | 'number'
 * - placeholder: Texto placeholder
 * - error: Mensaje de error
 * - required: boolean
 * - rows: número de filas (para textarea)
 * - multiline: boolean (convierte en textarea)
 */
const Input = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  error = '',
  required = false,
  rows = 3,
  multiline = false,
  className = ''
}) => {
  const baseClasses = 'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all';
  const errorClasses = error ? 'border-red-500' : 'border-gray-300';

  const inputProps = {
    name,
    value,
    onChange,
    placeholder,
    required,
    className: `${baseClasses} ${errorClasses} ${className}`
  };

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      {multiline ? (
        <textarea
          id={name}
          rows={rows}
          {...inputProps}
        />
      ) : (
        <input
          id={name}
          type={type}
          {...inputProps}
        />
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;
