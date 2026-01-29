document.addEventListener("DOMContentLoaded", () => {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const orderBox = document.querySelector(".order-box");

    document.querySelectorAll(".btn-add").forEach(button => {
        button.addEventListener("click", (e) => {
            const card = e.target.closest(".food-card");

            const name = card.querySelector("h6").textContent;
            const price = parseFloat(
                card.querySelector(".price").textContent.replace("$", "")
            );

            cart.push({ name, price });
            localStorage.setItem("cart", JSON.stringify(cart));

            renderCart();
        });
    });

    function renderCart() {
        let total = 0;

        orderBox.innerHTML = `
            <h5 class="fw-bold mb-3">Your Order</h5>
        `;

        cart.forEach(item => {
            total += item.price;
            orderBox.innerHTML += `
                <div class="order-item">
                    <span>${item.name}</span>
                    <span>$${item.price.toFixed(2)}</span>
                </div>
            `;
        });

        orderBox.innerHTML += `
            <hr>
            <div class="order-item">
                <strong>Total</strong>
                <strong class="text-success">$${total.toFixed(2)}</strong>
            </div>
            <button class="btn btn-success w-100 mt-3" id="confirmOrder">
                Confirm Order →
            </button>
        `;

        document
            .getElementById("confirmOrder")
            .addEventListener("click", sendOrder);
    }

    async function sendOrder() {
        if (cart.length === 0) {
            alert("Cart is empty");
            return;
        }

        const order = {
            items: cart,
            total: cart.reduce((sum, i) => sum + i.price, 0),
            date: new Date().toISOString()
        };

        await fetch("http://localhost:3000/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order)
        });

        localStorage.removeItem("cart");
        window.location.href = "dashboard.html";
    }

    renderCart();

}); 


const searchInput = document.getElementById("searchInput");
const foodItems = document.querySelectorAll(".food-item");

function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

function handleSearch() {
    const searchValue = searchInput.value.toLowerCase().trim();

    foodItems.forEach(item => {
        const foodName = item.dataset.name.toLowerCase();

        if (foodName.includes(searchValue)) {
            item.classList.remove("hidden");
        } else {
            item.classList.add("hidden");
        }
    });
}

searchInput.addEventListener("input", debounce(handleSearch, 400));
