import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Modal from './components/Modal';
import Toast from './components/Toast';
import ErrorAlert from './components/ErrorAlert';
import taskService from './services/taskService';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState({ isOpen: false, taskId: null });
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });
  const [error, setError] = useState('');

  // Cargar tasks al iniciar
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      const response = await taskService.getAll();
      if (response.success) {
        setTasks(response.data);
      }
    } catch (error) {
      showError(error.message || 'Error al cargar tasks');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ isVisible: true, message, type });
  };

  const closeToast = () => {
    setToast({ ...toast, isVisible: false });
  };

  const showError = (message) => {
    setError(message);
  };

  const closeError = () => {
    setError('');
  };

  const handleSubmit = async (formData) => {
    try {
      if (taskToEdit) {
        // Actualizar task existente
        const response = await taskService.update(taskToEdit.id, formData);
        if (response.success) {
          showToast('Task actualizada exitosamente');
          setTaskToEdit(null);
          loadTasks();
        } else {
          showError(response.message || 'Error al actualizar task');
        }
      } else {
        // Crear nueva task
        const response = await taskService.create(formData);
        if (response.success) {
          showToast('Task creada exitosamente');
          loadTasks();
        } else {
          showError(response.message || 'Error al crear tarea');
        }
      }
    } catch (error) {
      // Mostrar error del backend
      const errorMessage = error.message || 'Error en la operación';
      showError(errorMessage);
      console.error('Error:', error);
    }
  };

  const handleEdit = (task) => {
    setTaskToEdit(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setTaskToEdit(null);
  };

  const handleDeleteClick = (taskId) => {
    setModal({ isOpen: true, taskId });
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await taskService.delete(modal.taskId);
      if (response.success) {
        showToast('Task eliminada exitosamente');
        loadTasks();
      } else {
        showError(response.message || 'Error al eliminar task');
      }
    } catch (error) {
      showError(error.message || 'Error al eliminar task');
      console.error('Error:', error);
    } finally {
      setModal({ isOpen: false, taskId: null });
    }
  };

  const handleDeleteCancel = () => {
    setModal({ isOpen: false, taskId: null });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <svg
              className="w-10 h-10 text-blue-600"
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
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Gestión de Tareas
              </h1>
              <p className="text-gray-600">
                Administra tus tareas de forma eficiente
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Formulario */}
        <TaskForm
          taskToEdit={taskToEdit}
          onSubmit={handleSubmit}
          onCancel={handleCancelEdit}
        />

        {/* Lista de tasks */}
        <TaskList
          tasks={tasks}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          isLoading={isLoading}
        />
      </main>

      {/* Modal de confirmación */}
      <Modal
        isOpen={modal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Confirmar eliminación"
        message="¿Estás seguro de que deseas eliminar esta task? Esta acción no se puede deshacer."
      />

      {/* Toast de notificaciones */}
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={closeToast}
      />

      {/* Alerta de errores del backend */}
      <ErrorAlert
        message={error}
        onClose={closeError}
      />
    </div>
  );
}

export default App;
