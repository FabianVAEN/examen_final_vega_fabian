import React from 'react';
import Button from './Button';

const Modal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full transform transition-all animate-fade-in">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-gray-600">{message}</p>
        </div>

        {/* Footer - Usando componente Button reutilizable */}
        <div className="p-6 border-t border-gray-200 flex gap-3">
          <Button
            onClick={onClose}
            variant="secondary"
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            variant="danger"
            className="flex-1"
          >
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
