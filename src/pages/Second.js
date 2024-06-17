class Second extends PageComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    window.tiles.forEach((tile) => {
      tile.resetAnimatingStack();
    });

    const displayMoonGlide = () => {
      const glideContainer =
        document.querySelector(
          ".glide"
        );

      glideContainer.style.backgroundColor =
        window.themeColor;

      const glideArrowsContainer =
        document.querySelector(
          ".glide__arrows"
        );

      glideContainer.style.display =
        "block";
      glideArrowsContainer.style.display =
        "block";

      const glideScript =
        document.createElement(
          "script"
        );
      glideScript.src =
        "/src/scripts/glide.js";

      document.body.appendChild(
        glideScript
      );
    };

    displayMoonGlide();
    this.animateTiles();

    setTimeout(() => {
      this.render();

      window.tiles.forEach((tile) => {
        tile.resetPunching();
      });
    }, 2500);
  }

  animateTiles() {
    this.shadowRoot.innerHTML = `
      <style>
        #background {
          width: 100vw;
          height: 100dvh;

          position: fixed;
          left: 0;
          top: 0;
          z-index: -1;

          background-color: ${window.themeColor};
        }
      </style>

      <div id='background'></div>
    `;

    window.tiles.forEach((tile) => {
      tile.setToBePunching();

      setTimeout(() => {
        tile.resetPunching();
      }, 2500);
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
        #background {
          width: 100vw;
          height: 100dvh;

          position: fixed;
          left: 0;
          top: 0;
          z-index: -1;

          background-color: ${
            window.themeColor
          };
        }

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
            window.TILE_SIZE * 7
          }px;
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

      <div id='background'>
      </div>

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
        document.querySelector(
          ".glide"
        ),
        document.querySelector(
          ".glide__arrows"
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
