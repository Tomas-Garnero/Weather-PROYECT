const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener("load", () => {
    formulario.addEventListener("submit", buscarClima);
})

function buscarClima(e) {
    e.preventDefault();

    // Validar 
    const ciudad = document.querySelector("#ciudad").value;
    const pais = document.querySelector("#pais").value;

    if(ciudad === "" || pais === "") {
        // Hubo un error
        mostrarError("Ambos casos son obligatorios");

        return;
    } 

    //Consultar la API
    consultarApi(ciudad, pais);
}

function mostrarError(mensaje) {

    const alerta = document.querySelector(".bg-red-100"); 

    if(!alerta) {
        const alerta = document.createElement("div");
        alerta.classList.add("bg-red-100", "border-red-400", "text-red-700", "px-4", "py-3", "rounded", "max-w-md", "mx-auto", "mt-6", "text-center");

        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>
        `;

        container.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 5000);
        }
}

function consultarApi(ciudad, pais) {

    const appId = "fc1c28ace510cb0eb50ec2e1e5f74c19";

    let url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
    // console.log(url);

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            console.log(datos);
            if(datos.cod === "404") {
                mostrarError("Ciudad no encontrada");
            }
        });
}