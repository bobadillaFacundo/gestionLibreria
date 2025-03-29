Tecnologias:
Node.js
express
Handlebars
MongoDB
boostrap

Es necesario conectarce a la bdd mongo y crear el usuario admin. En la carpeta model esta el template, en tipo poner "admin". Cuando te registras desde la pagina te crea como un usuario comun.

Construcción de la imagen Docker:

Desde la línea de comandos, en el directorio donde se encuentra tu Docker-Compose, ejecuta el siguiente comando para construir la imagen Docker-compose:

      docker-compose build
Ejecución del contenedor:

Una vez que la imagen se haya construido correctamente, puedes ejecutar un contenedor con el siguiente comando

      docker-compose up
Despues habrir en el puerto http://localhost:8000/api/login/principal

Los datos se persisten en la bdd MongoDB

Otra forma:

npm install

node start

Es necesario subir las credenciales en el .env


Imagenes del prototipo

![Captura de pantalla 2025-03-29 194547](https://github.com/user-attachments/assets/e3940803-ee7e-4b2d-af2e-a874268de0d8)
![Captura de pantalla 2025-03-29 200611](https://github.com/user-attachments/assets/41633d6c-62f4-4806-8efc-51a25fdc81b5)
![Captura de pantalla 2025-03-29 200631](https://github.com/user-attachments/assets/3ff5f126-b0db-4659-97d3-7e5332a3ec3d)
