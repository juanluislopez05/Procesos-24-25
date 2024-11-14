const fs = require("fs");
const express = require('express');
const app = express();
const passport = require("passport");
const session = require("express-session"); // Cambiado a express-session
const modelo = require("./servidor/modelo.js");
const PORT = process.env.PORT || 3000;

require("./servidor/passport-setup.js");
require('dotenv').config();

// Configuración de archivos estáticos
app.use(express.static(__dirname + "/"));

// Configuración de express-session
app.use(session({
    secret: 'your_secret_key', // Cambia esto a una clave secreta única
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // Configuración de la duración de la cookie (24 horas)
}));

// Inicialización de Passport
app.use(passport.initialize());
app.use(passport.session());

let sistema = new modelo.Sistema(); // Inicialización de la instancia de sistema

// Rutas de autenticación
app.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/fallo' }),
    function (req, res) {
        res.redirect('/good');
    });

app.get("/good", function (request, response) {
    let nick = request.user.emails[0].value;
    if (nick) {
        sistema.agregarUsuario(nick);
    }
    response.cookie('nick', nick);
    response.redirect('/');
});

app.get("/fallo", function (request, response) {
    response.send({ nick: "nook" });
});

app.get("/auth/google", passport.authenticate('google', { scope: ['profile', 'email'] }));

// Ruta principal para el cliente
app.get("/", function (request, response) {
    let contenido = fs.readFileSync(__dirname + "/Cliente/index.html");
    response.setHeader('Content-Type', 'text/html');
    response.send(contenido);
});

// Rutas del sistema
app.get("/agregarUsuario/:nick", function (request, response) {
    let nick = request.params.nick;
    let res = sistema.agregarUsuario(nick);
    response.send(res);
});

app.get("/eliminarUsuario/:nick", function (request, response) {
    let nick = request.params.nick;
    let res = sistema.eliminarUsuario(nick);
    response.send(res);
});

app.get("/obtenerUsuarios", function (request, response) {
    let res = sistema.obtenerUsuarios();
    response.send(res);
});

app.get("/usuarioActivo/:nick", function (request, response) {
    let nick = request.params.nick;
    let res = sistema.usuarioActivo(nick);
    response.send(res);
});

app.get("/numeroUsuarios", function (request, response) {
    let res = sistema.numeroUsuarios();
    response.send(res);
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`App está escuchando en el puerto ${PORT}`);
    console.log('Ctrl+C para salir');
});
