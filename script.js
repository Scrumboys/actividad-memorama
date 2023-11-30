const selectorButtons = document.querySelectorAll('.selector-buttons');
const imagenes = [
    'verduras.png',
    'papas.png',
    'pescado.png',
    'coco.png',
    'agua.png',
    'refresco.png',
];

selectorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const selector = document.querySelector('.selector-container');
        let grid = button.getAttribute('grid');
        generarCuadricula(grid);
        selector.classList.add('hidden');
    });
});

//FALTA CAMBIAR TODO
const generarCuadricula = (cuadricula) => {
    //alert("Entré e hice la cuadricula");
    let container = document.getElementById('container');
    let copiasImg = imagenes.slice();
    let cartas = [];
    selecciones = [];
    numCartas = cuadricula;
    if(numCartas == 20){
        grid= document.getElementById("container");
        grid.style.gridTemplateColumns = "repeat(5, minmax(150px, 1fr))";
    }
    else{
        grid= document.getElementById("container");
        grid.style.gridTemplateColumns = "repeat(4, minmax(150px, 1fr))";
    }
    puntaje = 0;
    container.classList.remove('fadeIn');
    container.classList.add('fadeOut');
    for( let numCarta = 0; numCarta < cuadricula; numCarta++ ){ 
        cartas.push(`
            <div class="div-carta" onclick="seleccionarCarta(${numCarta})" >
                <div id="carta_${numCarta}" class="carta">
                    <div id="trasera_${numCarta}" class="cara trasera">
                        <img src="assets/img/${copiasImg[0]}" alt="">
                    </div>
                    <div class="cara frontal">
                        <i class="fa-solid fa-question"></i>
                    </div>
                </div>
            </div>
        `);
        if( numCarta%2 === 1 ) {
            copiasImg.splice(0,1);
        }
    }
    cartas.sort(() => Math.random() - 0.5);
    container.innerHTML = cartas.join("");
    container.classList.remove('fadeOut');
    container.classList.add('fadeIn');
    renderTable();
    comenzar();
}

function reiniciar() {
    generarCuadricula(numCartas);
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

const deseleccionar = (selecciones) => {
    //alert("Aqui me metí al deseleccionar");
    setTimeout(() => {
        let cartaUno = document.getElementById(`carta_${selecciones[0]}`);
        let cartaDos = document.getElementById(`carta_${selecciones[1]}`);
        let traseraUno = document.getElementById(`trasera_${selecciones[0]}`);
        let traseraDos = document.getElementById(`trasera_${selecciones[1]}`);
        /*Aqui se valida que las cartas volteadas sean iguales*/
        if( traseraUno.innerHTML != traseraDos.innerHTML ) {
            cartaUno.style.transform = "rotateY(0deg)";
            cartaDos.style.transform = "rotateY(0deg)";
        } else {
            traseraUno.style.opacity = "70%";
            traseraDos.style.opacity = "70%";
            puntaje++;
        }
        if(puntaje === (numCartas/2)){
            const main= document.getElementById("main");
             const alerta = document.createElement("div");
            alerta.classList.add("alerta");
            alerta.id= "alerta";
            detenertiempo();
            alerta.innerHTML = 
            `
            <div class="mssgAlerta">
                <h1>¡FELICIDADES!  HAS GANADO</h1>
                <input type="text" id="playerName" placeholder="Ingrese su nombre:">
                <button type="button" id="botonAlerta" onclick="reintentar()">Intentar de nuevo</button>
            </div>
            `;
            main.append(alerta);
        }
    }, 800);
}

function reintentar() {
    const playerName = document.getElementById("playerName");
    NewUser(playerName.value);
    const alerta = document.getElementById("alerta");
    alerta.remove();
    const boton=document.getElementById("btn-comenzar");
    boton.click();
    comenzar();
}

botonesCuadricula.forEach((boton) => {
    boton.addEventListener('click', () => {
        generarCuadricula(parseInt(boton.value));
    });
});