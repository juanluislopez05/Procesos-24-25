function ClienteRest() {
    // Método para agregar un usuario    
    this.agregarUsuario = function(nick) {
        var cli = this;
        $.getJSON("/agregarUsuario/" + nick, function(data) {
            let msg = "El nick " + nick + " está ocupado";
            if (data.nick != -1) {
                console.log("Usuario " + nick + " ha sido registrado");
                msg = "Bienvenido al sistema, " + nick;
                $.cookie("nick", nick); // Cambiado de localStorage a $.cookie
            }
            else {
                console.log("El nick ya está ocupado");
            }
            cw.mostrarMsg(msg);
            cw.mostrarHome();
        });
    }


    this.agregarUsuario2 = function (nick) {
        //TODO
    }

    // Método para obtener la lista de usuarios
    this.obtenerUsuarios = function () {
        let cli = this;
        $.getJSON("/obtenerUsuarios", function (lista) {
            console.log(lista);
        });
    }

    // Método para obtener el número de usuarios
    this.numeroUsuarios = function () {
        let cli = this;
        $.getJSON("/numeroUsuarios", function (data) {
            console.log("Número de usuarios registrados: ", +data.numeroUsuarios);
        });
    }

    // Método para comprobar si un usuario está activo
    this.usuarioActivo = function (nick) {
        let cli = this;
        $.getJSON("/usuarioActivo/" + nick, function (data) {
            if (data.activo) {
                console.log("El usuario " + nick + " está activo");
            } else {
                console.log("El usuario " + nick + " no está activo o no existe");
            }
        })
    }

    // Método para eliminar un usuario
    this.eliminarUsuario = function (nick) {
        $.getJSON("/eliminarUsuario/" + nick, function (data) {
            if (data.eliminado) {
                console.log("El usuario " + nick + " ha sido eliminado");
                $.removeCookie("nick");
                location.reload();
            } else {
                console.log("El usuario " + nick + " no existe");
            }
        })
    }
}