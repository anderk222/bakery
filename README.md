# Panaderia

### Descripcion general

Para mi solucion decidí octar por utiliza la arquitectura basada en componentes, es una arquitectura muy escalable, ya que nos permite modularizar nuestras funcionalidades, tambien hago enfasis en que utilize prisma para mi el ORM mas completo de nodejs, como mejoras me gustaria añadir un mejor enfoque de validaciones para los datos como mas abajo podemos ver en el diseño de la base de datos hay tablas  con algunos tipos de datos que se deben cambiar, tambien añadir otros enpoints para adaptarlos a la necesidad, se puede mejorar que y como se muestra la informacion.

### Base de datos

Aqui tenemos el diseño de la base de datos

![Screenshot](./md/database.png)

### Correr servidor

#### Requisitos

- Tener node con una version superior a la 14 idealmente tener la version 18.
- Tener postgreSQL instalado
- Sismeta de archivos x64

##### Configurar el entorno

**1.** Renombramos el archivo  ``.example.env`` a `` env``.

**2.** Cambiamos las variables de ese archivo por lo general solo se cambia la ``DATABASE_URL`` en mi caso se quedara asi ``postgresql://postgres:123@localhost:5432/panaderia`` la base de datos debe estar creada.

***Nota:***  Si cambiamos ``PORT`` variable de entorno tendremos que cambiar la propiedad host de ``swagger.output.json``

![Screenshot](./md/figure-1.png)

###### Migracion de modelos a base de datos

**3.** Corremos los siguientes comandos:

```
npm i
npx prisma generate
npx prisma migrate dev --name init
```

Si todo salio bien deberiamos tener creadas las tablas en nuestra base de datos.

###### Correr el proyecto(modo dev)

**4.** Finalmente corremos el proyecto con el comando:

```
npm run dev
```

Visita ``http://localhost:8888/doc/`` para ver la documentacion de la api
