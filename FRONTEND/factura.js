let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

let total = 0;
let lista = document.getElementById("factura");

carrito.forEach(p => {
    lista.innerHTML += `<li>${p.nombre} - $${p.precio}</li>`;
    total += Number(p.precio);
});

document.getElementById("total").innerText = total;

function generarPDF(){
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Factura - Farmacia Fercho", 10, 10);

    let y = 20;

    carrito.forEach(p => {
        doc.text(`${p.nombre} - $${p.precio}`, 10, y);
        y += 10;
    });

    doc.text("Total: $" + total, 10, y + 10);

    doc.save("factura.pdf");
}