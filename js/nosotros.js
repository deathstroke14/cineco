var contenido = document.querySelector('#contenido')
function traer_datos() {
    for (var i = 1; i <= 4; i++) {
        fetch('https://randomuser.me/api')
            .then(res => res.json())
            .then(res => {
                // voy agregando el contenido con +=
                contenido.innerHTML += ` <div class="usuario">
        <img src="${res.results[0].picture.large}">
        <p>Nombre: ${res.results[0].name.first}</p>
        <p>Apellido: ${res.results[0].name.last}</p>
        <p>Correo electrónico: ${res.results[0].email}</p>
        </div>
        `
            })
            .catch(error => console.log("Ocurrió un error", error))
    }
} 
