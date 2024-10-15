function ControlWeb() {
    this.mostrarAgregarUsuario = function() {
        let cadena = '<div class="form-group" id="mAU">';
        cadena += '<label for="nick">Name:</label>';
        cadena += '<input type="text" class="form-control" id="nick">';
        cadena += '<button id="btnAU" type="submit" class="btn btn-primary">Submit</button>';
        cadena += '</div>';

        $("#au").append(cadena); // Inyectar el formulario en el div con id "au"

        // Controlar el evento click del botón
        $("#btnAU").on("click", function() {
            let nick = $("#nick").val(); // Obtener el valor del input
            rest.agregarUsuario(nick); // Llamar al método agregarUsuario
            $("#mAU").remove(); // Eliminar el formulario después de agregar
        });
    }
}