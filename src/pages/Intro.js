class Intro extends PageComponent {
  constructor() {
    super();
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
    }

    this.render();
    this.changeBackgroundImage();
  }

  changeBackgroundImage() {
    this.shadowRoot.getElementById(
      "background"
    ).style.backgroundImage = `url("/public/images/moon-background.svg")`;
  }

  removeBackgroundImage() {
    this.shadowRoot.getElementById(
      "background"
    ).style.backgroundImage = `none`;
  }

  render() {
    const isMobile =
      window.innerWidth < 768;
    const MIDDLE_COL = Math.floor(
      window.NUMBER_OF_COL / 2
    );

    const firstLabelPosition =
      this.createTilePosition(
        isMobile
          ? window.NUMBER_OF_COL - 6
          : MIDDLE_COL,
        6
      );

    const SECOND_LABEL_TILESPAN = 5;
    const secondLabelWidth =
      window.TILE_SIZE *
      SECOND_LABEL_TILESPAN;
    const secondLabelPosition =
      this.createTilePosition(
        isMobile
          ? 1
          : MIDDLE_COL -
              SECOND_LABEL_TILESPAN +
              1,
        7
      );

    const thirdLabelPosition =
      this.createTilePosition(
        isMobile ? -1 : MIDDLE_COL,
        isMobile
          ? window.NUMBER_OF_ROW - 7
          : 11
      );

    const buttonPosition =
      this.createTilePosition(
        Math.floor(
          window.NUMBER_OF_COL / 2
        ) - 2,
        window.NUMBER_OF_ROW - 3
      );

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

        #label--first {
          width: ${
            window.innerWidth > 768
              ? window.TILE_SIZE * 5
              : window.TILE_SIZE * 4
          }px;
          height: ${window.TILE_SIZE}px;

          ${firstLabelPosition.y};
          ${firstLabelPosition.x};
        }

        #label--second {
          width: ${secondLabelWidth}px;
          height: ${window.TILE_SIZE}px;

          ${secondLabelPosition.y};
          ${secondLabelPosition.x};
        }

        #label--third {
          width: ${
            window.TILE_SIZE * 5
          }px;
          height: ${window.TILE_SIZE}px;

          ${thirdLabelPosition.y};
          ${thirdLabelPosition.x};
        }

        #logo {
          position: fixed;
          left: ${
            window.innerWidth > 768
              ? `${
                  (Math.ceil(
                    window.NUMBER_OF_COL /
                      2
                  ) -
                    5) *
                  window.TILE_SIZE
                }px`
              : "0"
          };
          top: 0;
          z-index: 8000;

          width: ${
            isMobile
              ? "100%"
              : `${
                  window.TILE_SIZE * 10
                }px`
          };

          height: ${
            isMobile
              ? "auto"
              : `${
                  window.TILE_SIZE * 3
                }px`
          }

          object-fit: cover;
          transform: scale(0.98);
          transform-origin: center;
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
          background-size: contain;
        }
      </style>

      <div id='background'>
      </div>

      <img id='logo' src="/public/images/logo--intro.svg" />
      <img id='logo-desktop' />

      <a
        href='https://cmoa.cheongju.go.kr/www/index.do'
      >
        <marquee-custom class='label'
        id='label--first'>
          청주시립미술관
        </marquee-custom>
      </a>

      <a href='https://cmoa.cheongju.go.kr/www/index.do'>
        <marquee-custom
          class='label'
          id='label--second'
        >
          <청주에 뜬 달> 전시 소개
        </marquee-custom>
      </a>

      <a href='https://cmoa.cheongju.go.kr/www/speclExbiView.do?key=63&exbiNo=773&pageUnit=10&searchCnd=all&searchKrwd=&pageIndex=1&kindExhi='>
        <marquee-custom
          class='label'
          id='label--third'
        >
          청주시립미술관 통합 청주시 10주년 기념전 <청주 가는 길:강익중>
        </marquee-custom>
      </a>

      <button>소망 남기기</button>
    `;

    this.addListeners();
  }

  addButtonListener() {
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

      AppLayout.render();
    };

    this.addTileInteractionPreventer();

    const collapseTiles = (cb) => {
      window.collapseCallback = cb;

      window.tiles.forEach((tile) => {
        tile.setToBeCollapse();
      });
    };

    const animateRestack = () => {
      const {
        numberOfCol,
        numberOfTiles,
        tileSize,
      } = Tile.setTiles();

      window.tiles = [
        ...Tile.initializeTiles(
          numberOfCol,
          numberOfTiles,
          tileSize,
          "restack"
        ),
      ];
    };

    button.addEventListener(
      "click",
      () => {
        this.removeBackgroundImage();
        removeElements();

        collapseTiles();

        setTimeout(() => {
          animateRestack();

          setTimeout(() => {
            movePage(1);
          }, 2000);
        }, 1200);
      }
    );
  }

  addListeners() {
    this.addLogoListener();
    this.addButtonListener();
  }
}

customElements.define(
  "page-intro",
  Intro
);
