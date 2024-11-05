const fs = require("fs");
const express = require("express");
const path = require("path");
const modelo = require("./servidor/modelo.js"); // Asegúrate de que el modelo esté correctamente referenciado
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

const passport = require("passport");
require("./servidor/passport-setup.js");
const session = require("express-session"); // Importa express-session

// Inicializa la sesión con express-session
app.use(session({
    secret: 'yourSecretKey', // Cambia esto a una clave segura
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Cambia a 'true' si usas HTTPS en producción
}));

app.use(passport.initialize());
app.use(passport.session());

// Configura la ruta de autenticación con Google
app.get("/auth/google", passport.authenticate('google', { scope: ['profile', 'email'] }));

// Define la ruta de callback de autenticación con Google
app.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/fallo' }), 
    function(req, res) {
        res.redirect('/good');
    }
);

// Ruta de éxito de autenticación
app.get("/good", function(request, response) {
    let nick = request.user.emails[0].value;
    if (nick) {
        sistema.agregarUsuario(nick);
    }
    response.cookie('nick', nick);
    response.redirect('/');
});

// Ruta de fallo de autenticación
app.get("/fallo", function(request, response) {
    response.send({nick: "nook"});
});

// Configura Express para servir archivos estáticos desde la carpeta "cliente"
app.use(express.static(path.join(__dirname, 'cliente')));

let sistema = new modelo.Sistema();

// Ruta para servir la página principal (index.html)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "cliente", "index.html"));
});

// Rutas para manejar solicitudes
app.get("/agregarUsuario/:nick", (request, response) => {
    let nick = request.params.nick;
    let resultado = sistema.agregarUsuario(nick);
    response.json(resultado);
});

app.get('/obtenerUsuarios', (req, res) => {
    let usuarios = sistema.obtenerUsuarios();
    res.json(usuarios);
});

app.get('/usuarioActivo/:nick', (req, res) => {
    let nick = req.params.nick;
    let isActive = sistema.usuarioActivo(nick);
    res.json({ activo: isActive });
});

app.get('/numeroUsuarios', (req, res) => {
    let numUsuarios = sistema.numeroUsuarios();
    res.json({ num: numUsuarios });
});

app.get('/eliminarUsuario/:nick', (req, res) => {
    let nick = req.params.nick;
    sistema.eliminarUsuario(nick);
    res.json({ eliminado: nick });
});

// Middleware para procesar datos en el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ruta para el callback de Google One Tap
app.post('/oneTap/callback',
    passport.authenticate('google-one-tap', { failureRedirect: '/fallo' }),
    function(req, res) {
        res.redirect('/good');
    }
);

// Inicia el servidor en el puerto especificado
app.listen(PORT, () => {
    console.log(`App está escuchando en el puerto ${PORT}`);
    console.log("Ctrl+C para salir");
});
