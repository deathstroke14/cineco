// Capturamos el evento de envío del formulario
document.getElementById('formulario').addEventListener('submit', function (event) {
    event.preventDefault() // Evitamos que se recargue la página

    // Obtenemos los valores del formulario
  
    var titulo = document.getElementById('titulo').value
    var duracion = document.getElementById('duracion').value
    var asientos_totales = document.getElementById('asientos_totales').value

    // Creamos un objeto con los datos del pelicula
    var pelicula = {
        
        titulo: titulo,
        duracion: duracion,
        asientos_totales: asientos_totales
    }

    // Realizamos la solicitud POST al servidor
    url = 'https://sebas149.pythonanywhere.com/peliculas'
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pelicula)
    })
        .then(function (response) {
            if (response.ok) {
                return response.json() // Parseamos la respuesta JSON
            } else {
                throw new Error('Error al agregar la pelicula.')
            }
        })
        .then(function (data) {
            alert('pelicula agregada correctamente.')
            limpiarFormulario()
            window.location.reload();


        })
        .catch(function (error) {
            console.log('Error:', error)
            alert('Error al agregar la pelicula.')
        })
})
function limpiarFormulario() {
    
    document.getElementById('titulo').value = '';
    document.getElementById('duracion').value = '';
    document.getElementById('asientos_totales').value = '';
}