# LuneTube

Es una aplicación cliente de youtube especialmente diseñada para dispositivos que
portan el sistema operativo Lune "LuneOS", así como también para dispositivos con
webOS 2.x y superiores (no para webosTV).

## ENYO
La aplicación esta contruida sobre el __Framework Javascript ENYO__, el cual permite
crear aplicaciones de alto nivel con tecnologías web, si quieres saber mas sobre enyo,
te invito a visitar http://enyojs.com/get-enyo/.

## Youtube API
LA aplicación se sirve de la API v3 de youtube, permitiendo las sguiente funciones:
* Realizar búsquedas de vídeos
* Reproducir vídeos sin firma restringida de youtube (Se esta trabajando para dar soporte)
* Iniciar sessión de usuario
* mostrar playlist del usuario que ha iniciado sesión
* Paginación de las búsquedas y playlist.

### Próximas caráctericticas
* Guardar historial de reproduciones.
* Añadir vídeos a listas de reprodución.
* Subir vídeos al canal del usuario.
* Descarga de vídeos

## Contribuir
Contribuir es simple, puedes realizar un __Pull Request__ y aportar, si quieres
aparecer como contribuyente, escribeme a mamisho.mamisho@gmail.com y con gusto te añadiré
como contribuyente.

## Ejecutar y pruebas
Al ser una aplicaicón web es simple, solo debes abrir la página __debug.html__ y se
ejecutará en tu navegador web predeterminado, como recomenación, para realizar pruebas 
debes desactivar la caché. Para realizar los test puedes usar la consola de errores
del navegador web.

## Compilar
El proyecto ya esta preparado para generar un desplegable de la aplicación y posteriormente
generar un paquete ejecutable por las plataformas soportadas (webOS y LuneOS).

Debes ubicarte en el directorio raíz en la terminal y ejecutar
* ___windows___
```
tools\deploy.bat
```
* ___Linux y mac___
```
./tools/deploy.sh 
```

Seguido necesitarás tener instalado HP webOS SDK y en el directorio raíz lanzar el comando
```
palm-package deploy
```
El comando funciona en cualquiera de las plataformas.

Después se creará un paquete .ipk el cual puedes instalarlo mediante USB (Con ayuda de Preware)
 o webOS Quick Install.

webOS SDK lo puedes conseguir en http://forums.webosnation.com/webos-development/325645-looks-like-you-cant-get-sdk-anymore-almost.html


Si lo deseas, también puede generar un desplegable mediante __Grunt__ en el directorio raíz
```
grunt build
```
Posiblemente necesites tener instalado __NodeJS__ y realizar un
```
npm install
```
