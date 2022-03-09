// Funcion que llega desde el controlador se importa desde el script
import { getPaises } from "../controllador/controllador.js";
//Declaracion de variables para capturar elementos del DOM
const select = document.getElementById("selects");
const banderas = document.getElementById('banderas')
const inputBusqueda = document.getElementById('inputFormulario');


let paises;

// Funciones asincronica  donde se relaizan peticiones a travez de promesas  usando 
const fetchData = async() => {
        if (paises == null) {
            paises = await getPaises()
        }
        /* console.log(banderas) */
        banderillas(paises)
    }
    //funcion tipo flecha que nos permite recorrer el objeto y pintamos la api con los datos 
const banderillas = data => {
    data.forEach(item => {
        let { name, urlImg, poblation, capital, region, description } = item;


        banderas.innerHTML += `
        <article class="card" data-bs-toggle="modal" data-bs-target="#${name.slice(0,5)}">
    
            <img src="${urlImg}" alt="" class="img-fluid" >
            <div class="modal fade" id="${name.slice(0,5)}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Datos curiosos</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <img src="${urlImg}" alt="" class="img" width="100px">Descripcion:
            ${description}
            </div>
            <div class="modal-footer">
            </div>
            </div>
             </div>
            </div>
            
            <div class="card-content">
        
                <h3>${name}</h3>
                <p>
                    <b>Population: </b>
                    ${poblation}
                </p>
                <p>
                    <b>Capital: </b>
                    ${capital}
                </p>
                <p>
                    <b>Región: </b>
                    ${region}
                </p>
            </div>
        </article>
        `

    });

}

const extraerRegiones = async() => {
    let regiones = []
    let array = await getPaises();
    array.forEach((pais) => {
        let { region } = pais;
        if (!regiones.includes(region)) {
            regiones.push(region);
            select.innerHTML += `<option id="${region}" value="${region}">${region}</option>`
        }
    })
}

const filtrarRegiones = async() => {
    let paises = await getPaises()
    let regionInput = ""
    select.addEventListener("click", e => {
        /* console.log(e.target.value); */

        regionInput = e.target.value;
        console.log(regionInput);
        banderas.innerHTML = ""
            //Dejamos en blanco el body
        if (regionInput === "todos") {
            banderillas(paises)
        } else {
            let nuevaArray = paises.filter(pais => regionInput === pais.region);
            banderillas(nuevaArray);
        }

        // Itineramos por los paises

    })



}
const buscarInput = async() => {
    let paises = await getPaises();
    console.log(inputBusqueda.value)
    let inputMinuscula = inputBusqueda.value.toLowerCase()

    let arrayFilter = paises.filter(pais =>
        pais.name.toLowerCase().includes(inputMinuscula))
    banderas.innerHTML = "";

    //html
    banderillas(arrayFilter)
        //console.log(arrayFilter)
}

inputBusqueda.addEventListener("click", (e) => {
    e.preventDefault()
    buscarInput()
})

/* const detalle = (e) => {
    console.log(e.target.getAttribute("data-value"));
    } */
// modo oscuro

const btnDark = document.querySelector('.btn-dark-mode');

btnDark.addEventListener('click', () => {
    /* console.log('diste click') */
    document.body.classList.toggle('dark-mode');

    if (document.body.className === 'dark-mode') {
        btnDark.innerHTML = `
        <i class="far fa-sun"></i>
        Light Mode
        `
    } else {
        btnDark.innerHTML = `
        <i class="far fa-moon"></i>
        Dark Mode
        `
    }
})

document.addEventListener("DOMContentLoaded", fetchData)
document.addEventListener("DOMContentLoaded", extraerRegiones)
document.addEventListener("DOMContentLoaded", filtrarRegiones)