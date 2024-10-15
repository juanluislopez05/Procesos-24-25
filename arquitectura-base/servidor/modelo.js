function Sistema(){
    this.usuarios={}; // que tipo coleccion???
    //operaciones sobre la colección
    this.agregarUsuario = function (nick) {
        let res = { nick: -1 };
        if (!this.usuarios[nick]) {
            this.usuarios[nick] = new Usuario(nick);
            console.log("Usuario agregado:", this.usuarios);
            res.nick = nick;
        } else {
            console.log("El nick " + nick + " está en uso");
        }
        return res;
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
