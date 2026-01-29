const form = document.getElementById("productForm");
const table = document.getElementById("productTable");

let products = JSON.parse(localStorage.getItem("products")) || [];

function renderProducts() {
    table.innerHTML = "";
    products.forEach((p, i) => {
        table.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${p.name}</td>
                <td>$${p.price}</td>
                <td>${p.category}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editProduct(${i})">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteProduct(${i})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
}

form.addEventListener("submit", e => {
    e.preventDefault();

    const id = document.getElementById("productId").value;
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const category = document.getElementById("category").value;

    if (id === "") {
        products.push({ name, price, category });
    } else {
        products[id] = { name, price, category };
        document.getElementById("productId").value = "";
    }

    localStorage.setItem("products", JSON.stringify(products));
    form.reset();
    renderProducts();
});

function editProduct(index) {
    const p = products[index];
    document.getElementById("productId").value = index;
    document.getElementById("name").value = p.name;
    document.getElementById("price").value = p.price;
    document.getElementById("category").value = p.category;
}

function deleteProduct(index) {
    if (confirm("¿Eliminar este producto?")) {
        products.splice(index, 1);
        localStorage.setItem("products", JSON.stringify(products));
        renderProducts();
    }
}

renderProducts();
