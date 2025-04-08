document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.getElementById("product-grid");

  // Retrieve products from localStorage
  const products = JSON.parse(localStorage.getItem("products")) || [];

  // Render products on the homepage
  function renderProducts() {
    productGrid.innerHTML = ""; // Clear the current product grid

    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <button class="add-to-bag">Add to Bag</button>
      `;
      productGrid.appendChild(productCard);
    });
  }

  // Initial render
  renderProducts();
});