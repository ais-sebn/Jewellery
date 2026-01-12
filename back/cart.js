let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " added to cart");
}

function displayCart() {
    const list = document.getElementById("cartItems");
    const totalEl = document.getElementById("total");

    if (!list || !totalEl) return;

    list.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        list.innerHTML += `<li>${item.name} – ₹${item.price}</li>`;
        total += item.price;
    });

    totalEl.textContent = "Total Amount: ₹" + total;
}

function placeOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty");
        return;
    }

    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    orders.push({
        date: new Date().toLocaleString(),
        items: cart,
        total: total
    });

    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("cart");

    document.getElementById("orderModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("orderModal").style.display = "none";
    window.location.reload();
}
