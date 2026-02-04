# 📝 App de Gestión de Tareas

Sistema completo CRUD para administrar tareas con backend Node.js/Express/PostgreSQL y frontend React/Tailwind.

## Funcionalidades

- **Crear tareas** con título, descripción y estado
- **Editar tareas** existentes
- **Eliminar tareas** con confirmación
- **Listar tareas** con filtros por estado
- **Validación especial**: No se puede marcar como DONE si la descripción tiene menos de 10 caracteres
- **Componentes reutilizables**: Button (usado 3+ veces) e Input (usado 2+ veces)
- **Mostrar errores** del backend en pantalla

## Arquitectura

### Backend
```
backend/
├── 
├── repositories/     # Acceso a datos
│    └──  models/      # Modelo Task (Sequelize)
├── services/         # Lógica de negocio + validaciones
├── routes/           # Endpoints REST
├── database.js       # Configuración Sequelize
├── server.js         # Servidor Express
└── init.sql          # Creación de tabla + datos
```

### Frontend
```
frontend/
└── src/
    ├── components/
    │   ├── Button.jsx         # Componente reutilizable
    │   ├── Input.jsx          # Componente reutilizable 
    │   ├── TaskForm.jsx       # Formulario crear/editar
    │   ├── TaskCard.jsx       # Tarjeta de task
    │   ├── TaskList.jsx       # Lista de tasks
    │   ├── Modal.jsx          # Confirmación eliminar
    │   ├── Toast.jsx          # Notificaciones éxito
    │   └── ErrorAlert.jsx     # Errores del backend
    ├── services/
    │   └── taskService.js     # API calls
    └── App.jsx                # Componente principal
```

## Modelo de Datos

### Tabla: tasks

| Campo | Tipo | Restricciones |
|-------|------|---------------|
| id | INTEGER | PK, autoincrement |
| title | VARCHAR(255) | NOT NULL, min 3 chars |
| description | TEXT | Opcional |
| status | VARCHAR(20) | PENDING, IN_PROGRESS, DONE |
| createdAt | TIMESTAMP | Auto |
| updatedAt | TIMESTAMP | Auto |

**Regla de validación obligatoria:**
- Para cambiar status a `DONE`, la descripción debe tener al menos 10 caracteres
- El backend responde con `400` y `{ "message": "..." }` si se viola la regla

## Instalación y Uso

### Prerrequisitos
- Docker y Docker Compose instalados
- Node.js 18+ 

### Con Docker 

```bash
# 1. Clonar el repositorio
git clone <tu-repo>
cd examen:final_vega_fabian

# 2. Levantar PostgreSQL + Backend
docker-compose up -d

# 3. Instalar dependencias del frontend
cd frontend
npm install

# 4. Iniciar frontend
npm run dev

# 5. Acceder a la aplicación
# Frontend: http://localhost:3000
# Backend API: http://localhost:4000/api/tasks
```

### Opción 2: Sin Docker

#### Paso 1: PostgreSQL

```bash
# Crear base de datos
psql -U postgres
CREATE DATABASE tasks_database;
\c tasks_database

# Ejecutar init.sql
\i backend/init.sql
\q
```

#### Paso 2: Backend

```bash
cd backend

# Instalar dependencias
npm install

# Configurar variables (si PostgreSQL está en localhost)
# Editar docker-compose.yml no aplica aquí
# Las variables están hardcodeadas en database.js para localhost

# Iniciar backend
npm start
```

#### Paso 3: Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Iniciar aplicación
npm run dev
```

## Endpoints de la API

Base URL: `http://localhost:4000/api/tasks`

| Método | Endpoint | Descripción | Respuesta Éxito | Respuesta Error |
|--------|----------|-------------|-----------------|-----------------|
| `GET` | `/api/tasks` | Listar todas las tasks | 200 + lista | 500 |
| `GET` | `/api/tasks/:id` | Obtener una task | 200 + task | 404: Task not found |
| `POST` | `/api/tasks` | Crear task | 201 + task | 400: validación |
| `PUT` | `/api/tasks/:id` | Actualizar task | 200 + task | 404/400 |
| `DELETE` | `/api/tasks/:id` | Eliminar task | 200 | 404: Task not found |

### Ejemplos de Uso

#### Crear task

```bash
curl -X POST http://localhost:4000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Implementar autenticación",
    "description": "Desarrollar sistema de login con JWT y bcrypt para seguridad",
    "status": "IN_PROGRESS"
  }'
```

