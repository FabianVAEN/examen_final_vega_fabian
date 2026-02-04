const taskRepository = require('../repositories/taskRepository');

class TaskService {
  // Validar regla: DONE requiere description >= 10 caracteres
  validateDoneStatus(status, description) {
    if (status === 'DONE') {
      if (!description || description.trim().length < 10) {
        return {
          isValid: false,
          message: 'No se puede marcar como DONE: la descripción debe tener al menos 10 caracteres'
        };
      }
    }
    return { isValid: true };
  }

  // Obtener todas las tasks
  async getAllTasks() {
    try {
      const tasks = await taskRepository.findAll();
      return {
        success: true,
        data: tasks,
        count: tasks.length
      };
    } catch (error) {
      throw new Error(`Error al obtener tasks: ${error.message}`);
    }
  }

  // Obtener task por ID
  async getTaskById(id) {
    try {
      const task = await taskRepository.findById(id);
      if (!task) {
        return {
          success: false,
          message: 'Task not found'
        };
      }
      return {
        success: true,
        data: task
      };
    } catch (error) {
      throw new Error(`Error al obtener task: ${error.message}`);
    }
  }

  // Crear task
  async createTask(taskData) {
    try {
      // Validación de título
      if (!taskData.title || taskData.title.trim().length < 3) {
        return {
          success: false,
          message: 'El título debe tener al menos 3 caracteres'
        };
      }

      // Validación de status válido
      const validStatuses = ['PENDING', 'IN_PROGRESS', 'DONE'];
      if (taskData.status && !validStatuses.includes(taskData.status)) {
        return {
          success: false,
          message: 'El status debe ser PENDING, IN_PROGRESS o DONE'
        };
      }

      // REGLA OBLIGATORIA: Validar DONE con description
      const statusValidation = this.validateDoneStatus(
        taskData.status || 'PENDING',
        taskData.description
      );
      
      if (!statusValidation.isValid) {
        return {
          success: false,
          message: statusValidation.message
        };
      }

      const task = await taskRepository.create(taskData);
      return {
        success: true,
        data: task,
        message: 'Task creada exitosamente'
      };
    } catch (error) {
      throw new Error(`Error al crear tarea: ${error.message}`);
    }
  }

  // Actualizar task
  async updateTask(id, taskData) {
    try {
      // Verificar que la task exista
      const existingTask = await taskRepository.findById(id);
      if (!existingTask) {
        return {
          success: false,
          message: 'Task not found'
        };
      }

      // Validación de título si se proporciona
      if (taskData.title !== undefined && taskData.title.trim().length < 3) {
        return {
          success: false,
          message: 'El título debe tener al menos 3 caracteres'
        };
      }

      // Validación de status válido
      const validStatuses = ['PENDING', 'IN_PROGRESS', 'DONE'];
      if (taskData.status && !validStatuses.includes(taskData.status)) {
        return {
          success: false,
          message: 'El status debe ser PENDING, IN_PROGRESS o DONE'
        };
      }

      // REGLA OBLIGATORIA: Validar DONE con description
      // Usar la nueva description si se proporciona, sino la existente
      const finalDescription = taskData.description !== undefined 
        ? taskData.description 
        : existingTask.description;

      const finalStatus = taskData.status || existingTask.status;

      const statusValidation = this.validateDoneStatus(finalStatus, finalDescription);
      
      if (!statusValidation.isValid) {
        return {
          success: false,
          message: statusValidation.message
        };
      }

      const task = await taskRepository.update(id, taskData);
      return {
        success: true,
        data: task,
        message: 'Task actualizada exitosamente'
      };
    } catch (error) {
      throw new Error(`Error al actualizar task: ${error.message}`);
    }
  }

  // Eliminar task
  async deleteTask(id) {
    try {
      const task = await taskRepository.delete(id);
      if (!task) {
        return {
          success: false,
          message: 'Task not found'
        };
      }
      return {
        success: true,
        message: 'Task eliminada exitosamente'
      };
    } catch (error) {
      throw new Error(`Error al eliminar task: ${error.message}`);
    }
  }
}

module.exports = new TaskService();
