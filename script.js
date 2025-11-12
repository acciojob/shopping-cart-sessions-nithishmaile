// This is the boilerplate code given for you
// You can modify this code
// Product data
// const products = [
//   { id: 1, name: "Product 1", price: 10 },
//   { id: 2, name: "Product 2", price: 20 },
//   { id: 3, name: "Product 3", price: 30 },
//   { id: 4, name: "Product 4", price: 40 },
//   { id: 5, name: "Product 5", price: 50 },
// ];

// // DOM elements
// const productList = document.getElementById("product-list");

// // Render product list
// function renderProducts() {
//   products.forEach((product) => {
//     const li = document.createElement("li");
//     li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
//     productList.appendChild(li);
//   });
// }

// // Render cart list
// function renderCart() {}

// // Add item to cart
// function addToCart(productId) {}

// // Remove item from cart
// function removeFromCart(productId) {}

// // Clear cart
// function clearCart() {}

// // Initial render
// renderProducts();
// renderCart();


// 
const cartList = document.getElementById("cart-list");
const clearButton = document.getElementById("clear-cart-btn");

const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const productList = document.getElementById("product-list");

// ✅ Ensure default cart data if sessionStorage empty
if (!sessionStorage.getItem("cart")) {
  const defaultCart = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 5, name: "Product 5", price: 50 },
  ];
  sessionStorage.setItem("cart", JSON.stringify(defaultCart));
}

// Render product list
function renderProducts() {
  productList.innerHTML = "";
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} 
      <button type="button" class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = "";
  const existingCart = JSON.parse(sessionStorage.getItem("cart")) || [];
  existingCart.forEach((product) => {
    const li = document.createElement("li");
    li.textContent = `${product.name} - $${product.price}`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(e) {
  const productId = parseInt(e.target.dataset.id);
  const selectedProduct = products.find((p) => p.id === productId);
  const existingCart = JSON.parse(sessionStorage.getItem("cart")) || [];
  existingCart.push(selectedProduct);
  sessionStorage.setItem("cart", JSON.stringify(existingCart));
  renderCart();
}

// Clear cart
function clearCart() {
  sessionStorage.setItem("cart", JSON.stringify([]));
  renderCart();
}

// Initialize page
renderProducts();
renderCart();

clearButton.addEventListener("click", clearCart);
document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
  btn.addEventListener("click", addToCart);
});
