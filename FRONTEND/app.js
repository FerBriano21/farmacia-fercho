const API = "http://localhost:3000/productos";

function cargar(){

    fetch(API)
    .then(res => res.json())
    .then(data => {

        let tabla = document.getElementById("tabla");
        tabla.innerHTML = "";

        data.forEach(p => {

            tabla.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td>${p.nombre}</td>
                <td>$${p.precio}</td>
                <td>${p.stock}</td>
                <td>
                    <button onclick="agregarCarrito('${p.nombre}', ${p.precio})">
                        🛒
                    </button>
                </td>
            </tr>
            `;
        });

    });
}

function agregarCarrito(nombre, precio){

    console.log("CLICK", nombre, precio); // 🔥 DEBUG

    let carrito = JSON.parse(localStorage.getItem("carrito"));

    if(!carrito){
        carrito = [];
    }

    carrito.push({
        nombre: nombre,
        precio: Number(precio)
    });

    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert("Agregado al carrito ✅");
}

cargar();


// POST
function agregar(){

    const nombre = document.getElementById("nombre").value;
    const precio = document.getElementById("precio").value;
    const stock = document.getElementById("stock").value;

    fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre, precio, stock })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        alert("Guardado en MySQL ✅");
        cargar();
    })
    .catch(err => console.log(err));
}

// DELETE
function eliminar(id){
    fetch(API + "/" + id, {
        method: "DELETE"
    }).then(cargar);
}
