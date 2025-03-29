document.addEventListener("DOMContentLoaded", () => {
  // Retrieve the bag from localStorage or initialize it as an empty array
  const bag = JSON.parse(localStorage.getItem("bag")) || [];
  const bagCountElement = document.getElementById("bag-count");
  const bagDropdown = document.getElementById("bag-dropdown");
  const bagItemsElement = document.getElementById("bag-items");
  const bagTotalElement = document.getElementById("bag-total");

  // Calculate the initial bag count
  let bagCount = bag.reduce((total, item) => total + item.quantity, 0);

  // Update the bag count display
  function updateBagCount() {
    bagCountElement.textContent = bagCount;
  }

  // Update the bag dropdown display
  function updateBagDropdown() {
    bagItemsElement.innerHTML = "";
    let total = 0;

    bag.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const listItem = document.createElement("li");
      listItem.innerHTML = `
        ${item.name} (x${item.quantity}) - $${itemTotal.toFixed(2)}
        <button data-index="${index}" class="remove-item">Remove</button>
      `;
      bagItemsElement.appendChild(listItem);
    });

    bagTotalElement.textContent = `Total: $${total.toFixed(2)}`;

    // Add event listeners to remove buttons
    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        bagCount -= bag[index].quantity;
        bag.splice(index, 1);
        localStorage.setItem("bag", JSON.stringify(bag));
        updateBagCount();
        updateBagDropdown();
      });
    });
  }

  // Add to bag function
  function addToBag(itemName, itemPrice) {
    const existingItem = bag.find((item) => item.name === itemName);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      bag.push({ name: itemName, price: parseFloat(itemPrice), quantity: 1 });
    }
    bagCount++;
    localStorage.setItem("bag", JSON.stringify(bag));
    updateBagCount();
    updateBagDropdown();
    alert(`${itemName} has been added to your bag.`);
  }

  // Add event listeners to "Add to Bag" buttons
  const productCards = document.querySelectorAll(".product-card");
  productCards.forEach((card) => {
    const addButton = card.querySelector(".add-to-bag");

    addButton.addEventListener("click", () => {
      const itemName = card.querySelector("h3").textContent;
      const itemPrice = card.querySelector("p").textContent.replace("$", "");
      addToBag(itemName, itemPrice);
    });
  });

  // Initialize bag count and dropdown
  updateBagCount();
  updateBagDropdown();

  // Toggle bag dropdown visibility
  document.querySelector(".bag-link").addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default link behavior
    bagDropdown.style.display =
      bagDropdown.style.display === "block" ? "none" : "block";
  });
});