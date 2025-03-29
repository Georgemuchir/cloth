document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("admin.html")) {
      const isAdmin = confirm("Are you authorized to access the admin panel?");
      if (!isAdmin) {
        alert("Access denied!");
        window.location.href = "index.html";
      }
    }
  
    const addItemForm = document.getElementById("add-item-form");
    const inventoryTable = document.getElementById("inventory-table")?.querySelector("tbody");
  
    if (addItemForm) {
      addItemForm.addEventListener("submit", (e) => {
        e.preventDefault();
  
        const itemName = document.getElementById("item-name").value;
        const itemPrice = document.getElementById("item-price").value;
        const itemQuantity = document.getElementById("item-quantity").value;
  
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
          <td>${itemName}</td>
          <td>$${itemPrice}</td>
          <td>${itemQuantity}</td>
          <td>
            <button class="delete-item">Remove</button>
          </td>
        `;
  
        newRow.querySelector(".delete-item").addEventListener("click", () => {
          newRow.remove();
        });
  
        inventoryTable.appendChild(newRow);
        addItemForm.reset();
      });
    }
  });