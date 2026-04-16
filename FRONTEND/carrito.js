let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function cargarCarrito(){

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    let tabla = document.getElementById("tablaCarrito");
    let total = 0;

    tabla.innerHTML = "";

    carrito.forEach(p => {

        let precio = Number(p.precio) || 0;

        total += precio;

        tabla.innerHTML += `
        <tr>
            <td>${p.nombre}</td>
            <td>$${precio}</td>
        </tr>
        `;
    });

    document.getElementById("total").innerText = total;
}
function pagar(){

    let total = document.getElementById("total").innerText;

    if(total == 0){
        alert("El carrito está vacío");
        return;
    }

    alert("Procesando pago...");

    setTimeout(() => {
        alert("✅ Pago realizado con éxito");

        localStorage.removeItem("carrito");

        window.location = "factura.html";
    }, 2000);
    
}


function facturar(){
    window.location = "factura.html";
}

mostrarCarrito();