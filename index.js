let $cartaClickeada = null;
let $intentos = document.querySelector("#intentos");
let contadorIntentos = 0;
let contadorTiempo;
let parejaDeCartasAdivinadas = 0;
const $btnJugar = document.querySelector("#btn-jugar");
const $btnJugarDeNuevo = document.querySelector("#btn-jugar-de-nuevo");
const $contenedorCartas = document.querySelector("#contenedor-cartas");
const $cartas = document.querySelectorAll(".carta");
const $cartasFrontal = document.querySelectorAll(".carta-frontal");
const CONTENIDO_CARTAS_CARA_FRONTAL = [
  "⚽",
  "⚾",
  "🥎",
  "🏀",
  "🏐",
  "🏈",
  "⚽",
  "⚾",
  "🥎",
  "🏀",
  "🏐",
  "🏈",
];

function setearCartas(cartasParteFrontal) {
  const contenidoCartasCaraFrontalRandom = CONTENIDO_CARTAS_CARA_FRONTAL.sort(
    () => 0.5 - Math.random()
  );

  contenidoCartasCaraFrontalRandom.forEach((emoji, i) => {
    cartasParteFrontal[i].innerText = emoji;
    cartasParteFrontal[i].id = emoji;
  });
}

function setearIntentosDeJuego() {
  contadorIntentos++;
  $intentos.innerText = contadorIntentos;
}

function setearTiempoDeJuego() {
  let $minutos = document.querySelector("#minutos");
  let $segundos = document.querySelector("#segundos");
  let contadorMinutos = 0;
  let contadorSegundos = 0;
  contadorTiempo = setInterval(() => {
    if (contadorSegundos === 60) {
      contadorSegundos = 0;
      contadorMinutos++;
      $minutos.innerText = contadorMinutos;
    }
    $segundos.innerText = contadorSegundos.toString().padStart(2, "0");
    contadorSegundos++;
  }, 1000);
}

function detenerTiempoDeJuego() {
  clearInterval(contadorTiempo);
}

function girarCarta(carta) {
  carta.classList.add("girar");
}

function girarCartaAPosicionOriginal(carta) {
  carta.classList.remove("girar");
}

function desbloquearClicksJugador($elemento) {
  $elemento.classList.remove("bloquear-clicks");
}

function bloquearClicksJugador($elemento) {
  $elemento.classList.add("bloquear-clicks");
}

function opacarElemento($elemento) {
  $elemento.classList.add("opacar");
}

function mostrarElemento($elemento) {
  $elemento.classList.remove("opacar");
}

function estadoJuego() {
  $cartas.forEach(($cartaActual) =>
    $cartaActual.addEventListener("click", function () {
      girarCarta($cartaActual);
      if ($cartaClickeada === null) {
        $cartaClickeada = $cartaActual;
      } else {
        if ($cartaClickeada === $cartaActual) {
          return;
        }

        if (
          $cartaClickeada.lastElementChild.id ===
          $cartaActual.lastElementChild.id
        ) {
          parejaDeCartasAdivinadas++;
          bloquearClicksJugador($contenedorCartas);
          setTimeout(() => {
            desbloquearClicksJugador($contenedorCartas);
            opacarElemento($cartaClickeada);
            opacarElemento($cartaActual);
            bloquearClicksJugador($cartaClickeada);
            bloquearClicksJugador($cartaActual);
            $cartaClickeada = null;
          }, 1250);
          if (
            parejaDeCartasAdivinadas ===
            CONTENIDO_CARTAS_CARA_FRONTAL.length / 2
          ) {
            detenerTiempoDeJuego();
            setTimeout(() => {
              alert("ganaste");
              $btnJugarDeNuevo.classList.remove("btn-display");
            }, 1000);
          }
        } else {
          bloquearClicksJugador($contenedorCartas);
          setTimeout(() => {
            girarCartaAPosicionOriginal($cartaClickeada);
            girarCartaAPosicionOriginal($cartaActual);
            setearIntentosDeJuego();
            $cartaClickeada = null;
            desbloquearClicksJugador($contenedorCartas);
          }, 1250);
        }
      }
    })
  );
}

function reiniciarJuego() {
  contadorIntentos = 0;
  $intentos.innerText = contadorIntentos;
  parejaDeCartasAdivinadas = 0;
  setearTiempoDeJuego();
  setearCartas($cartasFrontal);
  opacarElemento($contenedorCartas);
  bloquearClicksJugador($contenedorCartas);
  $cartas.forEach(($carta) => {
    girarCartaAPosicionOriginal($carta);
    mostrarElemento($carta);
    desbloquearClicksJugador($carta);
  });
  $btnJugarDeNuevo.classList.add("btn-display");
  setTimeout(() => {
    mostrarElemento($contenedorCartas);
    desbloquearClicksJugador($contenedorCartas);
  }, 500);
}

function jugar() {
  setearCartas($cartasFrontal);
  desbloquearClicksJugador($contenedorCartas);
  estadoJuego();
  setearTiempoDeJuego();
  $btnJugar.style.display = "none";
}

bloquearClicksJugador($contenedorCartas);

$btnJugar.onclick = jugar;
$btnJugarDeNuevo.onclick = reiniciarJuego;
