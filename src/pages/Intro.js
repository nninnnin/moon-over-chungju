class Intro extends PageComponent {
  constructor() {
    super();

    this.state = {
      showBackgroundImage: false,
    };
  }

  connectedCallback() {
    this.resetTileInteractionPreventer();

    if (!window.tiles?.length) {
      const canvas =
        document.querySelector(
          "canvas"
        );

      if (!canvas) return;

      const { width, height } = canvas;

      const {
        tileSize,
        numberOfCol,
        numberOfTiles,
      } = Tile.setTiles(width, height);

      window.tiles = [
        ...Tile.initializeTiles(
          numberOfCol,
          numberOfTiles,
          tileSize
        ),
      ];

      const AppLayout =
        document.querySelector(
          "app-layout"
        );

      AppLayout.render();
    }

    if (this.isFillAnimationOver()) {
      this.render();
      this.changeBackgroundImage();
    }
  }

  changeBackgroundImage() {
    this.shadowRoot.getElementById(
      "background"
    ).style.backgroundImage = `url("/public/images/moon-background.svg")`;
  }

  render() {
    const firstLabelPosition =
      this.createTilePosition(
        window.NUMBER_OF_COL - 6,
        6
      );

    const secondLabelPosition =
      this.createTilePosition(1, 7);

    const thirdLabelPosition =
      this.createTilePosition(
        -1,
        window.NUMBER_OF_ROW - 7
      );

    const buttonPosition =
      this.createTilePosition(
        Math.floor(
          window.NUMBER_OF_COL / 2
        ) - 2,
        window.NUMBER_OF_ROW - 3
      );

    const isMobile =
      window.innerWidth < 768;

    const positions = [
      firstLabelPosition,
      secondLabelPosition,
      thirdLabelPosition,
      buttonPosition,
    ];

    const hasNoPosition =
      positions.some((pos) => !pos);

    if (hasNoPosition) return;

    this.shadowRoot.innerHTML = `
      <style>
        ${PageComponent.resetStyles}

        button {
          ${PageComponent.buttonStyles}

          ${buttonPosition.x};
          ${buttonPosition.y};

          width: ${
            window.TILE_SIZE * 5
          }px;
          height: ${window.TILE_SIZE}px;
        }

        .label {
          ${PageComponent.labelStyles}
        }

        #label--left-first {
          width: ${
            window.TILE_SIZE * 4
          }px;
          height: ${window.TILE_SIZE}px;

          ${firstLabelPosition.y};
          ${firstLabelPosition.x};
        }

        #label--right-first {
          width: ${
            window.TILE_SIZE * 5
          }px;
          height: ${window.TILE_SIZE}px;

          ${secondLabelPosition.y};
          ${secondLabelPosition.x};
        }

        #label--right-second {
          width: ${
            window.TILE_SIZE * 5
          }px;
          height: ${window.TILE_SIZE}px;

          ${thirdLabelPosition.y};
          ${thirdLabelPosition.x};
        }

        #logo {
          position: fixed;
          left: 0;
          top: 0;
          z-index: 8000;

          width: ${
            isMobile
              ? "100%"
              : `${
                  window.TILE_SIZE * 6
                }px`
          };

          height: ${
            isMobile
              ? "auto"
              : `${
                  window.TILE_SIZE * 2
                }px`
          }
        }

        #background {
          width: 100vw;
          height: 100dvh;

          position: fixed;
          left: 0;
          top: 0;
          z-index: -1;

          background-color: black;
          background-image: none;
          background-position: center;
          background-repeat: no-repeat;
          background-size: 100%;
        }
      </style>

      <div id='background'>
      </div>

      <img id='logo' src="/public/images/logo--intro.svg" />
      <img id='logo-desktop' />

      <marquee class='label' id='label--left-first'>
        청주시립미술관
      </marquee>

      <marquee class='label' id='label--right-first'>
        <청주에 뜬 달> 전시 소개
      </marquee>

      <marquee class='label' id='label--right-second'>
        청주시립미술관 통합 청주시 10주년 기념전 <청주 가는 길:강익중>
      </marquee>

      <button>소망 남기기</button>
    `;

    this.addListeners();
  }

  addListeners() {
    const button =
      this.shadowRoot.querySelector(
        "button"
      );

    const removeElements = () => {
      const labels =
        this.shadowRoot.querySelectorAll(
          ".label"
        );
      const button =
        this.shadowRoot.querySelector(
          "button"
        );
      const logo =
        this.shadowRoot.getElementById(
          "logo"
        );

      const elements = [
        ...labels,
        button,
        logo,
      ];

      elements.forEach((el) =>
        el.remove()
      );
    };

    const movePage = (pageNumber) => {
      const AppLayout =
        document.querySelector(
          "app-layout"
        );

      AppLayout.state.pageNumber =
        pageNumber;
    };

    const refillTiles = () => {
      window.tiles.forEach((tile) => {
        tile.setAnimatingFill();
      });
    };

    this.addTileInteractionPreventer();

    button.addEventListener(
      "click",
      () => {
        removeElements();
        refillTiles();
        movePage(1);
      }
    );
  }
}

customElements.define(
  "page-intro",
  Intro
);
