const cartList = document.getElementById("cart-list");
const clearButton = document.getElementById("clear-cart-btn");
const productList = document.getElementById("product-list");

const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

if (!sessionStorage.getItem("cart")) {
  const defaultCart = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 5, name: "Product 5", price: 50 },
  ];
  sessionStorage.setItem("cart", JSON.stringify(defaultCart));
}

// ✅ Render all products
function renderProducts() {
  productList.innerHTML = "";
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price}
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });
}

// ✅ Render the cart items
function renderCart() {
  cartList.innerHTML = "";
  const existingCart = JSON.parse(sessionStorage.getItem("cart")) || [];
  existingCart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// ✅ Add to cart
function addToCart(e) {
  const productId = parseInt(e.target.dataset.id);
  const product = products.find((p) => p.id === productId);

  // Get current cart (if none, empty array)
  const existingCart = JSON.parse(sessionStorage.getItem("cart")) || [];

  // Add product and save
  existingCart.push(product);
  sessionStorage.setItem("cart", JSON.stringify(existingCart));

  // Re-render
  renderCart();
}

// ✅ Clear cart
function clearCart() {
  sessionStorage.setItem("cart", JSON.stringify([]));
  renderCart();
}

// ✅ On page load: render products and restore cart from sessionStorage
window.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCart();

  // attach event listeners
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", addToCart);
  });

  clearButton.addEventListener("click", clearCart);
});
