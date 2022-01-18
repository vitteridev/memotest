context("memotest", () => {
  before("carga correctamente", () => {
    cy.visit("/");
  });

  const NUMERO_CARTAS = 12;

  describe("el juego no inicia si no le doy al boton jugar", () => {
    it("aseguro que haya un contenedor con cartas", () => {
      cy.get("#contenedor-cartas")
        .find(".carta")
        .should("have.length", NUMERO_CARTAS);
    });

    it("aseguro que el contenedor con cartas no se puedan clickear", () => {
      cy.get("#contenedor-cartas").should("have.class", "bloquear-clicks");
    });

    it("aseguro que los intentos esten en 0", () => {
      cy.get("#intentos").should("contain.text", "0");
    });
    it("aseguro que el tiempo este en 0", () => {
      cy.get("#segundos").should("contain.text", "0");
    });
  });

  describe("juega al memotest", () => {
    it("aseguro que funcione el boton jugar", () => {
      cy.get("#btn-jugar").click();
      cy.get("#btn-jugar").should("not.be.visible");
    });

    it("aseguro que las cartas sean aleatorias", () => {
      cy.get(".carta-frontal").then((cartas) => {
        let idsOriginales = [];
        cartas.each(function (i, carta) {
          idsOriginales.push(carta.id);
        });

        cy.visit("/");
        cy.get("#btn-jugar").click();

        let idsNuevos = [];
        cy.get(".carta-frontal").then((nuevasCartas) => {
          nuevasCartas.each(function (i, carta) {
            idsNuevos.push(carta.id);
          });
          cy.wrap(idsOriginales).should("not.deep.equal", idsNuevos);
        });
      });
    });
  });

  describe("resuelve el juego", () => {
    let mapaDePares, listaDePares;

    it("elige una combinación errónea", () => {
      cy.get(".carta-frontal").then((cartas) => {
        mapaDePares = obtenerParesDeCartas(cartas);
        listaDePares = Object.values(mapaDePares);

        cy.get(listaDePares[0][0]).click();
        cy.get(listaDePares[2][0]).click();
      });
      cy.get(".carta").not(".opacar").should("have.length", NUMERO_CARTAS);
    });

    it("completa el juego", () => {
      listaDePares.forEach((par) => {
        cy.get(par[0]).click();
        cy.get(par[1]).click();
      });
      cy.get(".carta").not(".opacar").should("have.length", 0);
      cy.get("#intentos").should("contain.text", "1");
      cy.get("#segundos").should("not.contain", "00");

      cy.get("#btn-jugar-de-nuevo").should("be.visible");
    });
  });
});

function obtenerParesDeCartas(cartas) {
  const pares = {};

  cartas.each((i, carta) => {
    const idEmoji = carta.id;
    if (pares[idEmoji]) {
      pares[idEmoji].push(carta);
    } else {
      pares[idEmoji] = [carta];
    }
  });
  return pares;
}
