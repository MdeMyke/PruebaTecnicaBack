# API de Gestión de Usuarios

## 🐳 Ejecutar con Docker (Recomendado)

```bash
# Construir y ejecutar
docker compose up --build

# Solo ejecutar
docker compose up -d

# Detener
docker compose down
```

## 🛠️ Ejecutar localmente

### Prerrequisitos

1. **Instalar Node.js** (versión 16 o superior)
2. **Instalar MySQL Server** en tu sistema
3. **Instalar Sequelize CLI** globalmente:
   ```bash
   npm install -g sequelize-cli
   ```

### Dependencias incluidas

El proyecto ya incluye las siguientes dependencias que se instalarán automáticamente:
- **dotenv**: Para cargar variables de entorno desde archivo `.env`
- **sequelize**: ORM para base de datos
- **mysql2**: Driver de MySQL para Node.js
- **express**: Framework web

### Instalación paso a paso

#### 1. Instalar dependencias del proyecto
```bash
npm install
```

#### 2. Crear base de datos MySQL
```sql
CREATE DATABASE prueba_tecnica;
```

#### 3. Configurar variables de entorno
Crear archivo `.env` en la raíz del proyecto:

```env
# Configuración de Base de Datos
DB_HOST=localhost
DB_PORT=3306
DB_NAME=prueba_tecnica
DB_USER=root
DB_PASSWORD=tu_password_aqui

# Configuración del Servidor
PORT=3000
NODE_ENV=development
```

**⚠️ Importante:** Reemplaza `tu_password_aqui` con la contraseña de tu MySQL.

#### 4. Ejecutar migraciones
```bash
npm run db:migrate
```

#### 5. Ejecutar seeders (datos de ejemplo)
```bash
npm run db:seed
```

#### 6. Iniciar el servidor
```bash
npm start
```

### Comandos útiles

```bash
# Configurar todo de una vez (migraciones + seeders)
npm run db:setup

# Solo migraciones
npm run db:migrate

# Solo seeders
npm run db:seed

# Revertir migraciones
npm run db:migrate:undo

# Revertir seeders
npm run db:seed:undo
```

## 📊 Endpoints

- `GET /` - Información de la API
- `GET /api/users` - Listar usuarios
- `GET /api/roles` - Listar roles
- `GET /api/users/:id` - Obtener usuario

## 🔧 Solución de problemas

### Error de conexión a MySQL
- Verifica que MySQL esté corriendo
- Confirma las credenciales en `.env`
- Asegúrate que la base de datos existe

### Error de Sequelize CLI
- Instala globalmente: `npm install -g sequelize-cli`
- Verifica la versión: `sequelize --version`

### Puerto ocupado
- Cambia el puerto en `.env`: `PORT=3001`
- O mata el proceso que usa el puerto 3000

