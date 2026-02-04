-- Limpiar si existe
DROP TABLE IF EXISTS tasks CASCADE;


CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL CHECK (LENGTH(title) >= 3),
    description TEXT,
    status VARCHAR(20) NOT NULL CHECK (status IN ('PENDING', 'IN_PROGRESS', 'DONE')),
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Comentarios
COMMENT ON TABLE tasks IS 'Tabla de tareas del sistema';
COMMENT ON COLUMN tasks.id IS 'ID único de la tarea (auto-incremental)';
COMMENT ON COLUMN tasks.title IS 'Título de la tarea (mínimo 3 caracteres)';
COMMENT ON COLUMN tasks.description IS 'Descripción detallada de la tarea (opcional)';
COMMENT ON COLUMN tasks.status IS 'Estado: PENDING, IN_PROGRESS, DONE';

-- Datos de ejemplo
INSERT INTO tasks (title, description, status, "createdAt", "updatedAt") VALUES
-- Tasks PENDING
('Configurar proyecto con React', 'Instalar dependencias, configurar Tailwind CSS y estructura de componentes', 'PENDING', NOW(), NOW()),
('Revisar documentación de Sequelize', 'Leer sobre validaciones y relaciones en Sequelize ORM', 'PENDING', NOW(), NOW()),
('Preparar presentación del proyecto', 'Crear slides explicando arquitectura y funcionalidades implementadas', 'PENDING', NOW(), NOW()),

-- Tasks IN_PROGRESS
('Implementar autenticación con JWT', 'Desarrollar sistema de login y registro con tokens JWT para seguridad', 'IN_PROGRESS', NOW(), NOW()),
('Crear componentes reutilizables', 'Diseñar Button e Input components con Tailwind para usar en toda la app', 'IN_PROGRESS', NOW(), NOW()),
('Optimizar queries de base de datos', 'Revisar y mejorar las consultas SQL para mejor rendimiento del sistema', 'IN_PROGRESS', NOW(), NOW()),

-- Tasks DONE
('Configurar Docker Compose', 'Crear archivo docker-compose.yml con PostgreSQL y variables de entorno necesarias', 'DONE', NOW(), NOW()),
('Implementar CRUD de productos', 'Desarrollar endpoints completos para crear, leer, actualizar y eliminar productos', 'DONE', NOW(), NOW()),
('Diseñar arquitectura en capas', 'Separar código en repositories, services y routes según mejores prácticas', 'DONE', NOW(), NOW()),
('Agregar validaciones en backend', 'Implementar validaciones de datos en services y modelos de Sequelize', 'DONE', NOW(), NOW());


CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_created_at ON tasks("createdAt");


CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_tasks_updated_at
    BEFORE UPDATE ON tasks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();


SELECT COUNT(*) as total_tasks FROM tasks;
SELECT ' Base de datos de Tasks inicializada correctamente' AS status;
