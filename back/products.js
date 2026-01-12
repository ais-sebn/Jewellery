let products = JSON.parse(localStorage.getItem("products"));

if (!products || products.length < 12) {
    products = [
        { name: "Gold Ring Classic", price: 12000, image: "images/ring1.jpg" },
        { name: "Diamond Ring", price: 18000, image: "images/ring2.jpg" },
        { name: "Rose Gold Ring", price: 15000, image: "images/ring3.jpg" },

        { name: "Royal Necklace", price: 28000, image: "images/necklace1.jpg" },
        { name: "Pearl Necklace", price: 22000, image: "images/necklace2.jpg" },
        { name: "Gold Chain Necklace", price: 26000, image: "images/necklace3.jpg" },

        { name: "Silver Earrings", price: 6000, image: "images/earrings1.jpg" },
        { name: "Diamond Stud Earrings", price: 9000, image: "images/earrings2.jpg" },
        { name: "Traditional Earrings", price: 8000, image: "images/earrings3.jpg" },

        { name: "Gold Bracelet", price: 14000, image: "images/bracelet1.jpg" },
        { name: "Charm Bracelet", price: 11000, image: "images/bracelet2.jpg" },
        { name: "Luxury Bracelet", price: 17000, image: "images/bracelet3.jpg" }
    ];

    localStorage.setItem("products", JSON.stringify(products));
}

function loadProducts() {
    const list = document.getElementById("productList");
    if (!list) return;

    list.innerHTML = "";

    products.forEach(p => {
        list.innerHTML += `
            <div class="product-card">
                <img src="${p.image}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p><strong>₹${p.price}</strong></p>
                <button onclick="addToCart('${p.name}', ${p.price})">
                    Add to Cart
                </button>
            </div>
        `;
    });
}

document.addEventListener("DOMContentLoaded", loadProducts);
