const MAX_INTENTOS = 10;
const MAX_COMBI_COLORES = 4;
const COLORS = ['white', 'blue', 'green', 'violet', 'yellow', 'red', 'orange', 'cyan'];
const GREY = "grey";
const WHITE = "white";
const BLACK = "black";


let master = [];
let userCombi = [];
let result = [];
let intento = 0;
let aciertos = 0;

// Inicializa el juego, genera la combinación maestra y crea los intentos en la interfaz.
function init() {
    generarArrayMaster();
    crearIntentos(MAX_INTENTOS);
    console.log("Master: ", master);
    console.log("User: ", userCombi);
}

// Crea las filas de intentos en la interfaz.
function crearIntentos(MAX_INTENTOS) {
    let result = document.getElementById("Result");
    for (let i = 0; i < MAX_INTENTOS; i++) {
        const ROW_RESULT = `<div class="rowResult w100 flex wrap">
        <div class="rowUserCombi w75 flex wrap">
        <div class="w25">
        <div id="fila${i+1}cuadrado1" class="celUserCombi flex"></div>
        </div>
        <div class="w25">
        <div id="fila${i+1}cuadrado2" class="celUserCombi flex"></div>
        </div>
        <div class="w25">
        <div id="fila${i+1}cuadrado3" class="celUserCombi flex"></div>
        </div>
        <div class="w25">
        <div id="fila${i+1}cuadrado4" class="celUserCombi flex"></div>
       </div>
        </div>
        <div class="rowCercleResult w25 flex wrap center">
       <div class="w40 h40">
            <div id="fila${i+1}circulo1" class="cercleResult flex"></div>
       </div>
       <div class="w40 h40">
           <div id="fila${i+1}circulo2" class="cercleResult flex"></div>
       </div>
       <div class="w40 h40">
           <div id="fila${i+1}circulo3" class="cercleResult flex"></div>
       </div>
       <div class="w40 h40">
           <div id="fila${i+1}circulo4" class="cercleResult flex"></div>
       </div>
        <div>
        </div>`;
        let div = document.createElement("div");
        div.innerHTML = ROW_RESULT;
        result.appendChild(div);
    }
}

// Añade un color a la combinación del usuario, hasta un máximo de 4 colores.
function añadeColor(color) {
    if (userCombi.length < 4) {
        userCombi.push(color);
        document.getElementById("textCombination").value = userCombi.join(" & "); 
    } else {
        alert("Máximo de 4 colores alcanzado");
    }
}

function borrarUltimoColor() {
    if (userCombi.length > 0) {
      userCombi.pop();
      document.getElementById("textCombination").value = userCombi.join(" & ");
    } else {
      alert("No hay colores para borrar");
    }
  }

// Genera la combinación maestra de 4 colores aleatorios.
function generarArrayMaster() {
    for (i = 0; i < 4; i++) {
        const random = Math.floor(Math.random() * (COLORS.length - 1));
        master.push(COLORS[random]);
    }
    return master;
}

// Actualiza las celdas de la combinación del usuario en la interfaz.
function actualizarCeldasUsuario() {
    const filaActual = `fila${intento+1}`; // Asume que `intento` es la intentona actual
    for (let i = 0; i < userCombi.length; i++) {
        const cuadrado = document.getElementById(`${filaActual}cuadrado${i+1}`);
        if (cuadrado) cuadrado.style.backgroundColor = userCombi[i];
    }
}

// Compara la combinación del usuario con la combinación maestra y genera el resultado.
function crearResult(pMaster, pUser) {
    let colorMaster;
    let colorUser;
    // Recorre cada color en la combinación maestra y la combinación del usuario.
    for (let i = 0; i < pMaster.length; i++) {
        colorMaster = pMaster[i];
        colorUser = pUser[i];
        // Si el color del usuario coincide con el color en la misma posición de la combinación maestra, agrega 'black' al resultado.
        if (colorUser === colorMaster) {
            result.push('black');
        } else {
            // Si el color del usuario está en la combinación maestra pero en una posición diferente, agrega 'white' al resultado.
            if (pMaster.includes(colorUser)) {
                result.push('white');
            } else {
                // Si el color del usuario no está en la combinación maestra, agrega 'gray' al resultado.
                result.push('gray');
            }
        }
    }
    console.log(result);
    return result;
}


// Reinicia la combinación del usuario y el resultado.
function reiniciarCombinacionUsuario() {
    userCombi = [];
    result = [];
    document.getElementById("textCombination").value = "";
}

// Verifica la combinación del usuario, actualiza la interfaz y chequea si ha ganado.
function Comprobar() {
    if (userCombi.length === 4) {
        for (let i = 0; i < 4; i++) {
            let cuadrado = document.getElementById(`fila${intento+1}cuadrado${i+1}`);
            cuadrado.style.backgroundColor = userCombi[i];
        }
        crearResult(master, userCombi);
        for (let i = 0; i < 4; i++) {
            let circulo = document.getElementById(`fila${intento+1}circulo${i+1}`);
            circulo.style.backgroundColor = result[i];
        }
        let todosOk = result.every(elmento => elmento == "black");
        if (todosOk) {
            ganar(intento,master);
        }
        intento++;
        actualizarMensajeIntento();
        reiniciarCombinacionUsuario();
    } else {
        alert("No hay suficientes colores para comprobar, inténtelo de nuevo!");
    }
}

// Actualiza el mensaje de intento en la interfaz.
function actualizarMensajeIntento() {
    let info = document.getElementById("info");
    info.innerText = `Intento ${intento + 1}, suerte!`;
}

// Muestra un mensaje de victoria si el usuario acierta todos los colores.
function ganar(intentos, solucion) {
    // Crear fondo difuminado
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.backdropFilter = 'blur(5px)';
    overlay.style.zIndex = '999';
    document.body.appendChild(overlay);

    //Creamos un boton de reinicio
    let reinicio = document.createElement("button")
    overlay.appendChild(reinicio)

  
    // Crear pantalla de felicitaciones con intentos y solución
    const felicidadesDiv = document.createElement('div');
    felicidadesDiv.innerHTML = `
      <h2>¡Felicidades! Has completado el juego 🎉</h2>
      <p>Intentos realizados: ${intentos}</p>
      <p>Solución: ${solucion.join(', ')}</p>
    `;
    felicidadesDiv.style.position = 'fixed';
    felicidadesDiv.style.top = '45%';
    felicidadesDiv.style.left = '50%';
    felicidadesDiv.style.transform = 'translate(-50%, -50%)';
    felicidadesDiv.style.padding = '30px';
    felicidadesDiv.style.backgroundColor = '#4CAF50';
    felicidadesDiv.style.color = 'white';
    felicidadesDiv.style.fontSize = '20px';
    felicidadesDiv.style.fontWeight = 'bold';
    felicidadesDiv.style.borderRadius = '20px';
    felicidadesDiv.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.5)';
    felicidadesDiv.style.zIndex = '1000';
    felicidadesDiv.style.textAlign = 'center';
  
    document.body.appendChild(felicidadesDiv);
    console.log(`¡Felicidades! Has completado el juego. Intentos: ${intentos}, Solución: ${solucion.join(', ')}`);
  }
