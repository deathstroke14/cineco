var url = 'https://camposmancilla.pythonanywhere.com';

//------------------------------------------------
//-------------USUARIO
//------------------------------------------------
function traerUsuario() {
    var url2 = '/usuario';

    var apellido = document.getElementById('apellido').value;
    var dni = document.getElementById('dni').value;

    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            apellido: apellido,
            dni: dni
        })
    };

    fetch(url + url2, options)
        .then(response => response.json())
        .then(usuario => {
            mostrarUsuario(usuario);
        })
        .catch(error => {
            // console.log(error);
            alert("No son correctos los datos ingresados")
            location.reload();
            // let contenido = document.getElementById('ingreso');
            // contenido.innerHTML += 'Usuario no encontrado';
        });
}

function mostrarUsuario(usuario) {
    // let contenido = document.getElementById('resultado');

    console.log(usuario.idUsuario);
    document.getElementById('idPersona').value = usuario.idUsuario;

    if (!usuario.error) {
        let contenido2 = document.getElementById('ingreso');
        contenido2.innerHTML = ''

        let contenido = document.getElementById('saludo');
        contenido.removeAttribute('style');
        document.getElementById('idPersona').value = usuario.idUsuario;
        contenido.innerHTML = `Bienvenido nuevamente ${usuario.nombre.toUpperCase()} ${usuario.apellido.toUpperCase()}`;
        mostrarDiasFunciones(usuario);
    }
}


//------------------------------------------------
//-------------DIAS FUNCIONES
//------------------------------------------------

function mostrarDiasFunciones() {
    var url2 = '/funciones/dias';

    var options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(url + url2, options)
        .then(response => response.json())
        .then(dias => {
            mostrarDias(dias);
        })
        .catch(error => {
            console.log(error);
        });
}


function formatoFecha(fecha) {
    var fechaObjeto = new Date(fecha);

    var diasSemana = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    var nombreDia = diasSemana[fechaObjeto.getDay()];

    var numeroDia = fechaObjeto.getDate();

    var meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    var nombreMes = meses[fechaObjeto.getMonth()];

    return [nombreDia, numeroDia, nombreMes];
}


function mostrarDias(dias) {

    var contenido = document.getElementById('cartelera');
    contenido.removeAttribute('style');

    // contenido.innerHTML += `<div class="cartelera">`;

    for (var i = 0; i < dias.length; i++) {
        fecha = formatoFecha(dias[i]);
        contenido.innerHTML += `
            <div class="dia" id="dia${i}" onclick='obtenerFuncionesDia("${dias[i]}", "dia${i}");'>
                <div class="nombreDia">${fecha[0]}</div>
                <div class="nroDia">${fecha[1]}</div>
                <div class="nombreMes">${fecha[2]}</div>
            </div>
        `;
    }

    // contenido.innerHTML += `</div>`;
}


//------------------------------------------------
//-------------FUNCIONES DEL DIA
//------------------------------------------------

function obtenerFuncionesDia(dia, idDia) {

    let elementos = document.getElementsByClassName('dia');
    for (let i = 0; i < elementos.length; i++) {
        elementos[i].classList.remove('activo');
    }


    let elemento = document.getElementById(idDia);
    elemento.classList.add('activo');


    var contenido = document.getElementById('asientos');
    contenido.innerHTML = ''
    var contenido2 = document.getElementById('carrito');
    contenido2.innerHTML = ''
    var contenido3 = document.getElementById('entradas_carrito');
    contenido3.innerHTML = ''


    var url2 = '/funciones/' + dia;

    var options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(url + url2, options)
        .then(response => response.json())
        .then(funciones => {
            mostrarFunciones(funciones);
        })
        .catch(error => {
            console.log(error);
        });
}

function mostrarFunciones(funciones) {

    document.getElementById('asientos').style.display = 'none';
    document.getElementById('detalle').style.display = 'none';

    var contenido = document.getElementById('funciones');
    contenido.removeAttribute('style');

    contenido.innerHTML = '';

    for (var i = 0; i < 4; i++) {
        obtenerPelicula(funciones[i]);
    }
}

function obtenerPelicula(funcion) {
    var url2 = '/pelicula/' + funcion.idPelicula;

    var options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(url + url2, options)
        .then(response => response.json())
        .then(pelicula => {
            mostrarPelicula(pelicula, funcion);
        })
        .catch(error => {
            console.log(error);
        });
}

