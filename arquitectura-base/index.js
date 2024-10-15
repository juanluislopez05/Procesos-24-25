const fs = require("fs");
const express = require("express");
const path = require("path");
const modelo = require("./servidor/modelo.js"); // Asegúrate de que el modelo esté correctamente referenciado

const app = express();
const PORT = process.env.PORT || 3000;

// Configura Express para servir archivos estáticos desde la carpeta "cliente"
app.use(express.static(path.join(__dirname, 'cliente'))); // Cambia esta línea

let sistema = new modelo.Sistema();

// Ruta para servir la página principal (index.html)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "cliente", "index.html")); // Usa sendFile para enviar el index.html
});

// Rutas para manejar solicitudes
app.get("/agregarUsuario/:nick", (request, response) => {
    let nick = request.params.nick;
    let resultado = sistema.agregarUsuario(nick);
    response.json(resultado); // Respuesta como JSON
});

app.get('/obtenerUsuarios', (req, res) => {
    let usuarios = sistema.obtenerUsuarios();
    res.json(usuarios); // Enviar la lista de usuarios como JSON
});

app.get('/usuarioActivo/:nick', (req, res) => {
    let nick = req.params.nick;
    let isActive = sistema.usuarioActivo(nick);
    res.json({ activo: isActive }); // Respuesta en JSON
});

app.get('/numeroUsuarios', (req, res) => {
    let numUsuarios = sistema.numeroUsuarios();
    res.json({ num: numUsuarios }); // Respuesta en JSON
});

app.get('/eliminarUsuario/:nick', (req, res) => {
    let nick = req.params.nick;
    sistema.eliminarUsuario(nick);
    res.json({ eliminado: nick }); // Respuesta indicando que el usuario fue eliminado
});

// Inicia el servidor en el puerto especificado
app.listen(PORT, () => {
    console.log(`App está escuchando en el puerto ${PORT}`);
    console.log("Ctrl+C para salir");
});