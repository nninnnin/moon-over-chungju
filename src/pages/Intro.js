class Intro extends PageComponent {
  constructor() {
    super();
  }

  render() {
    const firstLabelPosition =
      this.createTilePosition(2, 5);

    const secondLabelPosition =
      this.createTilePosition(
        -2,
        window.NUMBER_OF_ROW - 5
      );

    const thirdLabelPosition =
      this.createTilePosition(
        -2,
        window.NUMBER_OF_ROW - 6
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
          ${buttonPosition.x};
          ${buttonPosition.y};
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

        .label {
          box-sizing: border-box;
          background-color: turquoise;

          display: flex;
          justify-content: flex-start;
          align-items: center;

          white-space: nowrap;
          overflow: hidden;
          padding-left: 0.5em;

          position: fixed;
          z-index: 9999;

          border: 0.5px solid rgba(0, 0, 0, 0.8);
          filter: blur(0.2px);
        }

        #label--left-first {
          width: ${window.TILE_SIZE * 3}px;
          height: ${window.TILE_SIZE}px;

          ${firstLabelPosition.y};
          ${firstLabelPosition.x};
        }

        #label--right-first {
          width: ${window.TILE_SIZE * 2}px;
          height: ${window.TILE_SIZE}px;

          ${secondLabelPosition.y};
          ${secondLabelPosition.x};
        }

        #label--right-second {
          width: ${window.TILE_SIZE * 4}px;
          height: ${window.TILE_SIZE}px;

          ${thirdLabelPosition.y};
          ${thirdLabelPosition.x};
        }
      </style>

      <div class='label' id='label--left-first'>
        청주시립미술관
      </div>

      <div class='label' id='label--right-first'>
        청주에 뜬 달
      </div>

      <div class='label' id='label--right-second'>
        청주 가는 길: 강익중
      </div>

      <button>바람 남기기</button>
    `;

    this.addListeners();
  }

  addListeners() {
    const button =
      this.shadowRoot.querySelector("button");

    button.addEventListener("click", () => {
      window.tiles.forEach((tile) => {
        tile.setToBeCollapse();
      });

      setTimeout(() => {
        console.log(tiles);

        // 1. 새로운 타일들을 생성
        const newTiles = Tile.initializeTiles(
          window.NUMBER_OF_COL,
          window.NUMBER_OF_TILES,
          window.TILE_SIZE,
          true
        );

        console.log(newTiles);

        window.tiles = [...newTiles];
      }, 2500);

      this.shadowRoot.querySelector(
        "button"
      ).style.display = "none";

      this.shadowRoot.querySelector(
        "#test"
      ).style.display = "none";
    });
  }
}

customElements.define("page-intro", Intro);
