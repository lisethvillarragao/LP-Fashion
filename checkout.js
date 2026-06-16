document.getElementById("formCheckout").addEventListener("submit", async (e) => {

    e.preventDefault();

    const nombre =
        document.getElementById("nombre").value;

    const direccion =
        document.getElementById("direccion").value;

    const ciudad =
        document.getElementById("ciudad").value;

    const telefono =
        document.getElementById("telefono").value;

    try {

        const respuesta = await fetch(
            "http://localhost:3000/pedido",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombre,
                    direccion,
                    ciudad,
                    telefono
                })
            }
        );

        const datos = await respuesta.json();

        alert(datos.mensaje);

        localStorage.removeItem("carrito");

        window.location.href = "index.html";

    } catch (error) {

        console.log(error);

        alert("Error al enviar pedido");

    }

});