#### Intentar marcar como DONE sin descripción suficiente (ERROR)

```bash
curl -X PUT http://localhost:4000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "DONE",
    "description": "Muy corta"
  }'

# Respuesta: 400
# {
#   "message": "No se puede marcar como DONE: la descripción debe tener al menos 10 caracteres"
# }
```

#### Actualizar correctamente a DONE

```bash
curl -X PUT http://localhost:4000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "DONE",
    "description": "Tarea completada exitosamente con todos los requisitos necesarios"
  }'
```

## Verificación de Requisitos



### Reglas de Validación

**Título**: Mínimo 3 caracteres (validado en backend y frontend)
**Status**: Solo acepta PENDING, IN_PROGRESS, DONE
**Regla DONE**: No se permite DONE si description < 10 caracteres
**Errores 400**: Retorna `{ "message": "..." }` en validaciones
**Errores 404**: Retorna `{ "message": "Task not found" }` cuando no existe

### Errores Mostrados en Pantalla

El componente `ErrorAlert` muestra errores del backend
Aparece en la esquina superior derecha
Se cierra automáticamente después de 5 segundos
Muestra el mensaje exacto del backend

## Probar el CRUD

### 1. Crear una task PENDING

```
Frontend: Llenar formulario
- Título: "Revisar documentación"
- Descripción: (dejar vacío)
- Status: PENDING

Resultado: Se crea correctamente
```

### 2. Intentar cambiar a DONE sin descripción

```
Frontend: Editar la task anterior
- Status: DONE (sin modificar descripción vacía)

Resultado: ❌ Error en pantalla
"No se puede marcar como DONE: la descripción debe tener al menos 10 caracteres"
```

### 3. Cambiar a DONE con descripción válida

```
Frontend: Editar la task
- Descripción: "Documentación revisada y comprendida completamente"
- Status: DONE

Resultado: ✅ Se actualiza correctamente
```

### 4. Eliminar task

```
Frontend: Click en "Eliminar"
Modal: Confirmar eliminación

Resultado: ✅ Se elimina con mensaje de éxito
```

## Comandos Útiles

### Docker

```bash
# Ver logs
docker-compose logs -f

# Reiniciar servicios
docker-compose restart

# Detener todo
docker-compose down

# Detener y borrar datos
docker-compose down -v

# Ver estado
docker-compose ps

# Entrar a PostgreSQL
docker exec -it tasks_db psql -U admin -d tasks_database
```

### Desarrollo

```bash
# Backend (en /backend)
npm run dev   # Con nodemon (auto-reload)

# Frontend (en /frontend)
npm run dev   # Modo desarrollo
npm run build # Build para producción
```

## Solución de Problemas

### Backend no conecta con PostgreSQL

```bash
# Verificar que PostgreSQL esté corriendo
docker ps

# Ver logs de PostgreSQL
docker-compose logs postgres

# Reiniciar
docker-compose restart postgres
```

### Frontend no carga tasks

1. Verificar que backend esté corriendo: `curl http://localhost:4000/health`
2. Revisar consola del navegador (F12) para errores
3. Verificar que `.env` tenga la URL correcta del backend

### Error: "Puerto ya en uso"

```bash
# Cambiar puerto en docker-compose.yml (backend)
# Cambiar puerto en vite.config.js (frontend)
```

## Estructura del Proyecto

```
tasks-app/
├── backend/
│   ├── models/
│   │   └── Task.js                 # Modelo Sequelize
│   ├── repositories/
│   │   └── taskRepository.js       # CRUD básico
│   ├── services/
│   │   └── taskService.js          # Validaciones
│   ├── routes/
│   │   └── taskRoutes.js           # Endpoints
│   ├── database.js
│   ├── server.js
│   ├── init.sql
│   ├── package.json
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Button.jsx          # Reutilizable
│   │   │   ├── Input.jsx           # Reutilizable
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskList.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Toast.jsx
│   │   │   └── ErrorAlert.jsx
│   │   ├── services/
│   │   │   └── taskService.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

## Tecnologías Utilizadas

### Backend
- Node.js 18
- Express 4
- Sequelize 6 (ORM)
- PostgreSQL 15
- Docker

### Frontend
- React 18
- Vite 5
- Tailwind CSS 3
- Axios


## 📄 Licencia

Este proyecto es de código abierto.

---
