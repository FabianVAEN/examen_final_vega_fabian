import React, { useState, useEffect } from 'react';
import Button from './Button';
import Input from './Input';

const TaskForm = ({ taskToEdit, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'PENDING'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title || '',
        description: taskToEdit.description || '',
        status: taskToEdit.status || 'PENDING'
      });
    }
  }, [taskToEdit]);

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'El título es requerido';
    } else if (formData.title.length < 3) {
      newErrors.title = 'El título debe tener al menos 3 caracteres';
    }

    // Validación específica: DONE requiere description >= 10 caracteres
    if (formData.status === 'DONE') {
      if (!formData.description || formData.description.trim().length < 10) {
        newErrors.description = 'Para marcar como DONE, la descripción debe tener al menos 10 caracteres';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      status: 'PENDING'
    });
    setErrors({});
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {taskToEdit ? 'Editar Task' : 'Crear Nueva Tarea'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Título - Usando componente Input reutilizable */}
        <Input
          label="Título"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Ej: Implementar autenticación"
          error={errors.title}
          required
        />

        {/* Descripción - Usando componente Input reutilizable como textarea */}
        <Input
          label="Descripción"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe la tarea en detalle..."
          error={errors.description}
          multiline
          rows={4}
        />

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-2">
            Estado <span className="text-red-500">*</span>
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="PENDING">⏳ Pendiente</option>
            <option value="IN_PROGRESS">🔄 En Progreso</option>
            <option value="DONE">✅ Completada</option>
          </select>
          {formData.status === 'DONE' && (
            <p className="mt-1 text-xs text-blue-600">
              ℹ️ Recuerda: la descripción debe tener al menos 10 caracteres
            </p>
          )}
        </div>

        {/* Botones - Usando componente Button reutilizable */}
        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            variant="primary"
            className="flex-1"
          >
            {taskToEdit ? 'Actualizar Task' : 'Crear Tarea'}
          </Button>
          
          <Button
            type="button"
            onClick={handleReset}
            variant="secondary"
            className="flex-1"
          >
            {taskToEdit ? 'Cancelar' : 'Limpiar'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
