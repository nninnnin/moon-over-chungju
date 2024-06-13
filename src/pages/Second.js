class Second extends PageComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    window.tiles.forEach((tile) => {
      tile.resetAnimatingStack();
    });

    this.animateTiles();

    setTimeout(() => {
      this.render();
    }, 2500);
  }

  animateTiles() {
    window.tiles.forEach((tile) => {
      tile.setToBePunching();
    });
  }

  render() {
    const messagePosition =
      this.createTilePosition(2, 3);

    const MIDDLE_COL_INDEX = Math.floor(
      window.NUMBER_OF_COL / 2
    );

    const backButtonStyle =
      this.createTilePosition(
        MIDDLE_COL_INDEX - 4,
        window.NUMBER_OF_ROW - 3
      );

    const nextButtonStyle =
      this.createTilePosition(
        MIDDLE_COL_INDEX,
        window.NUMBER_OF_ROW - 3
      );

    this.shadowRoot.innerHTML = `
      <style>
        .label {
          ${PageComponent.labelStyles}
        }

        button {
          ${PageComponent.buttonStyles}
        }

        #guide-message {
          width: ${
            window.TILE_SIZE * 8
          }px;
          height: ${window.TILE_SIZE}px;

          ${messagePosition.x};
          ${messagePosition.y};
          font-size: 20px;
        }

        #logo {
          position: fixed;
          left: 0;
          top: 0;
          z-index: 9999;

          width: ${
            window.innerWidth > 768
              ? `${
                  window.TILE_SIZE * 7
                }px`
              : `${
                  window.TILE_SIZE * 6
                }px`
          };
          height: ${
            window.TILE_SIZE * 2
          }px;

          background-color: #d8d8d8;
          border: 0.5px solid black;
          box-sizing: border-box;
        }

        #button--back {
          width: ${TILE_SIZE * 3}px;
          height: ${TILE_SIZE}px;

          ${backButtonStyle.x};
          ${backButtonStyle.y};
        }

        #button--next {
          width: ${TILE_SIZE * 5}px;
          height: ${TILE_SIZE}px;

          ${nextButtonStyle.x};
          ${nextButtonStyle.y};
        }
      </style>

      <img id='logo' src='/public/images/logo--intro.svg' />

      <div class='label' id='guide-message'>
        메시지와 함께 띄울 달을 골라주세요
      </div>

      <button id='button--back'>이전으로</button>
      <button id='button--next'>다음으로</button>
    `;

    this.addListeners();
  }

  addListeners() {
    this.addButtonListeners();
  }

  addButtonListeners() {
    const backButton =
      this.shadowRoot.getElementById(
        "button--back"
      );
    const nextButton =
      this.shadowRoot.getElementById(
        "button--next"
      );

    const movePage = (pageNumber) => {
      const AppLayout =
        document.querySelector(
          "app-layout"
        );

      AppLayout.setStateAndRerender({
        pageNumber,
      });
    };

    const removeElements = () => {
      const elements = [
        this.shadowRoot.getElementById(
          "logo"
        ),
        ...this.shadowRoot.querySelectorAll(
          ".label"
        ),
        ...this.shadowRoot.querySelectorAll(
          "button"
        ),
      ];

      elements.forEach((element) => {
        element.remove();
      });
    };

    const restackTiles = () => {
      const {
        tileSize,
        numberOfCol,
        numberOfTiles,
      } = Tile.setTiles(width, height);

      window.tiles = [
        ...Tile.initializeTiles(
          numberOfCol,
          numberOfTiles,
          tileSize,
          true
        ),
      ];
    };

    const collapseTiles = () => {
      window.tiles.forEach((tile) => {
        tile.setToBeCollapse();
      });
    };

    backButton.addEventListener(
      "click",
      () => {
        collapseTiles();
        removeElements();

        setTimeout(() => {
          restackTiles();

          setTimeout(() => {
            movePage(1);
          }, 2500);
        }, 2500);
      }
    );

    nextButton.addEventListener(
      "click",
      () => {
        collapseTiles();
        removeElements();

        setTimeout(() => {
          restackTiles();

          setTimeout(() => {
            movePage(3);
          }, 2500);
        }, 2500);
      }
    );
  }
}

customElements.define(
  "page-second",
  Second
);
