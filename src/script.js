const products = [
    {
        name: "Laptop",
        description: "Powerful laptop suitable for work, study and entertainment.",
        price: 55000
    },
    {
        name: "Smartphone",
        description: "Modern smartphone with a high-quality display and camera.",
        price: 25000
    },
    {
        name: "Wireless Headphones",
        description: "Comfortable wireless headphones with excellent sound quality.",
        price: 3500
    },
    {
        name: "Keyboard",
        description: "Compact and comfortable keyboard for everyday use.",
        price: 1500
    },
    {
        name: "Wireless Mouse",
        description: "Smooth and responsive wireless mouse for your computer.",
        price: 900
    },
    {
        name: "Smart Watch",
        description: "Smart watch with fitness tracking and notification support.",
        price: 4500
    }
];

const productContainer = document.getElementById("product-container");

products.forEach(function(product) {

    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p class="price">₹${product.price}</p>
    `;

    productContainer.appendChild(card);
});

if (typeof APP_NAME !== "undefined") {
    document.getElementById("app-title").textContent = APP_NAME;
    document.title = APP_NAME;
}