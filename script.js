let cart=JSON.parse(sessionStorage.getItem("cart")) ||[]

const cartList=document.getElementById("cart-list");
const clearButton=document.getElementById("clear-cart-btn")
const products = [
{ id: 1, name: "Product 1", price: 10 },
{ id: 2, name: "Product 2", price: 20 },
{ id: 3, name: "Product 3", price: 30 },
{ id: 4, name: "Product 4", price: 40 },
{ id: 5, name: "Product 5", price: 50 },
];


// DOM elements
const productList = document.getElementById("product-list");

// Render product list
function renderProducts() {
products.forEach((product) => {
	const li = document.createElement("li");
	li.innerHTML = `${product.name} - $${product.price} <button type="button" class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
	productList.appendChild(li);
});

}


// Render cart list
function renderCart() {
	cartList.innerHTML=""
    cart=JSON.parse(sessionStorage.getItem("cart")) || [];
	//If the cart is empty
	for(let product of cart){
		const li=document.createElement("li");
		li.innerHTML=`<p>${product.name} </p> <p>$${product.price}</p> <button type="button" id=${product.id} onClick="removeFromCart(event)">Remove</button>`
		cartList.appendChild(li)
	}
}


// Add item to cart

//e.target.dataset.id
function addToCart(e) {
	const cartData=products.filter((object)=>object.id==e.target.dataset.id)
	const existingCart=JSON.parse(sessionStorage.getItem("cart")) || []
	existingCart.push(...cartData)
	sessionStorage.setItem("cart",JSON.stringify(existingCart))
	//console.log(sessionStorage.getItem("cartData"))
	renderCart()
}

// Remove item from cart
function removeFromCart(event) {
	const existingCart=JSON.parse(sessionStorage.getItem("cart"))
	const filterData=existingCart.filter(data=>data.id!=event.target.id)
	event.target.parentNode.remove()
	sessionStorage.setItem("cart",JSON.stringify(filterData))
}

// Clear cart
function clearCart() {
	sessionStorage.setItem("cart",JSON.stringify([]))
	renderCart()
}

// Initial render
renderProducts();

renderCart();

clearButton.addEventListener("click",clearCart)

const addtoButtons=document.querySelectorAll(".add-to-cart-btn")
console.log(addtoButtons)

addtoButtons.forEach((button)=>{
	 button.addEventListener("click",addToCart)
})