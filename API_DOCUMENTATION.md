# 📚 Documentación de la API REST

## 📋 Información General

**Base URL:** `http://localhost:3000/api`  

---

## 🚀 Endpoints Disponibles

### 🔍 Endpoint de Prueba
**GET** `/test` - Verificar estado de la API

### 👥 Gestión de Usuarios
- **GET** `/users` - Obtener todos los usuarios
- **GET** `/users/:id` - Obtener usuario por ID
- **POST** `/users` - Crear nuevo usuario
- **PUT** `/users/:id` - Actualizar usuario
- **DELETE** `/users/:id` - Eliminar usuario (soft delete)

### 🎭 Gestión de Roles
- **GET** `/roles` - Obtener todos los roles
- **GET** `/roles/:id` - Obtener rol por ID

---

## 📖 Detalle de Endpoints

### 1. 🔍 Verificar Estado de la API

**GET** `http://localhost:3000/api/test`

Verifica que la API esté funcionando correctamente.

#### Respuesta Exitosa (200)
```json
{
  "message": "API funcionando correctamente",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "endpoints": {
    "users": "/api/users",
    "roles": "/api/roles",
    "test": "/api/test"
  }
}
```

---

### 2. 👥 Gestión de Usuarios

#### 2.1 Obtener Todos los Usuarios

**GET** `http://localhost:3000/api/users`

Obtiene la lista completa de usuarios con sus roles asociados.

#### Respuesta Exitosa (200)
```json
{
  "message": "Usuarios obtenidos exitosamente",
  "data": [
    {
      "id": 1,
      "nombre": "Juan Pérez",
      "email": "juan@example.com",
      "created_at": "2024-01-15T10:30:00.000Z",
      "updated_at": "2024-01-15T10:30:00.000Z",
      "roles": [
        {
          "id": 1,
          "nombre": "admin"
        }
      ]
    }
  ]
}
```

#### 2.2 Obtener Usuario por ID

**GET** `http://localhost:3000/api/users/:id`

Obtiene un usuario específico por su ID.

**Parámetros:**
- `id` (number, requerido): ID del usuario

#### Respuesta Exitosa (200)
```json
{
  "message": "Usuario obtenido exitosamente",
  "data": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z",
          "roles": [
        {
          "id": 1,
          "nombre": "admin"
        }
      ]
  }
}
```

#### Respuesta de Error (400)
```json
{
  "message": "ID de usuario inválido",
  "error": "El ID debe ser un número"
}
```

#### Respuesta de Error (404)
```json
{
  "message": "Usuario no encontrado",
  "error": "No existe un usuario con ID 999"
}
```

#### 2.3 Crear Nuevo Usuario

**POST** `http://localhost:3000/api/users`

Crea un nuevo usuario en el sistema.

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "nombre": "María García",
  "email": "maria@example.com",
  "password": "password123"
}
```

#### Respuesta Exitosa (201)
```json
{
  "message": "Usuario creado exitosamente",
  "data": {
    "id": 2,
    "nombre": "María García",
    "email": "maria@example.com",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  }
}
```

#### 2.4 Actualizar Usuario

**PUT** `http://localhost:3000/api/users/:id`

Actualiza la información de un usuario existente.

**Parámetros:**
- `id` (number, requerido): ID del usuario

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "nombre": "Juan Pérez Actualizado",
  "email": "juan.nuevo@example.com"
}
```

#### Respuesta Exitosa (200)
```json
{
  "message": "Usuario actualizado exitosamente",
  "data": {
    "id": 1,
    "nombre": "Juan Pérez Actualizado",
    "email": "juan.nuevo@example.com",
    "updated_at": "2024-01-15T10:30:00.000Z"
  }
}
```

#### 2.5 Eliminar Usuario

**DELETE** `http://localhost:3000/api/users/:id`

Elimina un usuario del sistema (soft delete).

**Parámetros:**
- `id` (number, requerido): ID del usuario

#### Respuesta Exitosa (200)
```json
{
  "message": "Usuario eliminado exitosamente",
  "data": {
    "id": 1
  }
}
```

---

### 3. 🎭 Gestión de Roles

#### 3.1 Obtener Todos los Roles

**GET** `http://localhost:3000/api/roles`

Obtiene la lista completa de roles disponibles.

#### Respuesta Exitosa (200)
```json
{
  "message": "Roles obtenidos exitosamente",
  "data": [
    {
      "id": 1,
      "nombre": "admin"
    },
    {
      "id": 2,
      "nombre": "editor"
    },
    {
      "id": 3,
      "nombre": "usuario"
    }
  ]
}
```

#### 3.2 Obtener Rol por ID

**GET** `http://localhost:3000/api/roles/:id`

Obtiene un rol específico por su ID.

**Parámetros:**
- `id` (number, requerido): ID del rol

#### Respuesta Exitosa (200)
```json
{
  "message": "Rol obtenido exitosamente",
  "data": {
    "id": 1,
    "nombre": "admin"
  }
}
```

#### Respuesta de Error (400)
```json
{
  "message": "ID de rol inválido",
  "error": "El ID debe ser un número"
}
```

#### Respuesta de Error (404)
```json
{
  "message": "Rol no encontrado",
  "error": "No existe un rol con ID 999"
}
```

---

## 📊 Códigos de Respuesta HTTP

| Código | Descripción |
|--------|-------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado exitosamente |
| 400 | Bad Request - Datos de entrada inválidos |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error interno del servidor |

---

## 🔧 Ejemplos de Uso con cURL

### Verificar estado de la API
```bash
curl -X GET http://localhost:3000/api/test
```

### Obtener todos los usuarios
```bash
curl -X GET http://localhost:3000/api/users
```

### Obtener usuario por ID
```bash
curl -X GET http://localhost:3000/api/users/1
```

### Crear nuevo usuario
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Nuevo Usuario",
    "email": "nuevo@example.com",
    "password": "password123"
  }'
```

### Actualizar usuario
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Usuario Actualizado",
    "email": "actualizado@example.com"
  }'
```

### Eliminar usuario
```bash
curl -X DELETE http://localhost:3000/api/users/1
```

### Obtener todos los roles
```bash
curl -X GET http://localhost:3000/api/roles
```

### Obtener rol por ID
```bash
curl -X GET http://localhost:3000/api/roles/1
```

---

## 📁 Estructura de Datos

### Usuario
```json
{
  "id": "number",
  "nombre": "string",
  "email": "string",
  "password": "string (solo en creación)",
  "created_at": "datetime",
  "updated_at": "datetime",
  "roles": "array de objetos Role"
}
```

### Rol
```json
{
  "id": "number",
  "nombre": "string",
}
```