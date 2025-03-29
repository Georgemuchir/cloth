document.addEventListener("DOMContentLoaded", () => {
  // Retrieve the bag from localStorage or initialize it as an empty array
  const bag = JSON.parse(localStorage.getItem("bag")) || [];
  const bagCountElement = document.getElementById("bag-count");
  const bagItemsElement = document.getElementById("bag-items");
  const bagTotalElement = document.getElementById("bag-total");

  // Function to update the bag count display
  function updateBagCount() {
    const totalItems = bag.reduce((total, item) => total + item.quantity, 0);
    if (bagCountElement) {
      bagCountElement.textContent = totalItems;
    }
  }

  // Function to update the bag table
  function updateBag() {
    if (!bagItemsElement || !bagTotalElement) return; // Ensure elements exist
    bagItemsElement.innerHTML = ""; // Clear the current list
    let total = 0;

    bag.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      // Create a table row for each item
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover;"></td>
        <td>${item.name}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td>${item.quantity}</td>
        <td>$${itemTotal.toFixed(2)}</td>
        <td><button class="remove-item" data-index="${index}" style="background-color: #ff4d4d; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Remove</button></td>
      `;
      bagItemsElement.appendChild(row);
    });

    // Update the total price
    bagTotalElement.textContent = `Total: $${total.toFixed(2)}`;

    // Add event listeners to remove buttons
    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        bag.splice(index, 1); // Remove the item from the bag
        localStorage.setItem("bag", JSON.stringify(bag)); // Update localStorage
        updateBag(); // Refresh the bag
        updateBagCount(); // Refresh the bag count
      });
    });
  }

  // Function to add an item to the bag
  function addToBag(itemName, itemPrice, itemImage) {
    console.log("Adding to bag:", { itemName, itemPrice, itemImage }); // Debug log

    const existingItem = bag.find((item) => item.name === itemName);
    if (existingItem) {
      existingItem.quantity += 1; // Increment quantity if the item already exists
    } else {
      bag.push({ name: itemName, price: parseFloat(itemPrice), image: itemImage, quantity: 1 }); // Add new item
    }

    localStorage.setItem("bag", JSON.stringify(bag)); // Save the updated bag to localStorage
    updateBagCount(); // Update bag count
    updateBag(); // Refresh the bag display
    // Removed the alert
  }

  // Add event listeners to "Add to Bag" buttons
  document.querySelectorAll(".product-card").forEach((card) => {
    const addButton = card.querySelector(".add-to-bag");
    const itemName = card.querySelector("h3").textContent;
    const itemPrice = card.querySelector("p").textContent.replace("$", "");
    const itemImage = card.querySelector("img").getAttribute("src");

    console.log("Attaching event listener to:", { itemName, itemPrice, itemImage }); // Debug log

    if (addButton) {
      addButton.addEventListener("click", () => {
        addToBag(itemName, itemPrice, itemImage);
      });
    }
  });

  // Initialize the bag
  updateBagCount();
  updateBag();
});