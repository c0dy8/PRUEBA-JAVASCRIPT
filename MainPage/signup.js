const form = document.getElementById("signupForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.querySelector('input[placeholder="Full name"]').value.trim();
    const email = form.querySelector('input[placeholder="Email address"]').value.trim();
    const password = form.querySelector('input[placeholder="Password"]').value.trim();
    const role = form.querySelector("select").value;

    // Validación de campos vacíos
    if (!name || !email || !password) {
        alert("Todos los campos son obligatorios");
        return;
    }

    try {
        // Obtener usuarios existentes
        const res = await fetch("http://localhost:3000/users");
        const users = await res.json();

        // Verificar email duplicado
        const exists = users.some(user => user.email === email);

        if (exists) {
            alert("❌ Este correo ya está registrado");
            return;
        }

        // Crear usuario
        const newUser = {
            name,
            email,
            password,
            role
        };

        await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
        });

        alert("Cuenta creada correctamente");
        window.location.href = "login.html";

    } catch (error) {
        console.error(error);
        alert("Error al crear la cuenta");
    }
});