function mostrarPelicula(pelicula, funcion) {

    var contenido = document.getElementById('funciones');

    contenido.innerHTML += `<div class="peliculaDia" id="${funcion.idFuncion}" onClick="obtenerEntradasFuncion(${funcion.idFuncion});">
    <img class="imgPeli" src="${pelicula.url}" alt="${pelicula.titulo}_poster">
    <div class="detallePeli">
    Título: ${pelicula.titulo}<br>
    Duración: ${pelicula.duracion}<br>
    Género: ${pelicula.genero}<br>
    Horario: ${funcion.horario}<br><br>
    </div>
  </div>`;
}

//------------------------------------------------
//-------------FUNCION ASIENTOS
//------------------------------------------------

function obtenerEntradasFuncion(idFuncion) {


    var url2 = '/entradas/' + idFuncion;

    var options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(url + url2, options)
        .then(response => response.json())
        .then(entradas => {
            generarTabla2(entradas, idFuncion);
        })
        .catch(error => {
            console.log(error);
        });
}


function generarTabla2(entradas, idFuncion) {

    let elementos = document.getElementsByClassName('peliculaDia');
    for (let i = 0; i < elementos.length; i++) {
        elementos[i].classList.remove('activo');
    }

    let elemento = document.getElementById(idFuncion);
    elemento.classList.add('activo');

    let idUsuario = parseInt(document.getElementById('idPersona').value);
    document.getElementById('idFuncion').value = idFuncion;

    let contenido = document.getElementById('asientos');
    contenido.removeAttribute('style');
    let filas = ["a", "b", "c", "d", "e"];

    let divs = '';

    for (let i = 0; i < filas.length; i++) {
        for (let j = 1; j <= 8; j++) {
            let asientoId = filas[i] + j;
            let clase = 'disponible';

            for (let k = 0; k < entradas.length; k++) {
                let entrada = entradas[k];

                if (entrada.asientoNro === j && entrada.asientoFila === filas[i]) {
                    // if (entrada.comprada === 1 && entrada.idUsuario !== idUsuario) {
                    if (entrada.idUsuario !== idUsuario) {
                        clase = 'ocupada';
                    } else if (entrada.comprada === 0 && entrada.idUsuario === idUsuario) {
                        clase = 'carritoUsuario';
                    } else if (entrada.comprada === 1 && entrada.idUsuario === idUsuario) {
                        clase = 'compradaUsuario';
                    }
                    break;
                }
            }

            var eventoClic = (clase === 'disponible') ? 'onclick="seleccionarCelda(this);"' : '';

            divs += '<div id="' + asientoId + '" class="' + clase + '" ' + eventoClic + '><p>' + asientoId + '</p></div>';
        }
    }

    contenido.innerHTML = divs
    let contenido2 = document.getElementById('detalle');
    contenido2.removeAttribute('style');

    contenido2.innerHTML = `<div class="butaca" > <img src="/img/00asiento_disponible.svg" style="width: 20px; height: 30px;"> disponible</div>
    <div class="butaca" > <img src="/img/00asiento_ocupado.svg" style="width: 20px; height: 30px;"> ocupada</div>
    <div class="butaca" > <img src="/img/00asiento_comprado.svg" style="width: 20px; height: 30px;"> comprada</div>
    <div class="butaca" > <img src="/img/00asiento_carrito.svg" style="width: 20px; height: 30px;"> en el carrito</div>
    <div class="butaca" > <img src="/img/00asiento_seleccionada.svg" style="width: 20px; height: 30px;"> seleccionada</div>`

    let btn_agregar_carrito = document.getElementById('carrito');
    btn_agregar_carrito.innerHTML = '<br><input type="button" onClick="agregarCarrito(event);" value="Agregar al carrito">';
    let btn_entradas_carrito = document.getElementById('entradas_carrito');
    btn_entradas_carrito.innerHTML = '<br><input type="button" onClick="obtenerEntradasCarrito();" value="mostrar carrito">';
}



function seleccionarCelda(celda) {
    if (celda.classList.contains('seleccionada')) {
        celda.classList.remove('seleccionada');
    } else {
        celda.classList.add('seleccionada');
    }
}

//------------------------------------------------
//-------------CARRITO
//------------------------------------------------

function agregarCarrito(event) {
    event.preventDefault();

    var hoy = new Date();
    hoy.setDate(hoy.getDate());
    var fechaCompra = `${hoy.getFullYear()}-${(hoy.getMonth() + 1).toString().padStart(2, '0')}-${hoy.getDate().toString().padStart(2, '0')}`;
    var idUsuario = parseInt(document.getElementById('idPersona').value);
    var idFuncion = parseInt(document.getElementById('idFuncion').value);
    var ids = document.getElementsByClassName('seleccionada');
    var entradas_carrito = [];

    for (var i = 0; i < ids.length; i++) {
        var id = ids[i].id;
        var fila_nro = id.split(' ');
        var asientoFila = fila_nro[0].charAt(0);
        var asientoNro = parseInt(fila_nro[0].charAt(1));
        entradas_carrito.push({
            asientoNro: asientoNro,
            asientoFila: asientoFila,
            idUsuario: idUsuario,
            idFuncion: idFuncion,
            fechaCompra: fechaCompra,
            comprada: 0
        });
    }

    agregar_entradas_carrito(entradas_carrito, event);

}

