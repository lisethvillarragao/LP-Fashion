document.getElementById("formRegistro").addEventListener("submit", async (e) => {

    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;
    const confirmarPassword = document.getElementById("confirmarPassword").value;

    const mensaje = document.getElementById("mensaje");

    if (password !== confirmarPassword) {
        mensaje.innerText = "Las contraseñas no coinciden";
        return;
    }

    try {

        const respuesta = await fetch("http://localhost:3000/registro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre,
                correo,
                password
            })
        });

        const datos = await respuesta.json();

    if (datos.mensaje === "Usuario registrado correctamente 🎉") {

    mensaje.innerText = datos.mensaje;

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1500);

} else {

    mensaje.innerText = datos.mensaje;

}

    } catch (error) {

        console.error(error);
        mensaje.innerText = "Error al conectar";

    }

});