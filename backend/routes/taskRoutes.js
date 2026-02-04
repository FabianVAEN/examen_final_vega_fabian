const express = require('express');
const router = express.Router();
const taskService = require('../services/taskService');

// GET /api/tasks - Obtener todas las tasks
router.get('/', async (req, res) => {
  try {
    const result = await taskService.getAllTasks();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET /api/tasks/:id - Obtener task por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await taskService.getTaskById(id);
    
    if (!result.success) {
      return res.status(404).json({
        message: result.message
      });
    }
    
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// POST /api/tasks - Crear task
router.post('/', async (req, res) => {
  try {
    const result = await taskService.createTask(req.body);
    
    if (!result.success) {
      return res.status(400).json({
        message: result.message
      });
    }
    
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// PUT /api/tasks/:id - Actualizar task
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await taskService.updateTask(id, req.body);
    
    if (!result.success) {
      const statusCode = result.message === 'Task not found' ? 404 : 400;
      return res.status(statusCode).json({
        message: result.message
      });
    }
    
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// DELETE /api/tasks/:id - Eliminar task
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await taskService.deleteTask(id);
    
    if (!result.success) {
      return res.status(404).json({
        message: result.message
      });
    }
    
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