async function agregar_entradas_carrito(entradas_carrito, event) {
    event.preventDefault();

    var url2 = '/entradas/carrito'

    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(entradas_carrito)
    };

    try {
        const response = await fetch(url + url2, options);
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al agregar las entradas al carrito.');
        }
    } catch (error) {
        console.log(error);
    }
}


function obtenerEntradasCarrito() {
    var idUsuario = parseInt(document.getElementById('idPersona').value);
    var idFuncion = parseInt(document.getElementById('idFuncion').value);

    var url2 = '/entradas/carrito/' + idFuncion + '/' + idUsuario;

    var options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    fetch(url + url2, options)
        .then(response => response.json())
        .then(entradas_carrito => {
            mostrar_carrito(entradas_carrito);
        })
        .catch(error => {
            console.log(error);
        });
}


function mostrar_carrito(entradas_carrito) {
    var contenido = document.getElementById('entradas_carrito');
    contenido.innerHTML = '';

    var tablaHTML = '<table id="tabla-carrito">';
    tablaHTML += '<tr>';
    tablaHTML += '<th>Nro. Entrada</th>';
    tablaHTML += '<th>Asiento</th>';
    tablaHTML += '<th>Fecha</th>';
    tablaHTML += '<th>Acciones</th>';
    tablaHTML += '</tr>';

    entradas_carrito.forEach(entrada => {
        tablaHTML += '<tr>';
        tablaHTML += '<td>' + entrada.nroEntrada + '</td>';
        tablaHTML += '<td>' + entrada.asientoFila + ' ' + entrada.asientoNro + '</td>';
        tablaHTML += '<td>' + entrada.fechaCompra + '</td>';
        // tablaHTML += '<td><button onclick="eliminarEntrada(' + entrada.nroEntrada + ')">Eliminar</button></td>';
        tablaHTML += `<td><button onclick="eliminarEntradaCarrito('${entrada.asientoFila}', ${entrada.asientoNro}, event)">Eliminar</button></td>`;
        tablaHTML += '</tr>';
    });

    tablaHTML += '</table>';

    tablaHTML += '<br><input type="button" onClick="eliminar_Entradas_Carrito(event);" value="Vaciar carrito"></input>'

    tablaHTML += '<input type="button" onClick="comprar_Entradas_Carrito(event);" value="Comprar Carrito"></input>'

    contenido.innerHTML = tablaHTML;

}


function eliminarEntradaCarrito(asientoFila, asientoNro, event) {
    event.preventDefault();
    var idUsuario = parseInt(document.getElementById('idPersona').value);
    var idFuncion = parseInt(document.getElementById('idFuncion').value);
    // Realizar una solicitud POST a la ruta '/entradas/carrito/eliminar' con los parámetros
    // asientoFila, asientoNro, idFuncion e idUsuario
    var url2 = '/entrada/carrito/eliminar'

    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            asientoFila: asientoFila,
            asientoNro: asientoNro,
            idFuncion: idFuncion,
            idUsuario: idUsuario
        })
    };

    fetch(url + url2, options)
        .then(response => {
            if (response.ok) {
                // Actualizar la vista del carrito después de eliminar la entrada
                obtenerEntradasCarrito();
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });

}


function eliminar_Entradas_Carrito(event) {
    event.preventDefault();
    var idUsuario = parseInt(document.getElementById('idPersona').value);
    var idFuncion = parseInt(document.getElementById('idFuncion').value);

    var url2 = '/entradas/carrito/eliminar'

    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idFuncion: idFuncion,
            idUsuario: idUsuario
        })
    };

    fetch(url + url2, options)
        .then(response => {
            if (response.ok) {
                //obtenerEntradasCarrito();
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


function comprar_Entradas_Carrito(event) {
    event.preventDefault();
    var idUsuario = parseInt(document.getElementById('idPersona').value);
    var idFuncion = parseInt(document.getElementById('idFuncion').value);

    var url2 = '/entradas/carrito/comprar'

    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idUsuario: idUsuario,
            idFuncion: idFuncion
        })
    };

    fetch(url + url2, options)
        .then(response => {
            if (response.ok) {
                console.log('Entradas del carrito compradas correctamente.');
            } else {
                console.error('Error al comprar las entradas del carrito.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}