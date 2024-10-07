describe('El sistema', function() {
  let sistema;

  beforeEach(function() {
      sistema = new Sistema(); // Inicializa un nuevo sistema antes de cada prueba
  });

  it('inicialmente no hay usuarios', function() {
      expect(sistema.numeroUsuarios()).toEqual(0); // Verifica que no haya usuarios inicialmente
  });

  it('agregar usuario', function() {
      sistema.agregarUsuario("usuario1");
      expect(sistema.numeroUsuarios()).toEqual(1); // Verifica que se agregó un usuario
  });

  it('obtener usuarios', function() {
      sistema.agregarUsuario("usuario1");
      let usuarios = sistema.obtenerUsuarios();
      expect(usuarios).toBeDefined(); // Verifica que la función devuelve algo definido
      expect(usuarios["usuario1"]).toBeDefined(); // Verifica que el usuario está en el sistema
  });

  it('usuario activo', function() {
      sistema.agregarUsuario("usuario1");
      expect(sistema.usuarioActivo("usuario1")).toBeTrue(); // Verifica que el usuario está activo
  });

  it('eliminar usuario', function() {
      sistema.agregarUsuario("usuario1");
      sistema.eliminarUsuario("usuario1");
      expect(sistema.usuarioActivo("usuario1")).toBeFalse(); // Verifica que el usuario ha sido eliminado
  });
});
