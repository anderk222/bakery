#### Actividad Backend

Considere el siguiente escenario:

La panadería XXX desea vender cajas de panes mediante una página web. Hay que tener en cuenta que existen 3 usuarios distintos en la aplicación, un administrador, un cliente y un usuario delivery.

El administrador del sitio se encargará de cargar la información sobre las cajas como: nombre, precio, cantidad (unidades por caja), descripción, además, una caja puede tener una o varias imágenes asociadas. A más de lo anterior, el usuario administrador tendrá la posibilidad de ver los pedidos que han sido realizados mediante el sitio web, es de interés conocer: qué cliente realizó el pedido, la fecha en la que hizo el pedido, el tipo de pago y el valor total de la orden.

Por otro lado, el cliente, únicamente podrá acceder al sitio web y realizar pedidos en la aplicación. Tenga en cuenta que el cliente podrá registrar una o varias direcciónes conforme haga pedidos. Para realizar una órden (una o varias cajas de panes). El usuario debe indicar: nombre, dirección, teléfono y puede escoger alguno de los siguientes métodos de pago: efectivo o tarjeta.

Finalmente, el usuario de tipo delivery podrá tener acceso a ver las órdenes que han sido generadas para poder realizar los envíos.

Se requiere crear web services (Rest y formato JSON) que representen una posible solución a dicho escenario; para ello:
 
- Backend: NodeJs
- Base de datos: la de su preferencia, PostgreSQL, MySQL, NoSQL, etc
- Documentación adecuada de los endpoints generados (urls, formatos en solicitudes POST, etc)

Una vez que haya terminado el ejercicio, cargue la solución en GitHub y envíenos el enlace. No olvide incluir un archivo README.md. Su README debe incluir una descripción general de su solución, una explicación de su arquitectura, una explicación de su enfoque, metodología y posibles mejoras.

**Nota**: Puede alojar su servidor en algún proveedor e incluir la url del servidor en el README de su aplicación, en caso de no alojar su servidor en algún proveedor, incluya los pasos necesarios para la ejecución local de la solución.

Evaluamos muchos aspectos, incluido qué tan bien está estructurado su código, los diseños de patrones aplicados y la calidad de su solución.

Si por alguna razón no puede terminar a tiempo, háganoslo saber.
