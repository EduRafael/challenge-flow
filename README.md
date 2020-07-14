# README #

Este es un proyecto para el challenge de la fintech de Flow.

### Configuración inicial ###

Al ser una aplicación de express para iniciarlo se deben tomar las siguientes consideraciones una vez clonado

## Backend
```
* Entrar a la carpeta api y hacer npm i para instalar las dependencias necesarias
* Copiar el contenido de .env.example en .env

```
## Frontend
```
* Entrar a la carpeta front y hacer npm i para instalar las dependencias necesarias
* Copiar el contenido de .env.example en .env

```


### Iniciar el Backend ###

Para iniciar el Backend hay que entrar en la carpeta api, se pueden usar varias opciones entre ellas tenemos

```
* npm start
```

```
* node-dev index.js
```

```
* node index.js
```

### Iniciar los Test del Backend ###

```
* npm test
```


### Iniciar el Frontend ###

Para iniciar el Frontend hay que entrar en la carpeta front

```
* npm start
```

### NOTA ### 

El frontend usa la variable REACT_APP_API_BE en el .env, lo cual le permite establecer conexión con la api del backend
Actualmente está puesto para que funcione con *http://localhost:9001*. 