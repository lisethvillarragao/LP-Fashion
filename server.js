const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Conexión a MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "lp_store"
});

db.connect((err) => {
    if (err) {
        console.log("Error MySQL:", err);
    } else {
        console.log("Conectado a MySQL ✅");
    }
});

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("PRUEBA L&P 2026");
});

// Registro de usuarios
app.post("/registro", (req, res) => {

    const { nombre, correo, password } = req.body;

    // Verificar si el correo ya existe
    const verificar = "SELECT * FROM usuarios WHERE correo = ?";

    db.query(verificar, [correo], (err, resultado) => {

        if (err) {
            return res.status(500).json({
                mensaje: "Error al verificar usuario"
            });
        }

        // Si ya existe un usuario con ese correo
        if (resultado.length > 0) {
            return res.json({
                mensaje: "Este correo ya está registrado"
            });
        }

        // Registrar nuevo usuario
        const sql = `
            INSERT INTO usuarios (nombre, correo, password)
            VALUES (?, ?, ?)
        `;

        db.query(sql, [nombre, correo, password], (err) => {

            if (err) {
                return res.status(500).json({
                   mensaje: "CORREO DUPLICADO DETECTADO 🚫"
                });
            }

            res.json({
                mensaje: "Usuario registrado correctamente 🎉"
            });

        });

    });

});

// Iniciar servidor
// Login
app.post("/login", (req, res) => {

    const { correo, password } = req.body;

    const sql = `
        SELECT * FROM usuarios
        WHERE correo = ? AND password = ?
    `;

    db.query(sql, [correo, password], (err, resultado) => {

        if (err) {
            return res.status(500).json({
                mensaje: "Error del servidor"
            });
        }

        if (resultado.length > 0) {

            res.json({
                mensaje: "Bienvenido a L&P Fashion 🎉"
            });

        } else {

            res.json({
                mensaje: "Correo o contraseña incorrectos"
            });

        }

    });

});
// Obtener productos
app.get("/productos", (req, res) => {

    const sql = "SELECT * FROM productos";

    db.query(sql, (err, resultado) => {

        if (err) {
            return res.status(500).json({
                mensaje: "Error al obtener productos"
            });
        }

        res.json(resultado);

    });

});
// Obtener productos por categoría
app.get("/productos/categoria/:categoria", (req, res) => {

    const categoria = req.params.categoria;

    const sql = `
        SELECT * FROM productos
        WHERE categoria = ?
    `;

    db.query(sql, [categoria], (err, resultado) => {

        if (err) {
            return res.status(500).json({
                mensaje: "Error al obtener productos"
            });
        }

        res.json(resultado);

    });

});
// Agregar producto
app.post("/agregar-producto", (req, res) => {
    const { nombre, precio, imagen, categoria, talla, color } = req.body;

    // Validación básica
    if (!nombre || !precio) {
        return res.status(400).json({
            mensaje: "Nombre y precio son obligatorios"
        });
    }

    const sql = `
        INSERT INTO productos
        (nombre, precio, imagen, categoria, talla, color)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [nombre, precio, imagen, categoria, talla, color],
        (err, result) => {
            if (err) {
                console.error("Error SQL:", err);

                return res.status(500).json({
                    mensaje: "Error al agregar producto",
                    error: err.message
                });
            }

            res.status(201).json({
                mensaje: "Producto agregado correctamente 🎉",
                id: result.insertId
            });
        }
    );
});


// Guardar pedido
app.post("/pedido", (req, res) => {
    const { nombre, direccion, ciudad, telefono } = req.body;

    if (!nombre || !direccion || !telefono) {
        return res.status(400).json({
            mensaje: "Faltan datos obligatorios"
        });
    }

    const sql = `
        INSERT INTO pedidos
        (nombre, direccion, ciudad, telefono)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [nombre, direccion, ciudad, telefono],
        (err, result) => {
            if (err) {
                console.error("Error SQL:", err);

                return res.status(500).json({
                    mensaje: "Error al guardar pedido",
                    error: err.message
                });
            }

            res.status(201).json({
                mensaje: "Pedido guardado correctamente 🎉",
                id: result.insertId
            });
        }
    );
});


// Iniciar servidor
app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});