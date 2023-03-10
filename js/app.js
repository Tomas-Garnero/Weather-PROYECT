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

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
    // console.log(url);

    // Muestra un spinner de carga
    Spinner();

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            // Limpiar el HTML previo
            limpiarHTML();
            // console.log(datos);
            if(datos.cod === "404") {
                mostrarError("Ciudad no encontrada");
                return;
            }

            // Imprime la respuestas en el HTML
            mostrarClima(datos);
        });
}

function mostrarClima(datos) {
    const { name, main: {temp, temp_max, temp_min}}= datos;

    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    const nombreCiudad = document.createElement("p");
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add("font-bold", "text-2xl");
    
    const actual = document.createElement("p");
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add("font-bold", "text-6xl");

    const tempMax = document.createElement("p");
    tempMax.innerHTML = `Max: ${max} &#8451;`;
    tempMax.classList.add("text-xl");

    const tempMin = document.createElement("p");
    tempMin.innerHTML = `Min: ${max} &#8451;`;
    tempMin.classList.add("text-xl");


    const resultadoDiv = document.createElement("div");
    resultadoDiv.classList.add("text-center", "text-white");
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMax);
    resultadoDiv.appendChild(tempMin);

    resultado.appendChild(resultadoDiv);
}

const kelvinACentigrados = grados => parseInt(grados - 273.15);


function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function Spinner() {

    limpiarHTML();

    const divSpiner = document.createElement("div");
    divSpiner.classList.add("sk-fading-circle");
    divSpiner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `

    resultado.appendChild(divSpiner);
}