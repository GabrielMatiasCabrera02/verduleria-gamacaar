/*
 * Lógica del carrito de compras. Permite agregar y quitar productos,
 * mantener el carrito en LocalStorage para persistir entre sesiones y
 * mostrar el total actualizado en pantalla. Las funciones están
 * diseñadas para un flujo simple sin frameworks.
 */

// Recuperar el carrito de LocalStorage (si existe) o inicializarlo vacío
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/**
 * Agrega un producto al carrito. Si el producto ya existe, incrementa
 * la cantidad; de lo contrario, lo agrega como nuevo ítem.
 * @param {number} id - Identificador del producto a agregar
 */
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
}

/**
 * Elimina un producto del carrito. Filtra por ID y descarta el ítem.
 * @param {number} id - Identificador del producto a eliminar
 */
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
}

/**
 * Guarda el carrito actualizado en LocalStorage y refresca la vista.
 */
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

/**
 * Renderiza el carrito de compras en el DOM. También calcula y
 * actualiza el valor total.
 */
function renderCart() {
  const cartList = document.getElementById("cart-list");
  const totalEl = document.getElementById("total");
  cartList.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    const unitPrice = item.discount && item.discount > 0
      ? item.price * (1 - item.discount / 100)
      : item.price;
    total += unitPrice * item.qty;
    cartList.innerHTML +=
      '<li class="list-group-item d-flex justify-content-between align-items-center">' +
        '<div>' + item.name + ' x' + item.qty + '</div>' +
        '<button class="btn btn-sm btn-danger" onclick="removeFromCart(' + item.id + ')">X</button>' +
      '</li>';
  });
  totalEl.innerText = total.toLocaleString();
}

// Mostrar el carrito al cargar la página
renderCart();
