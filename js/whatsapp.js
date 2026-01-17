/*
 * Funcón para generar el enlace de WhatsApp con el pedido. Este
 * archivo toma los ítems del carrito, construye un mensaje con el
 * detalle, el total y la dirección de entrega, luego abre una
 * nueva pestaña con un link wa.me para iniciar la conversación.
 */

function sendWhatsAppOrder() {
  // Validación: el carrito no debe estar vacío
  if (cart.length === 0) {
    alert("El carrito está vacío");
    return;
  }
  // Obtener la dirección ingresada
  const addressInput = document.getElementById("address");
  const address = addressInput.value.trim();
  if (!address) {
    alert("Ingresá una dirección de entrega");
    addressInput.focus();
    return;
  }
  // Construir el mensaje de WhatsApp
  let message = "Hola! Quiero hacer el siguiente pedido:%0A%0A";
  cart.forEach(item => {
    const unitPrice = item.discount && item.discount > 0
      ? item.price * (1 - item.discount / 100)
      : item.price;
    const linePrice = unitPrice * item.qty;
    message += '- ' + item.name + ' x' + item.qty + ' ($' + linePrice.toLocaleString() + ")%0A";
  });
  const total = cart.reduce((sum, item) => {
    const unitPrice = item.discount && item.discount > 0
      ? item.price * (1 - item.discount / 100)
      : item.price;
    return sum + unitPrice * item.qty;
  }, 0);
  message += '%0ATotal: $' + total.toLocaleString() + '%0A';
  message += 'Dirección de entrega: ' + encodeURIComponent(address);
  // Número de WhatsApp del negocio
  const phone = '5491139370607';
  const url = 'https://wa.me/' + phone + '?text=' + message;
  // Abrir el enlace en una nueva pestaña
  window.open(url, '_blank');
}
