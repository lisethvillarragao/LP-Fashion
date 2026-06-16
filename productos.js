async function cargarProductos() {

    try {

        const respuesta = await fetch("http://localhost:3000/productos");

        const productos = await respuesta.json();

        const contenedor = document.getElementById("productos-dinamicos");

        contenedor.innerHTML = "";

        productos.forEach(producto => {

            contenedor.innerHTML += `
                <div class="product-card">

                    <div class="product-img">
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                    </div>

                    <h3>${producto.nombre}</h3>

                    <p>$${Number(producto.precio).toLocaleString()}</p>

                    <button onclick="agregarAlCarrito(${producto.id})">
                        Añadir al carrito
                    </button>

                </div>
            `;

        });

    } catch (error) {

        console.log(error);

    }

}

async function agregarAlCarrito(idProducto) {

    try {

        const respuesta = await fetch("http://localhost:3000/productos");

        const productos = await respuesta.json();

        const producto = productos.find(p => p.id == idProducto);

        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        carrito.push(producto);

        actualizarContador();
        
        localStorage.setItem("carrito", JSON.stringify(carrito));

        alert("Producto agregado al carrito 🛒");

    } catch (error) {

        console.log(error);

    }

}

cargarProductos();
actualizarContador();

function actualizarContador() {

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const contador = document.getElementById("contador-carrito");

    contador.innerText = `🛒 (${carrito.length})`;

}