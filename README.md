# 📌 CRUD de Alta de Personal con Next.js

Este proyecto es una aplicación CRUD para gestionar empleados, desarrollado con Next.js y utilizando una API REST con MySQL como base de datos.

## 📂 Estructura del Proyecto

- **Frontend:** Next.js (React, Tailwind CSS)
- **Backend:** API REST con Next.js
- **Base de datos:** MySQL

---

## 🚀 Instalación y Configuración

### **1️⃣ Clonar el repositorio**
```sh
 git clone 
 cd 
```

### **2️⃣ Instalar dependencias**
```sh
 npm install
```

### **3️⃣ Configurar variables de entorno**
Crea un archivo `.env.local` en la raíz del proyecto y añade las siguientes variables:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=bd_empleados
```

### **4️⃣ Configurar la base de datos**
Para que la aplicación funcione correctamente, es necesario importar la base de datos en el sistema de gestión de MySQL que estés utilizando (MySQL Workbench, phpMyAdmin, línea de comandos, etc.) o crearla manualmente con el siguiente esquema:

```sql
CREATE DATABASE bd_empleados;

USE bd_empleados;

CREATE TABLE empleados (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre_completo VARCHAR(100) NOT NULL,
  dni VARCHAR(20) NOT NULL UNIQUE,
  fecha_nacimiento DATE NOT NULL,
  es_desarrollador BOOLEAN NOT NULL,
  descripcion TEXT
);
```

### **5️⃣ Iniciar el servidor de desarrollo**
```sh
 npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

---

## 📌 Endpoints de la API

### **GET /api/empleados**
Obtiene la lista de todos los empleados.

### **POST /api/empleados**
Crea un nuevo empleado.

**Ejemplo de body:**
```json
{
  "nombre_completo": "Juan Pérez",
  "dni": "12345678",
  "fecha_nacimiento": "1990-05-10",
  "es_desarrollador": true,
  "descripcion": "Desarrollador Full Stack"
}
```

### **PUT /api/empleados**
Actualiza un empleado existente.

### **DELETE /api/empleados**
Elimina un empleado por su ID.

---

## 📌 Estimación de tareas

| Tarea | Tiempo estimado |
|-----------------|----------------|
| Configuración del entorno y base de datos | 30 minutos |
| Desarrollo de API REST | 1 hora |
| Creación del componentes | 50 minutos |
| Pruebas y documentación | < 30 minutos |

---

📌 **Autor:** [Milagros Luna]  

