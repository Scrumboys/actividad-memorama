
const containerInicio = document.querySelector('#container-inicio');
const containerBgInicio = document.querySelector('#container-bg-inicio');
const containerWinner = document.querySelector('#container-bg-winner');
const mensajesFondo = document.querySelector('#mensajes-container');
const cartasContainer = document.querySelector('#cartas-container');
const mensajeContainer = document.querySelector('#mensaje-container');
const mainContainer = document.querySelector('.main-container');

const btnCerrar = document.querySelector('#btn_cerrar');
const btnJugarDeNuevo = document.querySelector('#botonjugardenuevo');
const btnSalir = document.querySelector('#botonsalir');

const btnSeisCartas = document.querySelector('#boton6');
const btnDoceCartas = document.querySelector('#boton12');
const botones = document.querySelectorAll('#botonx');

let selecciones = [];

let numCartas = 0, puntaje = 0;

let slcUno = 0, slcDos = 0;

let imagenes = [
    'fondo_0.svg',
    'fondo_1.svg',
    'fondo_2.svg',
    'fondo_3.svg',
    'fondo_4.svg',
    'fondo_5.svg',
];

const generarCuadricula = () => {
    

    if(numCartas == 6) {
        cartasContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
        cartasContainer.style.gridTemplateRows = 'repeat(3, 1fr)';
        cartasContainer.style.width = '90%';
    } else {
        cartasContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
        cartasContainer.style.gridTemplateRows = 'repeat(4, 1fr)';
        cartasContainer.style.width = '100%';
    }

    containerInicio.style.display = 'none';
    mainContainer.style.display = 'flex';

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

const seleccionarCarta = async (numCarta) => {

    let carta = document.getElementById(`carta_${numCarta}`);
    if (carta.style.transform != "rotateY(180deg)") {
        carta.style.transform = "rotateY(180deg)";
        selecciones.push(numCarta);
    }

    if (selecciones.length == 2) {
        await deseleccionar(selecciones[0], selecciones[1]);
        selecciones = [];
    }

    
}


const deseleccionar = async (seleccionUno, seleccionDos) => {
    setTimeout(() => {
        let cartaUno = document.getElementById(`carta_${seleccionUno}`);
        let cartaDos = document.getElementById(`carta_${seleccionDos}`);
        let traseraUno = document.getElementById(`trasera_${seleccionUno}`);
        let traseraDos = document.getElementById(`trasera_${seleccionDos}`);

        slcUno = traseraUno;
        slcDos = traseraDos;

        if (traseraUno.innerHTML != traseraDos.innerHTML) {
            cartaUno.style.transform = "rotateY(0deg)";
            cartaDos.style.transform = "rotateY(0deg)";
        } else {
            puntaje++;

            const srcImagen = traseraUno.querySelector('img').getAttribute('src');
            const parts = srcImagen.split('/');
            const fileName = parts[parts.length - 1].split('.')[0];

            mostrarMensaje(fileName);
        }

    }, 600);

}


const mostrarMensaje = (imagen) => {

    mensajesFondo.classList.add('fadeIn');
    mensajeContainer.classList.add('fadeInUp');
    mensajesFondo.style.display = 'flex';

    if (imagenes.includes(`${imagen}.svg`)) {
        document.getElementById(`mensaje_${imagen}`).classList.remove('hidden');
    }

}

const deshabilitarCartas = (slcUno, slcDos) => {
    setTimeout(() => {
        slcUno.style.opacity = "70%";
        slcDos.style.opacity = "70%";

        if(puntaje === (numCartas / 2)) {
            mostrarVentanaWin();
        }
    }, 100);
}

async function mostrarVentanaWin() {
    mainContainer.style.display = 'none';
    containerInicio.style.display = 'flex';
    containerWinner.classList.remove('mensaje-oculto');

    containerBgInicio.classList.add('mensaje-oculto', 'fadeIn');
}

function jugarDeNuevo() {
    containerBgInicio.classList.remove('mensaje-oculto');
    containerWinner.classList.add('mensaje-oculto');

    puntaje = 0;
}

// Asignar addEventListener a las ventanas de mensaje para cada par
botones.forEach((boton) => {
    boton.addEventListener('click', () => {
        mensajesFondo.style.display = 'none';
    
        for (let i = 0; i < mensajeContainer.children.length; i++) {
            mensajeContainer.children[i].classList.add('hidden');
        }

        deshabilitarCartas(slcUno, slcDos);

    });
});

btnSeisCartas.addEventListener('click', () => {
    numCartas = 6;
    generarCuadricula();
});

btnDoceCartas.addEventListener('click', () => {
    numCartas = 12;
    generarCuadricula();
});

btnJugarDeNuevo.addEventListener('click', () => {
    jugarDeNuevo();
});
