function enviarMensaje() {
    alert('Mensaje enviado con éxito!');
    document.getElementById("miForm").reset();
    window.location.href = '/index.html'
}
//formulario validacion
var regexNombre = /^\D+$/;
var regexEmail = /^([a-zA-Z0-9._%+-\?!]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})$/;
var ExpRegSoloNumeros = /^([0-9])*$/;

$(document).ready(function () {
    $("#botonEnviarMensaje").click(function () {
        var nombre = $("#inputName").val();
        var apellido = $("#inputLastName").val();
        var email = $("#inputEmail").val();
        var telefono = $("#inputTelefono").val();
        var asunto = $("#inputSubject").val();
        var mensaje = $("#message").val();


        if (nombre == "" || !regexNombre.test(nombre)) {
            $("#mensaje1").fadeIn();
            return false;
        } else {
            $("#mensaje1").fadeOut();
            if (apellido == "" || !regexNombre.test(apellido)) {
                $("#mensaje2").fadeIn();
                return false;
            } else {
                $("#mensaje2").fadeOut();
                if (email == "" || !regexEmail.test(email)) {
                    $("#mensaje3").fadeIn();
                    return false;
                } else {
                    $("#mensaje3").fadeOut();
                    if (telefono == "" || !ExpRegSoloNumeros.test(telefono)) {
                        $("#mensaje4").fadeIn();
                        return false;
                    } else {
                        $("#mensaje4").fadeOut();
                        if (asunto = "" || !regexNombre.test(asunto)) {
                            $("#mensaje5").fadeIn();
                            return false;
                        } else {
                            $("#mensaje5").fadeOut();
                            if (mensaje == "") {
                                $("#mensaje6").fadeIn();
                                return false;
                            }

                        }

                    }
                }
            }

        }
        enviarMensaje();
    });

});
