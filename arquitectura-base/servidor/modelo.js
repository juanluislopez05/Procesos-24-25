const datos = require("./cad.js");
function Sistema(){
    this.cad = new datos.CAD();
    this.cad.conectar((db) => {
        console.log("Conectado a Mongo Atlas");
    });
    this.usuarios={}; // que tipo coleccion???
    //operaciones sobre la colección
    this.agregarUsuario = function (nick) {
        let res = { nick: -1 }; // Inicializa el resultado
        if (!this.usuarios[nick]) {
            // Solo agregar si el usuario no existe
            this.usuarios[nick] = new Usuario(nick); // Crear nuevo usuario
            this.usuarios[nick].activo = true; // Marcar el usuario como activo
            console.log("Usuario agregado:", this.usuarios);
            res.nick = nick; // Retornar el nick del usuario
        } else {
            console.log("El nick " + nick + " está en uso");
        }
        return res; // Retorna el resultado
    };
    this.obtenerUsuarios = function () {
        // Convertir el objeto usuarios a un array de usuarios
        return Object.keys(this.usuarios).map(nick => {
            return {
                nick: this.usuarios[nick].nick, // Asegúrate de que el nombre del campo es correcto
                activo: this.usuarios[nick].activo // Asegúrate de que 'activo' esté definido
            };
        });
    };
    
    this.eliminarUsuario=function(nick){
        if (this.usuarios[nick]){
            delete this.usuarios[nick];
            console.log(`Usuario ${nick} eliminado.`);
        }
        else{
            console.log("El usuario no existe.");
        }
    }
    
    this.usuarioActivo = function(nick) {
        return !!this.usuarios[nick]; // Devuelve true si el usuario existe, false en caso contrario
        };
    this.numeroUsuarios = function() {
        return Object.keys(this.usuarios).length; // Cuenta las claves en el objeto usuarios
        };
        
        
}

function Usuario(nick){
    this.nick=nick;
}
module.exports.Sistema = Sistema;
