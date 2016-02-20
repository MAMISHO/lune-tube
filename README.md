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

Seguido necesitarás tener instalado HP webOS SDK y en el directorio raíz lanzar el comando (Más detalles en deploy.md)
```
palm-package deploy
```
El comando funciona en cualquiera de las plataformas.

Después se creará un paquete .ipk el cual puedes instalarlo mediante USB (Con ayuda de Preware)
 o webOS Quick Install.

webOS SDK lo puedes conseguir en http://forums.webosnation.com/webos-development/325645-looks-like-you-cant-get-sdk-anymore-almost.html

Si lo deseas puedes generar un paquete de forma directa con __Grunt__ en el directorio raíz (Recomendado). El comando realizará todas las tareas de desplieque, minificación, compilación y generación del paquete __.ipk__ listo para instalar
```
grunt build
```
Posiblemente necesites tener instalado __NodeJS__ y realizar un
```
npm install
```
También he incluido una tarea de compilación e instalación automática. En cada versión es necesario modificar el número de versión en task/config/palm-package.js

Por ejemplo
Para desplegar la versión 0.2.0 tenemos el siguiente comando
```
palm-install com.emsoft.lunetube_0.2.0_all.ipk
```
Si queremos desplegar la siguiente versión 0.2.1 debemos indicarlo en el comando modificando solo la versión.

```
palm-install com.emsoft.lunetube_0.2.1_all.ipk
```
Luego, dependiendo si queresmo instalar en LuneOS o webOS debemos ejecutar
```
grunt build-luneos
```
o
```
grunt build-webos
```
respectivamente.

## Servicios
LuneTube implementa la antiguamente llamada palmServicesRequest, la cual permite que otras aplicaciones puedan llamar a LuneTube y pasarle los siguientes parámetros.

```
{
					params:{
						url: youtubeURL,
						videoId: youtubeVideoId,
						video:{
							src: "http://clips.vorwaerts-gmbh.de/VfE_html5.mp4", // any video source
							type: "video/mp4" //format
						}
					}
```
Todos los paramétros no son necesarios, pero es obligatorio enviar por le menos uno. (En el ejemplo anterior se respetará la prioridad de parámetros explicada más adelante).

Por ejemplo, si queremos llamar a LuneTube sólo con una URL debemos hacer la siguiente llamáda. (El código puede variar dependiendo de la versión de framework ENYO 1, ENYO 2 o Mojo).

```

openLuneTubeUrl: function(inSender, inEvent){
var youtubeURI = 'https://www.youtube.com/watch?v=j0t3Ot-4h54&feature=youtu.be';
		var params= {
					params:{
						url: youtubeURI
					}
		};
		this.$.openLuneTube.send({ id: "com.emsoft.lunetube", params:params});
	},
```
En el ejemplo anetrior podemos ver que no es necesario enviar todos los parámetros.
Recuerda usar el servicio de applicationManager para poder hacer llamadas a otras aplicaciones.

## Prioridad de los parámetros
los siguientes están ordenados de prioridad mayor a menor.
1. target : Parámetro pode defecto de webOS, si se desea enviar una url se puede usar también éste parámetro.
2. url : pasámos urls de youtube
3. videoId: si tenemos acceso a las IDs de los vídeos, podemos enviar solo al Id para reproducir el recurso.
4. video: Permite reproducir videos de otras fuentes. NO está soportado aún, pero estará disponible en futuras versiones. El parámetro es un objeto JSON compuesto por los siguientes parámetros.
..* src : url del recurso, no soporta recursos embebidos, es necesario que sea la dirección directa del recurso. Esta es una URL válida [http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4](http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4)
..* type: Fromato del vídeo. Los formatos soportados son los especificados por la W3C
