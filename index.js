// URL base de la API FakeStore
const BASE_URL = 'https://fakestoreapi.com';

// process.argv = [rutaNode, rutaArchivo, ...argumentos del usuario]
// Con destructuring nos saltamos los dos primeros y tomamos el resto
const [, , method, resource, ...params] = process.argv;

// GET products
async function getAllProducts() {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
  return response.json();
}

// GET products/<id>
async function getProductById(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
  const data = await response.text();
  // La API devuelve vacío (null) si el producto no existe
  return data ? JSON.parse(data) : null;
}

// POST products <title> <price> <category>
async function createProduct({ title, price, category }) {
  // Valores por defecto; con spread (...) los combinamos con los datos recibidos
  const defaults = {
    description: 'Producto creado desde la terminal',
    image: 'https://i.pravatar.cc',
  };
  const newProduct = { ...defaults, title, price, category };

  const response = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProduct),
  });
  if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
  return response.json();
}

// DELETE products/<id>
async function deleteProduct(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
  const data = await response.text();
  return data ? JSON.parse(data) : null;
}

function showUsage() {
  console.log('Uso:');
  console.log('  npm run start GET products');
  console.log('  npm run start GET products/<productId>');
  console.log('  npm run start POST products <title> <price> <category>');
  console.log('  npm run start DELETE products/<productId>');
}

async function main() {
  if (!method || !resource) {
    console.log('Faltan argumentos.');
    showUsage();
    return;
  }

  // "products/15" -> ["products", "15"]
  const [endpoint, productId] = resource.split('/');

  if (endpoint !== 'products') {
    console.log(`Recurso no válido: "${resource}". Solo se admite "products".`);
    showUsage();
    return;
  }

  try {
    switch (method.toUpperCase()) {
      case 'GET': {
        const result = productId
          ? await getProductById(productId)
          : await getAllProducts();
        console.log(result ?? `No se encontró el producto con id ${productId}`);
        break;
      }

      case 'POST': {
        const [title, price, category] = params;
        if (!title || !price || !category) {
          console.log('Faltan datos. Uso: POST products <title> <price> <category>');
          return;
        }
        if (Number.isNaN(Number(price))) {
          console.log('El precio debe ser un número.');
          return;
        }
        const result = await createProduct({
          title,
          price: Number(price),
          category,
        });
        console.log('Producto creado:', result);
        break;
      }

      case 'DELETE': {
        if (!productId) {
          console.log('Falta el id. Uso: DELETE products/<productId>');
          return;
        }
        const result = await deleteProduct(productId);
        console.log('Producto eliminado:', result);
        break;
      }

      default:
        console.log(`Método no válido: "${method}".`);
        showUsage();
    }
  } catch (error) {
    console.error('Ocurrió un error:', error.message);
  }
}

main();
