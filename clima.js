const formulario = document.querySelector("#formulario")
const mensajeError = document.querySelector("#mensajeError");
const resultado = document.querySelector("#resultado");



window.addEventListener("load", () => {
    formulario.addEventListener("submit", buscarClima);
    
})


function buscarClima(e) {
    e.preventDefault()
    

    //Validar Formulario
    const ciudad = document.querySelector("#ciudad").value;

    const pais = document.querySelector("#pais").value;


    if(ciudad==="" || pais === ""){
        mostrarError("Todos los campos son obligatorios")

        return;
    }

    //Consultamos a la API
    consultarApi(ciudad, pais);
}




function mostrarError(mensaje){
    const alerta = document.querySelector(".divAlerta");
    

    //Realizo un if para que no se repita el mensaje 
    if(!alerta){
        const alerta = document.createElement("div");
    alerta.classList.add("divAlerta")
    alerta.innerHTML = `
        <h3>Error!<h3>
        <p>${mensaje}<p>`

    mensajeError.appendChild(alerta)


    setTimeout(() => {
        alerta.remove();


    }, 5000)
    
    }   
}

function consultarApi(ciudad, pais){
    const APIid = "cd8f84fd02c28e16769bd82dc1d25f5f"
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${APIid}`
    const urlNuevo = url.replace(" ","%20")
    
    console.log(urlNuevo)

    mostrarSpinner();

    fetch(urlNuevo)
    .then(respuesta => respuesta.json())
    .then(datos => {
        limpiarHTML()// Borra el resultado anterior
        console.log(datos)

        mostrarTiempo(datos);
    })
}


function mostrarTiempo(datos) {
    const {name, main : {temp, temp_max, temp_min}} = datos

    const tempActual = KelvinACentigrados(temp); // Para pasar de grados kelvin a celsius
    const tempMax= KelvinACentigrados(temp_max);
    const tempMin = KelvinACentigrados(temp_min);

    const nombreCiudad = document.createElement("p");
    nombreCiudad.innerHTML = `Tiempo en ${name}`
    nombreCiudad.classList.add("fs-2")
    
    //Actual
    const tempA = document.createElement("p");
    tempA.innerHTML = `${tempActual} &#8451`
    tempA.classList.add("fs-1")
    
    //Max
    const tempM = document.createElement("p");
    tempM.innerHTML = `max : ${tempMax} &#8451`
    tempM.classList.add("fs-3")
    
    //Min
    const minTemp = document.createElement("p");
    minTemp.innerHTML = `min : ${tempMin} &#8451`
    minTemp.classList.add("fs-4")
    
    const tempdiv = document.createElement("div");
    tempdiv.appendChild(nombreCiudad);
    tempdiv.appendChild(tempA);
    tempdiv.appendChild(tempM)
    tempdiv.appendChild(minTemp);
    resultado.appendChild(tempdiv);


}

function KelvinACentigrados(grados) {
    return parseInt( grados - 273.15);
  }


function limpiarHTML() {
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}


function mostrarSpinner(){
    
    limpiarHTML();

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
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
    `;
    resultado.appendChild(divSpinner);
}