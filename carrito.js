const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const lista = document.getElementById("lista-carrito");

let total = 0;

function cargarCarrito() {

    lista.innerHTML = "";

    total = 0;

    carrito.forEach((producto, index) => {

        total += Number(producto.precio);

        lista.innerHTML += `
            <div class="product-card">

                <div class="product-img">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                </div>

                <h3>${producto.nombre}</h3>

                <p>$${Number(producto.precio).toLocaleString()}</p>

                <button onclick="eliminarProducto(${index})">
                    🗑️ Eliminar
                </button>

            </div>
        `;

    });

    document.getElementById("total").innerText =
        "Total: $" + total.toLocaleString();

}

function eliminarProducto(index) {

    carrito.splice(index, 1);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    location.reload();

}

function vaciarCarrito() {

    localStorage.removeItem("carrito");

    location.reload();

}

cargarCarrito();
function irCheckout() {

    if (carrito.length === 0) {

        alert("Tu carrito está vacío");

        return;

    }

    window.location.href = "checkout.html";

}