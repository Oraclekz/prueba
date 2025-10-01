// ======= NAVEGACIÓN SPA =======
document.querySelectorAll('.nav-link').forEach(btn => {
  btn.addEventListener('click', () => {
    // quitar "active" de todos los botones
    document.querySelectorAll('.nav-link').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // mostrar solo la vista seleccionada
    const view = btn.getAttribute('data-view');
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById('view-' + view).classList.add('active');
  });
});

// ======= VALIDACIONES FORMULARIO USUARIO =======
const userForm = document.getElementById('userForm');
if (userForm) {
  userForm.addEventListener('submit', (e) => {
    e.preventDefault(); // evita el envío automático

    const nombre = userForm.querySelector('input[type="text"]').value.trim();
    const correo = userForm.querySelectorAll('input[type="email"]')[0].value.trim();
    const confirmarCorreo = userForm.querySelectorAll('input[type="email"]')[1].value.trim();
    const pass = userForm.querySelectorAll('input[type="password"]')[0].value;
    const confirmarPass = userForm.querySelectorAll('input[type="password"]')[1].value;
    const telefono = userForm.querySelector('input[type="tel"]').value.trim();
    const region = userForm.querySelectorAll('select')[0].value;
    const comuna = userForm.querySelectorAll('select')[1].value;

    let errores = [];

    // Validar nombre
    if (!nombre) errores.push("El nombre completo es obligatorio.");

    // Validar correo
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
    if (!regexCorreo.test(correo)) {
      errores.push("El correo debe terminar en @duoc.cl, @profesor.duoc.cl o @gmail.com.");
    }
    if (correo !== confirmarCorreo) {
      errores.push("Los correos no coinciden.");
    }

    // Validar contraseña
    if (pass.length < 4 || pass.length > 10) {
      errores.push("La contraseña debe tener entre 4 y 10 caracteres.");
    }
    if (pass !== confirmarPass) {
      errores.push("Las contraseñas no coinciden.");
    }

    // Validar teléfono (si existe)
    if (telefono && !/^[0-9]+$/.test(telefono)) {
      errores.push("El teléfono debe contener solo números.");
    }

    // Validar región y comuna
    if (!region) errores.push("Debe seleccionar una región.");
    if (!comuna) errores.push("Debe seleccionar una comuna.");

    // Mostrar errores o éxito
    if (errores.length > 0) {
      alert(" Errores en el formulario:\n- " + errores.join("\n- "));
    } else {
      alert(" Usuario registrado correctamente.");
      userForm.reset();
    }
  });
}
