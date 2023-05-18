// // crea un nuevo objeto `Date`
// var today = new Date();
// console.log(today)

// let date = new Date(today.value.replace(/-+/g, '/'));
// console.log(date)

// // `getDate()` devuelve el día del mes (del 1 al 31)
// var day = today.getDate();

// // `getMonth()` devuelve el mes (de 0 a 11)
// var month = today.getMonth() + 1;

// // `getFullYear()` devuelve el año completo
// var year = today.getFullYear();

// // muestra la fecha de hoy en formato `MM/DD/YYYY`
// console.log(`${month}/${day}/${year}`);





// const originalString = "hola de victor"

// // Replace the first instance of "How" with "Where"
// const newString = originalString.replace("de","<br>");

// console.log(newString);
// let now = new Date();
// const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
// let fecha = now.toLocaleDateString('es-MX', options)

// console.log(now.getDay());





// var palabrasProhibidas = ['de',','];
// var numeroPalabrasProhibidas = palabrasProhibidas.length;

// var text = fecha;

// while(numeroPalabrasProhibidas--) {
//    if (text.indexOf(palabrasProhibidas[numeroPalabrasProhibidas])!=-1) {
//        text = text.replace(new RegExp(palabrasProhibidas[numeroPalabrasProhibidas], 'ig'), "");
//    }
// }
// console.log(text)



// let splitString = text.split("  ");

// console.log(splitString);


let hoy = new Date();
hoy.setDate(hoy.getDate() - 1);
let i = 0

var nombreDias = document.getElementsByClassName("nombreDia")
var nroDias = document.getElementsByClassName("nroDia")
var meses = document.getElementsByClassName("nombreMes")


while (i < 7) {
    hoy.setDate(hoy.getDate() + 1);
    console.log(hoy.toLocaleDateString('es-MX', { weekday: 'long' }))
    nombreDias[i].innerHTML = hoy.toLocaleDateString('es-MX', {weekday: 'long'})
    nroDias[i].innerHTML = hoy.toLocaleDateString('es-ES', { day: 'numeric'});
    meses[i].innerHTML = hoy.toLocaleDateString('es-ES', { month: 'long'});

    console.log(nombreDias[i])
    i++;


}






// hoy.setDate(hoy.getDate()+unDia);
// let diaActual = hoy.toLocaleDateString('es-MX', {weekday: 'long'})
// let mesActual = hoy.toLocaleDateString('es-ES', { month: 'long'});
// let nroActual = hoy.toLocaleDateString('es-ES', { day: 'numeric'});

// console.log(diaActual)
// console.log(nroActual)
// console.log(mesActual)

// let nro=1

// document.getElementById("nombreDia1").innerHTML = diaActual;

// document.querySelector(".dia #nombreDia1").innerHTML = diaActual
// document.querySelector(".dia #nroDia1").innerHTML = nroActual
// document.querySelector(".dia #nombreMes1").innerHTML = mesActual

// var lista = document.getElementsByClassName("nroDia")
// lista[1].innerHTML= nroActual
// console.log(lista[1])



