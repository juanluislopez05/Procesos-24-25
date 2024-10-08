function Sistema(){
    this.usuarios={}; // que tipo coleccion???
    //operaciones sobre la colección
    this.agregarUsuario=function(nick){
        if (!this.usuarios[nick]){
            this.usuarios[nick]=new Usuario(nick);
        }
    }
    this.eliminarUsuario=function(nick){
        if (this.usuarios[nick]){
            delete this.usuarios[nick];
            console.log(`Usuario ${nick} eliminado.`);
        }
        else{
            console.log("El usuario no existe.");
        }
    }
    this.obtenerUsuarios=function(){
        return this.usuarios;
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
