//----------------------------------------------------------
//dias cartelera
//----------------------------------------------------------
let hoy = new Date(); //dias de hoy
hoy.setDate(hoy.getDate() - 1);// resto un dia a la fechas actual
let i = 0

var nombreDias = document.getElementsByClassName("nombreDia")
var nroDias = document.getElementsByClassName("nroDia")
var meses = document.getElementsByClassName("nombreMes")


while (i < 7) {//7 dias con fecha en latino
    hoy.setDate(hoy.getDate() + 1);
    nombreDias[i].innerHTML = hoy.toLocaleDateString('es-MX', { weekday: 'long' })
    nroDias[i].innerHTML = hoy.toLocaleDateString('es-ES', { day: 'numeric' });
    meses[i].innerHTML = hoy.toLocaleDateString('es-ES', { month: 'long' });
    i++;
}

//----------------------------------------------------------
//api pelis
//----------------------------------------------------------
//la api es gratis para uso propio pero limitado a ciertas llamadas
//por eso tiene clave
//para habilitar, agregar la clave dentro de la comillas simples de Authorization:'aca va la clave' 

const options = {//pass api
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: ''
    }
}

var contenido = document.querySelector('.peliculasDia')

function limpiarDiv() {//limpiar pelis anteriores del div
    contenido.innerHTML = ''
}

var hora = 15 //horario de peli

function horario() {//1era peli a las 15 ,2da a las 18, 3da a las 21 y 4ta a las 24
    if (hora !== 24) {
        hora += 3
    } else {
        hora = 15
    }
}

var url = 'https://api.themoviedb.org/3/movie/now_playing?language=es-MX&page=1'

function traerPelis() { //trae las pelis en cartelera

    fetch(url, options)
        .then(response => response.json())
        .then(pelis => mostrarData(pelis))
}
//.catch(err => console.error(err))

function mostrarData(pelis) { //envio los ids de las pelis para el detalle individual
    for (let i = min; i < max; i++) {
        traerPeli(pelis.results[i].id);
    }
}

function traerPeli(id) {//traigo el detalle de una sola peli por su id
    let url2 = 'https://api.themoviedb.org/3/movie/' + id + '?language=es-MX'

    fetch(url2, options)
        .then(response => response.json())
        .then(peli => mostrarPeli(peli))
}

function mostrarPeli(peli) { //muestro detalle de una peli

    contenido.innerHTML += `<div class="peliculaDia">
            <img class="imgPeli" src="https://image.tmdb.org/t/p/w154${peli.poster_path}" alt="">
    
            <div class="detallePeli">
            <span>${(peli.title).toUpperCase()} (2023)</span> <br><br>
                Titulo original:<br> ${peli.original_title}<br>
                Duración: ${peli.runtime} minutos <br>
                Genero:<br> ${generos(peli)}<br>
                Fecha de estreno:<br>${peli.release_date.split("-").reverse().join("-")}<br>
                Horario: ${hora}hs
            </div>
        </div>`
    horario()
}


function generos(peli) { //recorro el array de genero de la peli
    let generoPeli = ''
    for (let i = 0; i < peli.genres.length; i++) {
        if (i == peli.genres.length - 1) {
            generoPeli += peli.genres[i].name
        } else {
            generoPeli += peli.genres[i].name + ", "
        }
    }
    return generoPeli
}


var min = 0 //
var max = 4 //solo traigo 4 pelis del arreglo


function cambiarDia(a, b) {//cambio los indices del array de pelis para cargar otras pelis diferentes al cambiar el dia
    //x ejemplo : lunes martes las mimas pelis, mircoles jueves las mismas ya asi dos dias iguales al 3er dia cabio pelis
    min = a
    max = b
    url = 'https://api.themoviedb.org/3/movie/now_playing?language=es-MX&page=1'
    traerPelis()
}

function cambiarDiaActivo(id, minimo, maximo) {//cambiar seleccion de pelis segun dia y actualizo el estilo del dia selecionado
    limpiarDiv()

    document.getElementsByClassName("activo")[0].className = "dia"
    document.getElementById(id).className = "dia activo"
    cambiarDia(minimo, maximo)
}

function proximasPelis() {//trae las pelis para cartelera 
    let url2 = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=es-MX&page=1&sort_by=popularity.desc&&primary_release_date.gte=2023-06-01&primary_release_date.lte=2023-08-31&with_release_type=3|2'
    let contenido2 = document.querySelector('.proximamente')


    fetch(url2, options)
        .then(response => response.json())
        .then(pelis => mostrarData(pelis))

    //.catch(err => console.error(err))

    function mostrarData(pelis) { //envio las pelis para sacar el poster y la fecha de estreno proximpo
        for (let i = 2; i < 16; i++) {

            contenido2.innerHTML += `
            <div>
            
            <img class="imgPeli" src="https://image.tmdb.org/t/p/w154${pelis.results[i].poster_path}" title="${pelis.results[i].title}"><br>
            <span>${pelis.results[i].release_date.split("-").reverse().join("-")}</span>
            
            </div>
            `
        }
    }
}

//----------------------------------------------------------
//llamado funciones
//----------------------------------------------------------
cambiarDiaActivo("dia1", 0, 4)//para traer las pelis de la cartelera del dia de hoy
proximasPelis()//para traer las pelis en proximos
