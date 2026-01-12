// ---------- PRODUCTS ----------
let products = JSON.parse(localStorage.getItem("products")) || [];

function renderProducts() {
    const container = document.getElementById("adminProducts");
    container.innerHTML = "";

    products.forEach((p, index) => {
        container.innerHTML += `
            <div class="admin-item">
                <img src="${p.image}">
                <p><strong>${p.name}</strong> – ₹${p.price}</p>
                <button onclick="deleteProduct(${index})">Delete</button>
            </div>
        `;
    });
}

function addProduct() {
    const name = pname.value.trim();
    const price = pprice.value;
    const image = pimage.value.trim();

    if (!name || !price || !image) {
        alert("All fields are required");
        return;
    }

    products.push({ name, price, image });
    localStorage.setItem("products", JSON.stringify(products));

    pname.value = "";
    pprice.value = "";
    pimage.value = "";

    renderProducts();
}

function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
}

// ---------- ORDERS ----------
function renderOrders() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const container = document.getElementById("orderHistory");

    if (orders.length === 0) {
        container.innerHTML = "<p>No orders placed yet.</p>";
        return;
    }

    container.innerHTML = "";

    orders.forEach((order, i) => {
        container.innerHTML += `
            <div class="order-card">
                <h4>Order ${i + 1}</h4>
                <p><strong>Date:</strong> ${order.date}</p>
                <ul>
                    ${order.items.map(item => `<li>${item.name} – ₹${item.price}</li>`).join("")}
                </ul>
                <p><strong>Total:</strong> ₹${order.total}</p>
            </div>
        `;
    });
}

renderProducts();
renderOrders();
s