function ControlWeb() {
    this.mostrarAgregarUsuario = function() {
        $('#bnv').remove();
        $('#mAU').remove();
        let cadena = '<div id="mAU">';
        cadena += '<div class="card"><div class="card-body">';
        cadena += '<div class="form-group">';
        cadena += '<label for="nick">Nick:</label>';
        cadena += '<p><input type="text" class="form-control" id="nick" placeholder="Introduce un nick"></p>';
        cadena += '<button id="btnAU" type="submit" class="btn btn-primary">Submit</button>';
        cadena += '<div><a href="/auth/google"><img src="./img/web_neutral_sq_SU@4x.png" style="height:40px;"></a></div>';
        cadena += '</div></div></div>';
        $('#au').html(cadena);
    }

    // Modificado para utilizar $.cookie
    this.comprobarSesion = function() {
        let nick = $.cookie("nick");
        if (nick) {
            this.mostrarMensaje("Bienvenido al sistema, " + nick);
            this.mostrarBotonSalir();
        } else {
            this.mostrarAgregarUsuario();
        }
    }

    // Modificado para utilizar $.removeCookie
    this.salir = function() {
        $.removeCookie("nick");
        this.mostrarMensaje("Sesión cerrada. Vuelve pronto.");
        location.reload();
    }

    this.mostrarMensaje = function(mensaje) {
        alert(mensaje);
    }

    this.mostrarBotonSalir = function() {
        if ($("#btnSalir").length === 0) { // Evita añadir el botón si ya existe
            let botonSalir = '<button id="btnSalir" class="btn btn-secondary">Salir</button>';
            $("body").append(botonSalir);
            $("#btnSalir").on("click", function() {
                cw.salir();
            });
        }
    }
}