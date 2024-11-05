function ClienteRest() {
    // Método para agregar un usuario usando $.getJSON
    this.agregarUsuario = function(nick) {
        var cli = this;
        $.getJSON("/agregarUsuario/" + nick, function(data) {
            let msg = "El nick " + nick + " está ocupado";
            if (data.nick != -1) {
                console.log("Usuario " + nick + " ha sido registrado");
                msg = "Bienvenido al sistema, " + nick;
                $.cookie("nick", nick); // Cambiado de localStorage a $.cookie
                cw.mostrarMensaje(msg);
                cw.mostrarBotonSalir();
    
                actualizarListaUsuarios();
                actualizarNumeroUsuarios();
            } else {
                console.log("El nick ya está ocupado");
                cw.mostrarMensaje(msg);
            }
        });
    };

    // Método para agregar un usuario usando $.ajax
    this.agregarUsuario2 = function (nick) {
        var cli = this;
        $.ajax({
            type: 'GET',
            url: '/agregarUsuario/' + nick,
            success: function (data) {
                if (data.nick != -1) {
                    console.log("Usuario " + nick + " ha sido registrado");
                } else {
                    console.log("El nick ya está ocupado");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType: 'application/json'
        });
    };

    // Método para obtener la lista de usuarios
    this.obtenerUsuarios = function () {
        $.getJSON("/obtenerUsuarios", function (data) {
            $("#usuariosBody").empty();
            data.forEach(function(usuario) {
                let row = `<tr>
                    <td>${usuario.nick}</td>
                    <td>${usuario.activo ? "Activo" : "Inactivo"}</td>
                    <td>
                        <button class="btn btn-danger btnEliminar" data-nick="${usuario.nick}">Eliminar</button>
                    </td>
                </tr>`;
                $("#usuariosBody").append(row);
            });

            $(".btnEliminar").on("click", function() {
                let nick = $(this).data("nick");
                rest.eliminarUsuario(nick);
                $(this).closest("tr").remove(); 
                actualizarNumeroUsuarios();
            });
        }).fail(function() {
            console.log("Error al obtener usuarios");
        });
    };
    // Método para obtener el número de usuarios y actualizar el conteo
    this.numeroUsuarios = function () {
        $.getJSON("/numeroUsuarios", function (data) {
            $("#numeroUsuarios").text(data.num);
        });
    };

    // Método para verificar si un usuario está activo
    this.usuarioActivo = function (nick) {
        $.getJSON("/usuarioActivo/" + nick, function (data) {
            $("#resultadoActivo").text(data.activo ? "El usuario está activo" : "El usuario no está activo");
        });
    };

    // Método para eliminar un usuario
    this.eliminarUsuario = function (nick) {
        $.getJSON("/eliminarUsuario/" + nick, function (data) {
            $("#resultadoEliminar").text("Usuario " + data.eliminado + " ha sido eliminado");
            actualizarNumeroUsuarios();
            actualizarListaUsuarios();
        });
    };
}