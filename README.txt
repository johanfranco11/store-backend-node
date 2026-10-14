PRE-ENTREGA - GESTION DE PRODUCTOS CON FAKESTORE API
=====================================================

DESCRIPCION
-----------
Aplicacion de linea de comandos hecha con Node.js (ESModules) que permite
consultar, crear y eliminar productos usando la API publica FakeStore
(https://fakestoreapi.com). Los comandos se leen con process.argv y las
peticiones se hacen de forma asincrona con fetch.

REQUISITOS
----------
- Node.js version 18 o superior (trae fetch incluido).
- npm (se instala junto con Node.js).

INSTALACION
-----------
1. Descargar o clonar el proyecto.
2. Abrir una terminal dentro de la carpeta del proyecto.
3. No hay dependencias externas, no hace falta ejecutar npm install.

USO
---
1. Consultar todos los productos:
   npm run start GET products

2. Consultar un producto por id:
   npm run start GET products/15

3. Crear un producto nuevo (title, price, category):
   npm run start POST products T-Shirt-Rex 300 remeras

4. Eliminar un producto por id:
   npm run start DELETE products/7

NOTAS
-----
- Si el titulo tiene espacios, escribirlo entre comillas o usar guiones.
  Ejemplo: npm run start POST products "Remera Rex" 300 remeras
- FakeStore API simula las operaciones: el POST y el DELETE devuelven una
  respuesta, pero los datos no se guardan ni se borran realmente.

ESTRUCTURA
----------
index.js      -> codigo principal
package.json  -> configuracion ("type": "module" y script "start")
README.txt    -> este archivo

AUTOR
-----
Johan Franco
