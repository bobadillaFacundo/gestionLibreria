![image](https://github.com/user-attachments/assets/c3df6ae3-5310-48ac-8d88-520c4c4dbfe5)

# 📚 Plataforma de Venta de Libros

Este proyecto es una plataforma de compra de libros desarrollada con Node.js y MongoDB. La aplicación permite a los usuarios registrarse, explorar libros y realizar compras a través de la integración con Mercado Pago.

## 🚀 Tecnologías Utilizadas

### Backend
- **Node.js** con **Express**
- **Mongoose** para la gestión de MongoDB
- **JSON Web Token (JWT)** para autenticación
- **CORS** para manejo de seguridad entre dominios

### Base de Datos
- **MongoDB** (Se requiere una cuenta en MongoDB Atlas o una instancia local)

### Frontend
- **Handlebars** para la renderización de vistas
- **Bootstrap** para el diseño responsivo

## 🔧 Configuración del Entorno
Para ejecutar el proyecto correctamente, es necesario configurar las variables de entorno en un archivo `.env`. Asegúrate de incluir lo siguiente:

```env
PORT=8000
MONGO_URI=<tu_url_de_mongodb>
JWT_SECRET=<tu_clave_secreta>
FRONTEND_URL=<url_del_frontend>

# Credenciales de Mercado Pago
PUBLIC_KEY=<tu_public_key>
ACCESS_TOKEN=<tu_access_token>
SUCCESS_URL=<tu_url_exito>
FAILURE_URL=<tu_url_fallo>
PENDING_URL=<tu_url_pendiente>
```

## 🏗 Instalación y Ejecución

### Opción 1: Usando Docker
1. Construye la imagen Docker:
   ```sh
   docker-compose build
   ```
2. Ejecuta el contenedor:
   ```sh
   docker-compose up
   ```
3. Accede a la aplicación en: [http://localhost:8000/api/login/principal](http://localhost:8000/api/login/principal)

### Opción 2: Instalación Manual
1. Instala las dependencias:
   ```sh
   npm install
   ```
2. Inicia el servidor:
   ```sh
   npm start
   ```

## 🛠 Configuración de la Base de Datos
Es necesario conectar la base de datos y crear un usuario administrador manualmente. En la carpeta `models`, encontrarás la plantilla de usuario. Asegúrate de que el campo `tipo` sea `admin`. Los usuarios registrados desde la página serán creados como usuarios comunes.

## 📸 Capturas de Pantalla
![Interfaz 1](https://github.com/user-attachments/assets/e3940803-ee7e-4b2d-af2e-a874268de0d8)
![Interfaz 2](https://github.com/user-attachments/assets/41633d6c-62f4-4806-8efc-51a25fdc81b5)
![Interfaz 3](https://github.com/user-attachments/assets/3ff5f126-b0db-4659-97d3-7e5332a3ec3d)

## 📌 Notas Adicionales
- Se recomienda utilizar **Node.js v18+** para mejor compatibilidad.
- La persistencia de datos se realiza en MongoDB.
- Para pruebas locales, puedes utilizar herramientas como **Postman** o **Insomnia** para consumir la API.

---
### 📬 Contacto
Si tienes preguntas o sugerencias, no dudes en contactarme (bobadillaf97@gmail.com). 🚀
