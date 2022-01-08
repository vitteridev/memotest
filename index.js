let $cartaClickeada = null;
let $intentos = document.querySelector("#intentos");
let contadorIntentos = 0;
let contadorTiempo;
let parejaDeCartasAdivinadas = 0;
const $btnJugar = document.querySelector("#btn-jugar");
const $contenedorCartas = document.querySelector("#contenedor-cartas");
const $cartas = document.querySelectorAll(".carta");
const $cartasFrontal = document.querySelectorAll(".carta-frontal");
const CONTENIDOCARTASCARAFRONTAL = [
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

window.onload = () => {
  bloquearClicksJugador($contenedorCartas);
};

function setearCartas(cartasParteFrontal) {
  const contenidoCartasCaraFrontalRandom = CONTENIDOCARTASCARAFRONTAL.sort(
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
    if (contadorSegundos < 10) {
      $segundos.innerText = "0" + contadorSegundos;
    } else {
      $segundos.innerText = contadorSegundos;
    }
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

function prueba(e) {
  return e.lastElementChild.id;
}

function desbloquearClicksJugador() {
  $contenedorCartas.classList.remove("bloquear-clicks");
}

function bloquearClicksJugador($elemento) {
  $elemento.classList.add("bloquear-clicks");
}

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
        $cartaClickeada.lastElementChild.id === $cartaActual.lastElementChild.id
      ) {
        parejaDeCartasAdivinadas++;
        bloquearClicksJugador($contenedorCartas);
        setTimeout(() => {
          desbloquearClicksJugador($contenedorCartas);
          $cartaClickeada.classList.add("opacar-carta");
          $cartaActual.classList.add("opacar-carta");
          bloquearClicksJugador($cartaClickeada);
          bloquearClicksJugador($cartaActual);
          $cartaClickeada = null;
        }, 1250);
        if (
          parejaDeCartasAdivinadas ===
          CONTENIDOCARTASCARAFRONTAL.length / 2
        ) {
          alert("ganaste");
          detenerTiempoDeJuego();
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

/* function reiniciarJuego() {
  contadorTiempo;
  contadorIntentos = 0;
} */

function jugar() {
  setearCartas($cartasFrontal);
  desbloquearClicksJugador($contenedorCartas);
  bloquearClicksJugador($btnJugar);
  setearTiempoDeJuego();
}

$btnJugar.onclick = jugar;
