const modelo = require('./modelo.js');

describe('El sistema', function() {
    let sistema;

    beforeEach(function() {
        sistema = new modelo.Sistema(); // Inicializa un nuevo sistema antes de cada prueba
    });
    
    it('inicialmente no hay usuarios', function() {
        expect(sistema.numeroUsuarios()).toEqual(0); // Verifica que no haya usuarios inicialmente
    });

    it('agregar usuario', function() {
        let res = sistema.agregarUsuario('usuario1');
        expect(res.nick).toEqual('usuario1'); // Verifica que se agregó un usuario correctamente
        expect(sistema.numeroUsuarios()).toEqual(1); // Verifica el número de usuarios
    });

    it('obtener usuarios', function() {
        sistema.agregarUsuario('usuario1');
        let usuarios = sistema.obtenerUsuarios();
        expect(usuarios).toBeDefined(); // Verifica que la lista no sea undefined
        expect(usuarios.length).toBe(1); // Verifica que hay un usuario en la lista
        expect(usuarios).toContain('usuario1'); // Verifica que 'usuario1' esté en la lista
    });

    it('usuario activo', function() {
        sistema.agregarUsuario('usuario1');
        expect(sistema.usuarioActivo('usuario1')).toBe(true); // Verifica si el usuario está activo
    });

    it('eliminar usuario', function() {
        sistema.agregarUsuario('usuario1');
        sistema.eliminarUsuario('usuario1');
        expect(sistema.usuarioActivo('usuario1')).toBe(false); // Verifica si el usuario ha sido eliminado
    });
});
