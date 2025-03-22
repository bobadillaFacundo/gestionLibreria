Tecnologias:
Node.js
express
Handlebars
MongoDB
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

![alt text](<Captura de pantalla 2025-03-22 041357.png>) ![alt text](<Captura de pantalla 2025-03-22 041340.png>) ![alt text](<Captura de pantalla 2025-03-22 041324.png>) ![alt text](<Captura de pantalla 2025-03-22 041310.png>)
