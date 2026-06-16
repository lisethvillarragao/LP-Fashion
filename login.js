document.getElementById("formLogin").addEventListener("submit", async (e) => {

    e.preventDefault();

    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;

    const mensaje = document.getElementById("mensaje");

    try {

        const respuesta = await fetch("http://localhost:3000/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                correo,
                password
            })

        });

        const datos = await respuesta.json();

if (datos.mensaje === "Bienvenido a L&P Fashion 🎉") {

    mensaje.innerText = datos.mensaje;

    setTimeout(() => {
        window.location.href = "index.html";
    }, 1500);

} else {

    mensaje.innerText = datos.mensaje;

}
    } catch (error) {

        mensaje.innerText = "Error al conectar con el servidor";

    }

});