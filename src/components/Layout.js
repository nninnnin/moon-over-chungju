class Layout extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  createTilePosition(x, y) {
    return {
      x: window.TILE_SIZE * x,
      y: window.TILE_SIZE * y,
    };
  }

  render() {
    const testPosition = this.createTilePosition(
      2,
      5
    );

    const buttonPosition =
      this.createTilePosition(
        Math.floor(window.NUMBER_OF_COL / 2) - 2,
        window.NUMBER_OF_ROW - 3
      );

    this.shadowRoot.innerHTML = `
      <style>
        button {
          position: fixed;
          top: ${buttonPosition.y}px;
          left: ${buttonPosition.x}px;
          z-index: 9999;

          width: ${window.TILE_SIZE * 5}px;
          height: ${window.TILE_SIZE}px;

          font-size: 1em;
          white-space: nowrap;

          touch-action: manipulation;
          user-select: none;
          -webkit-user-select: none;

          border: none;
          outline: none;
          background-color: black;
          color: white;

          cursor: pointer;
        }

        #test {
          box-sizing: border-box;

          background-color: turquoise;

          width: ${window.TILE_SIZE * 3}px;
          height: ${window.TILE_SIZE}px;

          display: flex;
          justify-content: flex-start;
          align-items: center;

          white-space: nowrap;
          overflow: hidden;
          padding-left: 1em;

          position: fixed;
          top: ${testPosition.y}px;
          left: ${testPosition.x}px;
          z-index: 9999;

          border: 0.5px solid rgba(0, 0, 0, 0.8);

          filter: blur(0.2px);
        }
      </style>

      <div id='test'>청주시립미술관</div>

      <button>바람 남기기</button>
    `;

    this.addListeners();
  }

  addListeners() {
    const button =
      this.shadowRoot.querySelector("button");

    console.log(button);

    button.addEventListener("click", () => {
      console.log("..");

      console.log(window.tiles);

      window.tiles.forEach((tile) => {
        tile.setToBeCollapsed();
      });

      this.shadowRoot.querySelector(
        "button"
      ).style.display = "none";
      this.shadowRoot.querySelector(
        "#test"
      ).style.display = "none";
    });
  }
}

window.customElements.define(
  "app-layout",
  Layout
);
