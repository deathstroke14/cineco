// --------------------------------modificar--------------------------------
const URL = "https://sebas149.pythonanywhere.com/";
let id, Mtitulo, Mduracion, Masientos_totales, Masientos_ocupados;

function obtenerPelicula() {
    id = document.getElementById("id").value;

    fetch(URL +`peliculas/${id}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al obtener los datos de la pelicula.');
            }
        })

        .then(data => {
            Mtitulo = data.titulo;
            Mduracion = data.duracion;
            Masientos_totales = data.asientos_totales;
            Masientos_ocupados = data.asientos_ocupados;
            mostrarDatosPelicula()
        })
        .catch(error => {
            alert('Error al obtener los datos de la pelicula');
        });
}

function mostrarDatosPelicula() {
    document.getElementById("Mtitulo").value = Mtitulo;
    document.getElementById("Mduracion").value = Mduracion;
    document.getElementById("Masientos_totales").value = Masientos_totales;
    document.getElementById("MpeliculaInfo").style.display = "block";
}

function guardarCambios() {
    const pelicula = {
        id: id,
        titulo: document.getElementById("Mtitulo").value,
        duracion: document.getElementById("Mduracion").value,
        asientos_totales: document.getElementById("Masientos_totales").value
    };

    fetch(URL + 'peliculas/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pelicula)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al guardar los cambios de la pelicula.');
            }
        })
        .then(data => {
            alert('Cambios guardados correctamente.');
            location.reload();
        })
        .catch(error => {
            alert('Error al guardar los cambios de la pelicula.');
        });
}