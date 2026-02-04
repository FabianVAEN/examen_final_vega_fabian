const Task = require('./models/Task');

class TaskRepository {
  // Obtener todas las tasks
  async findAll() {
    return await Task.findAll({
      order: [['createdAt', 'DESC']]
    });
  }

  // Obtener task por ID
  async findById(id) {
    return await Task.findByPk(id);
  }

  // Crear task
  async create(taskData) {
    return await Task.create(taskData);
  }

  // Actualizar task
  async update(id, taskData) {
    const task = await Task.findByPk(id);
    if (!task) {
      return null;
    }
    return await task.update(taskData);
  }

  // Eliminar task
  async delete(id) {
    const task = await Task.findByPk(id);
    if (!task) {
      return null;
    }
    await task.destroy();
    return task;
  }

  // Contar tasks por status
  async countByStatus(status) {
    return await Task.count({ where: { status } });
  }
}

module.exports = new TaskRepository();
