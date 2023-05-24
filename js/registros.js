function enviarMensaje() {
	alert('El registro fue exitoso!');
	window.location.href = '/index.html'
}
const form = document.querySelector('form');
const usuarioInput = document.querySelector('#usuario');
const contraseñaInput = document.querySelector('#contraseña');
const confirmarContraseñaInput = document.querySelector('#confirmar_contraseña');

form.addEventListener('submit', (event) => {
	event.preventDefault();

	if (contraseñaInput.value !== confirmarContraseñaInput.value) {
		alert('Las contraseñas no coinciden');
		return;
	}
	enviarMensaje()

	// aquí podrías agregar el código para enviar el formulario
});

