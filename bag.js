document.addEventListener("DOMContentLoaded", () => {
  // Retrieve the bag from localStorage or initialize it as an empty array
  const bag = JSON.parse(localStorage.getItem("bag")) || [];
  const bagCountElement = document.getElementById("bag-count");
  const bagItemsElement = document.getElementById("bag-items");
  const bagTotalElement = document.getElementById("bag-total");

  // Calculate the initial bag count
  let bagCount = bag.reduce((total, item) => total + item.quantity, 0);

  // Update the bag count display
  function updateBagCount() {
    if (bagCountElement) {
      bagCountElement.textContent = bagCount;
    }
  }

  // Update the bag dropdown display
  function updateBagDropdown() {
    if (!bagItemsElement || !bagTotalElement) return; // Ensure elements exist
    bagItemsElement.innerHTML = ""; // Clear the current list
    let total = 0;

    // Loop through the bag array and display each item
    bag.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      // Create a list item for each product
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        ${item.name} (x${item.quantity}) - $${itemTotal.toFixed(2)}
        <button data-index="${index}" class="remove-item">Remove</button>
      `;
      bagItemsElement.appendChild(listItem);
    });

    // Update the total price in the dropdown
    bagTotalElement.textContent = `Total: $${total.toFixed(2)}`;

    // Add event listeners to remove buttons
    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        bagCount -= bag[index].quantity;
        bag.splice(index, 1); // Remove the item from the bag array
        localStorage.setItem("bag", JSON.stringify(bag)); // Update localStorage
        updateBagCount(); // Update the bag count
        updateBagDropdown(); // Update the dropdown
      });
    });
  }

  // Add to bag function
  function addToBag(itemName, itemPrice) {
    const existingItem = bag.find((item) => item.name === itemName);
    if (existingItem) {
      existingItem.quantity += 1; // Increment quantity if the item already exists
    } else {
      bag.push({ name: itemName, price: parseFloat(itemPrice), quantity: 1 }); // Add new item
    }
    bagCount++;
    localStorage.setItem("bag", JSON.stringify(bag)); // Save the updated bag to localStorage
    updateBagCount(); // Update the bag count
    updateBagDropdown(); // Update the dropdown
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
});