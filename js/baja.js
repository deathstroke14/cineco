// ---------------------------------baja pelicula-----------------------------------
const URLs = "https://sebas149.pythonanywhere.com/"
fetch(URLs + 'peliculas')
    .then(function (response) {
        if (response.ok) {
            return response.json() // Parseamos la respuesta JSON
        } else {
            throw new Error('Error al obtener las Peliculas.')
        }
    })
    .then(function (data) {
        var tablaPeliculas = document.getElementById('tablaPeliculas2')

        // Iteramos sobre los Peliculas y agregamos filas a la tabla
        data.forEach(function (pelicula) {
            var fila = document.createElement('tr')
            fila.innerHTML = '<td>' + pelicula.id + '</td>' +
                '<td>' + pelicula.titulo + '</td>' +
                '<td align="right">' + pelicula.duracion + '</td>' +
                '<td align="right">&nbsp; &nbsp;&nbsp; &nbsp;' + pelicula.asientos_totales + '</td>' +
                '<td><button onclick="eliminarProducto(' + pelicula.id + ')">Eliminar</button></td>'

            tablaPeliculas.appendChild(fila)
        })
    })
    .catch(function (error) {
        console.log('Error:', error)
        alert('Error al obtener las Peliculas.')
    })

function eliminarProducto(codigo) {
    var URLs = "https://sebas149.pythonanywhere.com/";

    fetch(URLs + 'peliculas/' + codigo, { method: 'DELETE' })
        .then(function (response) {
            if (response.ok) {
                // Eliminar la película de la lista después de eliminarla en el servidor
                var tablaPeliculas = document.getElementById('tablaPeliculas2');
                var filas = tablaPeliculas.getElementsByTagName('tr');
                for (var i = 0; i < filas.length; i++) {
                    var fila = filas[i];
                    var id = fila.getElementsByTagName('td')[0].textContent;
                    if (id === codigo) {
                        tablaPeliculas.removeChild(fila);
                        break;
                    }
                }
                alert('Película eliminada correctamente.');
                window.location.reload();
            }
        })
        .catch(function (error) {
            console.log('Error:', error);
            alert('Error al eliminar la película.');
            window.location.reload();
        });
}
