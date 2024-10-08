const fs=require("fs");
const express = require('express');
const app = express();
//const modelo = require("./servidor/modelo.js");
const PORT = process.env.PORT || 3000;
app.use(express.static(__dirname + "/"));
app.get("/", function(request,response){
response.statusCode = 200;
response.setHeader('Content-Type', 'text/plain');
response.end('Hola Mundo!');
});
app.listen(PORT, () => {
console.log(`App está escuchando en el puerto ${PORT}`);
console.log('Ctrl+C para salir');
});
