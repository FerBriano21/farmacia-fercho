const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

/* 🔐 LOGIN */
app.post('/login', (req, res) => {

    const { usuario, password } = req.body;

    db.query(
        'SELECT * FROM usuarios WHERE usuario=? AND password=?',
        [usuario, password],
        (err, result) => {

            if(result.length > 0){
                res.json(result[0]);
            } else {
                res.json({ error: "Usuario incorrecto" });
            }

        }
    );
});

/* =========================
   CRUD (4 METODOS)
========================= */

// GET
app.get('/productos', (req, res) => {
    db.query('SELECT * FROM productos', (err, result) => {
        res.json(result);
    });
});

// POST
app.post('/productos', (req, res) => {
    const { nombre, precio, stock } = req.body;

    db.query(
        'INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)',
        [nombre, precio, stock],
        () => res.json({ mensaje: "Guardado" })
    );
});

// PUT
app.put('/productos/:id', (req, res) => {
    const { nombre, precio, stock } = req.body;
    db.query(
        'UPDATE productos SET nombre=?, precio=?, stock=? WHERE id=?',
        [nombre, precio, stock, req.params.id],
        () => res.json({ mensaje: "Producto actualizado" })
    );
});

// DELETE
app.delete('/productos/:id', (req, res) => {
    db.query(
        'DELETE FROM productos WHERE id=?',
        [req.params.id],
        () => res.json({ mensaje: "Eliminado" })
    );
});
app.listen(3000, () => console.log("Servidor listo"));