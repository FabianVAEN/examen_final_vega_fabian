const express = require('express');
const cors = require('cors');

const { testConnection, syncDatabase } = require('./database');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/tasks', taskRoutes);

// Ruta de health check
app.get('/health', (req, res) => {res.status(200).json({success: true, message: 'Tasks API funcionando correctamente',timestamp: new Date().toISOString()});
});

// Ruta principal
app.get('/', (req, res) => {res.json({message: 'API de Gestión de Tareas', version: '1.0.0', endpoints: { tasks: '/api/tasks', health: '/health'}
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => { res.status(404).json({ success: false, message: `Ruta no encontrada: ${req.method} ${req.path}` });
});

// Manejo de errores global
app.use((err, req, res, next) => { console.error('Error:', err.stack); res.status(500).json({ success: false, message: 'Error interno del servidor',
error: process.env.NODE_ENV === 'development' ? err.message : undefined});
});

// Iniciar servidor
const startServer = async () => {
  try {console.log('Iniciando servidor...');
    await testConnection();
    await syncDatabase();
    
    app.listen(PORT, () => {
      console.log(`URL: http://localhost:${PORT}`);
      console.log(`API: http://localhost:${PORT}/api/tasks`);
      console.log(`Health: http://localhost:${PORT}/health`);
      console.log('');
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error.message);
    process.exit(1);
  }
};

startServer();
