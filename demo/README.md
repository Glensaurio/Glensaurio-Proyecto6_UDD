**API de Productos - Documentación**
Esta API permite gestionar productos dentro de una tienda en línea. Ofrece las funcionalidades de creación, lectura, actualización y eliminación de productos. A continuación se describen los diferentes endpoints disponibles y cómo utilizarlos.

Clona el repositorio en tu máquina local:
git clone https://github.com/tu-usuario/tu-repositorio.git

Navega al directorio del proyecto:
cd tu-repositorio

Instala las dependencias:
npm install

Ejecuta el proyecto localmente:
npm start


**El cuerpo usado de cada producto es el siguiente:**
{
  "name": "Nombre del producto",
  "description": "Descripción del producto",
  "currency": "USD",
  "prices": [
    {
      "size": "Familiar",
      "price": 18900,
      "description": "12 rebanadas"
    }
  ],
  "img": ["url_de_la_imagen"],
  "idProd": "prod_Qt1pzzNGdUhwD2",
  "slug": "nombre-del-producto"
}


**El cuerpo de cada usuario es el siguiente:**
{
  "name": "Mike",
  "lastname": "Nieva",
  "country": "Mexico",
  "address": "123 Main St",
  "zipcode": 12345,
  "email": "mike@email.com",
  "password": "password123",
  "receipts": []
}

**Las variables de entorno del proyecto en el archivo .env**
PORT=3005
MONGODB_URI=mongodb://localhost:27017/ecommerce-pizzeria
SECRET=HOLAMUNDO
STRIPE_KEY=sk_test_51Q0sb2C4M09r4ysv8NyI04Xk8PaB4VlFYZ24dXhWkGfUfaW3knU4CzvNQI0TudLxVeAtuMfF29xWe6z0tQXaB1HY00HWlOiI1w
STRIPE_WH_SIGNING_SECRET=whsec_a20ab1d5413c55b39ce8795006464b15cd1436e14c11a5b3faeab3a1583f86bd
REACT_BASE_URL=http://localhost:3000

Se agregó react_basee_url para arreglar problemas de dirección frontend respecto al cors.

**Donde sacar la ID para actualización y Eliminación de productos**
Al crear uno en el POST usas la ID creada ahí y también la puede encontrar en MongoDB Compass y se ve así:  _id : ObjectId ('66edfde146f4785bf099719e ') que sería lo que está dentro del parentesis.

**En la creación de usuario y sus usos**
El ejemplo a seguir que muestra Swagger en tu local lo que se destaca para el login es "email" y "password" generando un data el cual se usara de token en el get, el cual permite la verifación de compra y poder hacerle update en el put.