// ----------------------------------------------listado --------------------------------
const URL = "https://sebas149.pythonanywhere.com/"

// Realizamos la solicitud GET al servidor para obtener todos los Peliculas
fetch(URL + 'peliculas')
    .then(function (response) {
        if (response.ok) {
            return response.json() // Parseamos la respuesta JSON
        } else {
            throw new Error('Error al obtener las Peliculas.')
        }
    })
    .then(function (data) {
        var tablaPeliculas = document.getElementById('tablaPeliculas')

        // Iteramos sobre los Peliculas y agregamos filas a la tabla
        data.forEach(function (pelicula) {
            var fila = document.createElement('tr')
            fila.innerHTML = '<td>' + pelicula.id + '</td>' +
                '<td>' + pelicula.titulo + '</td>' +
                '<td align="right">' + pelicula.duracion + '</td>' +
                '<td align="right">&nbsp; &nbsp;&nbsp; &nbsp;' + pelicula.asientos_totales + '</td>'
            tablaPeliculas.appendChild(fila)
        })
    })
    .catch(function (error) {
        console.log('Error:', error)
        alert('Error al obtener las Peliculas.')
    })