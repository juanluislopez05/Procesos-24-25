//const datos=require("./cad.js");
function Sistema() {
    this.usuarios = {};   // que tipo de coleccion
    //this.cad=new datos.CAD();
    // this.cad.conectar(function(db){
    //     console.log("Conectado a Mongo Atlas");
    //     });
        
    //operaciones sobre la coleccion
    this.agregarUsuario = function (nick) {
        let res = { "nick": -1 };
        if (!this.usuarios[nick]) {
            this.usuarios[nick] = new Usuario(nick);
            res.nick = nick;
            console.log("El nick " + nick + " ha sido registrado correctamente");
        }
        else {
            console.log("el nick " + nick + " está en uso");
        }
        return res;
    }
    this.eliminarUsuario = function (nick) {    //Si queremos borrar un usuario
        let res = { eliminado: false };
        if (this.usuarios[nick]) {
            delete this.usuarios[nick];
            res.eliminado = true;
        }
        return res;
    }
    this.obtenerUsuarios = function () {
        let lista = [];
        for (usr in this.usuarios) {
            lista.push(this.usuarios[usr]);
        }
        return lista;
    }

    this.usuarioActivo = function (nick) {
        let res = { activo: false };
        res.activo = this.usuarios[nick] != undefined;
        return res;
    }
    this.numeroUsuarios = function (nick) {
        //return Object.keys(this.usuarios).length;
        let res = { "numeroUsuarios": Object.keys(this.usuarios).length };
        return res;
    }

    // this.usuarioGoogle=function(usr,callback){
    //     this.cad.buscarOCrearUsuario(usr,function(obj){
    //     callback(obj);
    //     });
    //     }
}

function Usuario(nick) {
    this.nick = nick;
    this.nombre = nick;
}


module.exports.Sistema = Sistema;