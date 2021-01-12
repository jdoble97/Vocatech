# Vocatech
La aplicacion sirve para crear barajas con un nombre descriptivo sobre la temática que tendra.
Cada baraja tendrá unas cartas, una carta representa una palabra en  español e inglés.
Por ejemplo la baraja Animales puede tener una carta que sea Gato-Cat.

# URL
Puedes encontrar la aplicación en vocatech.me

### Características que tiene la aplicación
La aplicación te permite crear un usuario como loguearte.
Tiene un CRUD para barajas.
Tiene un CRUD paa cartas
Es una aplicación PWA, por lo que puede ser instalada en tu ordenador u móvil como si fuera una app más.

### Requisitos
Tener conexión a internet
Contar con un navegador web, se recomienda Edge o Chrome

### Requisitos para probar en local
Mariadb
Nodejs 14
Angular Cli 11

### Instalación en local
* Crear una BBDD llamada vocatech e importar el fichero sql **Database/Vocatech.sql**
* Modificar los dos ficheros en **server/src/config/** con el usuario y la contraseña de la BBDD
* Instalar angular y nodejs

## Iniciar en local
1. Dentro de la carpeta *server* escribir en la terminal **npm start** y no cerrarla
1. Modificar *cliente/vocatech/src/app/services/configurationRoute.ts* poniendo **http://tu-ip-privada:7777/api**
1. Dentro de la carpeta *cliente/vocatech* escribir **ng serve --host 0.0.0.0**