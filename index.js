let $cartaClickeada = null;
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

function setearCartas(cartasParteFrontal) {
  const contenidoCartasCaraFrontalRandom = CONTENIDOCARTASCARAFRONTAL.sort(
    () => 0.5 - Math.random()
  );

  contenidoCartasCaraFrontalRandom.forEach((emoji, i) => {
    cartasParteFrontal[i].innerText = emoji;
    cartasParteFrontal[i].id = emoji;
  });
}

setearCartas($cartasFrontal);

function voltearCarta(carta) {
  carta.classList.add("voltear");
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
    voltearCarta($cartaActual);
    if ($cartaClickeada === null) {
      $cartaClickeada = $cartaActual;
    } else {
      if ($cartaClickeada === $cartaActual) {
        return;
      }

      if (
        $cartaClickeada.lastElementChild.id === $cartaActual.lastElementChild.id
      ) {
        setTimeout(() => {
          $cartaClickeada.classList.add("opacar-carta");
          $cartaActual.classList.add("opacar-carta");
          bloquearClicksJugador($cartaClickeada);
          bloquearClicksJugador($cartaActual);
          $cartaClickeada = null;
        }, 1250);
      } else {
        bloquearClicksJugador($contenedorCartas);
        setTimeout(() => {
          $cartaClickeada.classList.remove("voltear");
          $cartaActual.classList.remove("voltear");
          $cartaClickeada = null;
          desbloquearClicksJugador($contenedorCartas);
        }, 1250);
      }
    }
  })
);
