document.getElementById("formProducto").addEventListener("submit", async (e) => {

    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const precio = document.getElementById("precio").value;
    const imagen = document.getElementById("imagen").value;
    const categoria = document.getElementById("categoria").value;
    const talla = document.getElementById("talla").value;
    const color = document.getElementById("color").value;

    const respuesta = await fetch("http://localhost:3000/agregar-producto", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            nombre,
            precio,
            imagen,
            categoria,
            talla,
            color
        })

    });

    const datos = await respuesta.json();

    document.getElementById("mensaje").innerText = datos.mensaje;

});