
const mensajesFondo = document.querySelector('#mensajes-container');

let selecciones = [];
let numCartas = 12;
let puntaje = 0;


let imagenes = [
    'fondo_0.svg',
    'fondo_1.svg',
    'fondo_2.svg',
    'fondo_3.svg',
    'fondo_4.svg',
    'fondo_5.svg',
];

const generarCuadricula = () => {
    let cartasContainer = document.getElementById('cartas-container');
    let copiasImg = imagenes.slice();
    let cartas = [];
    selecciones = [];

    for( let numCarta = 0 ; numCarta < numCartas; numCarta++ ){ 
        cartas.push(`
            <div class="div-carta" onclick="seleccionarCarta(${numCarta})" >
                <div id="carta_${numCarta}" class="carta">
                    <div id="trasera_${numCarta}" class="cara trasera">
                        <img src="./img/${copiasImg[0]}" alt="">
                    </div>
                    <div class="cara frontal">
                    <img src="./img/logo_cartaTrasera.svg" alt="">
                    </div>
                </div>
            </div>
        `);

        if( numCarta%2 === 1 ) {
            copiasImg.splice(0,1);
        }
    }

    cartas.sort(() => Math.random() - 0.5);
    cartasContainer.innerHTML = cartas.join("");
}

const seleccionarCarta = (numCarta) => {
    //alert("Aqui estoy seleccionando las cartas");
    let carta = document.getElementById(`carta_${numCarta}`);
    if( carta.style.transform != "rotateY(180deg)" ) {
        carta.style.transform = "rotateY(180deg)";
        selecciones.push(numCarta);
    }
    if(selecciones.length == 2) {
        deseleccionar(selecciones);
        selecciones = [];
    }
}

//aquí le puse un input para que mostrara el nombre a ingresar
const deseleccionar = (selecciones) => {

    setTimeout(() => {
        let cartaUno = document.getElementById(`carta_${selecciones[0]}`);
        let cartaDos = document.getElementById(`carta_${selecciones[1]}`);
        let traseraUno = document.getElementById(`trasera_${selecciones[0]}`);
        let traseraDos = document.getElementById(`trasera_${selecciones[1]}`);

        if( traseraUno.innerHTML != traseraDos.innerHTML ) {
            cartaUno.style.transform = "rotateY(0deg)";
            cartaDos.style.transform = "rotateY(0deg)";
        } else {
            traseraUno.style.opacity = "70%";
            traseraDos.style.opacity = "70%";

            const srcImagen = traseraUno.querySelector('img').getAttribute('src');
            const parts = srcImagen.split('/');
            const fileName = parts[parts.length - 1].split('.')[0];

            mostrarMensaje(fileName);
            puntaje++;
        }
        if(puntaje === (numCartas/2)){

        }

    }, 800);
}

const mostrarMensaje = (imagen) => {

    mensajesFondo.style.display = 'flex';

    imagenes.forEach(img => {
        if(`${imagen}.svg` == img) {
            const mensajeFondo = mensajesFondo.querySelector(`#mensaje_${imagen}`);
            mensajeFondo.classList.remove('mensaje-oculto');
        }
    });
    
}

generarCuadricula();