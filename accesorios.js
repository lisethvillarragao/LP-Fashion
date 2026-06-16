async function cargaraccesorios() {

const respuesta = await fetch(
    "http://localhost:3000/productos/categoria/Zapatos"
);

const productos = await respuesta.json();

const contenedor =
    document.getElementById("productos-zapatos");

contenedor.innerHTML = "";

productos.forEach(producto => {

    contenedor.innerHTML += `
        <div class="product-card">

            <div class="product-img">
                <img src="${producto.imagen}" alt="${producto.nombre}">
            </div>

            <h3>${producto.nombre}</h3>

            <p>
                $${Number(producto.precio).toLocaleString()}
            </p>

            <p>
                Tallas: ${producto.talla}
            </p>

            <p>
                Colores: ${producto.color}
            </p>

            <button onclick="agregarAlCarrito(${producto.id})">
                Agregar al carrito
            </button>

        </div>
    `;

});

}

async function agregarAlCarrito(idProducto) {

try {

    const respuesta = await fetch(
        "http://localhost:3000/productos/categoria/Zapatos"
    );

    const productos = await respuesta.json();

    const producto = productos.find(
        p => p.id == idProducto
    );

    let carrito =
        JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.push(producto);

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    alert("Producto agregado al carrito 🛒");

} catch (error) {

    console.log(error);

}

}

cargaraccesorios();