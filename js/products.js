/*
 * Catálogo de productos de ejemplo. Utilizar este archivo para listar
 * frutas y verduras disponibles. Cada producto incluye un ID único,
 * nombre, precio y unidad de medida. Puedes modificar o extender
 * este arreglo según tu catálogo real. Si prefieres mantener la lista
 * en un archivo JSON separado, crea un fichero products.json en la raíz
 * y adapta el código para cargarlo dinámicamente con fetch().
 */

const products = [
  // Puedes añadir una propiedad `discount` con el porcentaje de descuento.
  // Ejemplo: { id: 1, name: "Banana", price: 1200, unit: "kg", discount: 10 }
  { id: 1, name: "Banana", price: 1200, unit: "kg" },
  { id: 2, name: "Manzana", price: 1500, unit: "kg" },
  { id: 3, name: "Papa", price: 600, unit: "kg" },
  { id: 4, name: "Tomate", price: 1300, unit: "kg" }
];

// Renderizado del listado de productos en el DOM
const productList = document.getElementById("product-list");

// Recorrer el array de productos y crear tarjetas simples
products.forEach(product => {
  // Calcular precio final si hay descuento
  let displayPrice;
  if (product.discount && product.discount > 0) {
    const finalPrice = product.price * (1 - product.discount / 100);
    displayPrice = '<span class="text-decoration-line-through me-1">$' + product.price.toLocaleString() + '</span>' +
                   '<span>$' + finalPrice.toLocaleString() + '</span>';
  } else {
    displayPrice = '$' + product.price.toLocaleString();
  }
  productList.innerHTML +=
    '<div class="col-6 mb-3">' +
      '<div class="card p-2">' +
        '<h6>' + product.name + '</h6>' +
        '<p>' + displayPrice + ' / ' + product.unit + '</p>' +
        '<button class="btn btn-sm btn-primary" onclick="addToCart(' + product.id + ')">Agregar</button>' +
      '</div>' +
    '</div>';
});
