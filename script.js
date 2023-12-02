
const mensajesFondo = document.querySelector('#mensajes-container');
const mensajeContainer = document.querySelector('#mensaje-container');
const btnReinicio = document.querySelector('#btnReinicio');
const btnCerrar = document.querySelector('#btn_cerrar');

let selecciones = [];

let numCartas = 12, puntaje = 0;

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

const deseleccionar = (selecciones) => {
    
    setTimeout( async () => {

        slcUno = '', slcDos = '';
        let cartaUno = document.getElementById(`carta_${selecciones[0]}`);
        let cartaDos = document.getElementById(`carta_${selecciones[1]}`);
        let traseraUno = document.getElementById(`trasera_${selecciones[0]}`);
        let traseraDos = document.getElementById(`trasera_${selecciones[1]}`);

        slcUno = traseraUno;
        slcDos = traseraDos;

        if( traseraUno.innerHTML != traseraDos.innerHTML ) {
            cartaUno.style.transform = "rotateY(0deg)";
            cartaDos.style.transform = "rotateY(0deg)";
        } else {
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

const mostrarMensaje = async (imagen) => {

    mensajesFondo.style.display = 'flex';

    imagenes.forEach(img => {
        if (`${imagen}.svg` == img) {
            mensajeContainer.innerHTML += `
                <img id="btn_cerrar" src="img/btn_cerrar.svg" alt="" style="position: absolute; right: 8rem; padding-top: 1.5rem; width: 2rem; z-index: 999;">
                <img id="mensaje_${imagen}" src="./img/mensaje_${imagen}.svg" alt="">
            `;
            mensajeContainer.classList.add('fadeInUp');
        }
    });

}

const deshabilitarCartas = (slcUno, slcDos) => {
    setTimeout(() => {
        slcUno.style.opacity = "70%";
        slcDos.style.opacity = "70%";
    }, 100);
}

mensajeContainer.addEventListener('click', () => {
    mensajesFondo.style.display = 'none';
    mensajeContainer.innerHTML = '';

    deshabilitarCartas(slcUno, slcDos);
});

btnReinicio.addEventListener('click', () => {
    generarCuadricula();
});

generarCuadricula();