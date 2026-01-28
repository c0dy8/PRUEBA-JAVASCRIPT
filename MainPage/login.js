const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const role = document.getElementById("role").value;

    // Validación básica
    if (!name || !email) {
        alert(" Completa todos los campos");
        return;
    }

    try {
        // Traer usuarios del servidor
        const response = await fetch("http://localhost:3000/users");
        const users = await response.json();

        // Buscar coincidencia
        const userFound = users.find(
            user => user.email === email && user.role === role
        );

        if (!userFound) {
            alert("Usuario no encontrado");
            return;
        }

        // Guardar sesión
        sessionStorage.setItem("user", JSON.stringify(userFound));

        // Redirección por rol
        if (userFound.role === "Admin") {
            window.location.replace("dashboard.html");
        } else {
            window.location.replace("user.html");
        }

    } catch (error) {
        console.error(error);
        alert("Error al iniciar sesión");
    }
});
