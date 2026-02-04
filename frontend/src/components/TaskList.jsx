import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, onEdit, onDelete, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-24 w-24 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <h3 className="mt-4 text-xl font-semibold text-gray-700">
          No hay tasks
        </h3>
        <p className="mt-2 text-gray-500">
          Comienza creando tu primera task usando el formulario de arriba
        </p>
      </div>
    );
  }

  // Agrupar tasks por status
  const groupedTasks = {
    PENDING: tasks.filter(t => t.status === 'PENDING'),
    IN_PROGRESS: tasks.filter(t => t.status === 'IN_PROGRESS'),
    DONE: tasks.filter(t => t.status === 'DONE')
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Mis Tareas
        </h2>
        <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
          Total: {tasks.length}
        </span>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <p className="text-sm text-yellow-700">Pendientes</p>
          <p className="text-2xl font-bold text-yellow-800">{groupedTasks.PENDING.length}</p>
        </div>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
          <p className="text-sm text-blue-700">En Progreso</p>
          <p className="text-2xl font-bold text-blue-800">{groupedTasks.IN_PROGRESS.length}</p>
        </div>
        <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
          <p className="text-sm text-green-700">Completadas</p>
          <p className="text-2xl font-bold text-green-800">{groupedTasks.DONE.length}</p>
        </div>
      </div>

      {/* Lista de tasks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
