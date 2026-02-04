import React from 'react';
import Button from './Button';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const statusConfig = {
    PENDING: {
      label: '⏳ Pendiente',
      color: 'bg-yellow-100 text-yellow-800',
      border: 'border-yellow-300'
    },
    IN_PROGRESS: {
      label: '🔄 En Progreso',
      color: 'bg-blue-100 text-blue-800',
      border: 'border-blue-300'
    },
    DONE: {
      label: '✅ Completada',
      color: 'bg-green-100 text-green-800',
      border: 'border-green-300'
    }
  };

  const config = statusConfig[task.status] || statusConfig.PENDING;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 border-l-4 ${config.border}`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-gray-800 flex-1 pr-3">
          {task.title}
        </h3>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.color} whitespace-nowrap`}>
          {config.label}
        </span>
      </div>

      {/* Descripción */}
      {task.description ? (
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {task.description}
        </p>
      ) : (
        <p className="text-gray-400 text-sm italic mb-4">
          Sin descripción
        </p>
      )}

      {/* Fecha */}
      <div className="text-xs text-gray-500 mb-4">
        Creada: {formatDate(task.createdAt)}
      </div>

      {/* Botones - Usando componente Button reutilizable */}
      <div className="flex gap-2">
        <Button
          onClick={() => onEdit(task)}
          variant="primary"
          className="flex-1 text-sm"
        >
          Editar
        </Button>
        <Button
          onClick={() => onDelete(task.id)}
          variant="danger"
          className="flex-1 text-sm"
        >
          Eliminar
        </Button>
      </div>
    </div>
  );
};

export default TaskCard;
