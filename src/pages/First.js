class First extends PageComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    this.resetTileInteractionPreventer();
    this.render();
  }

  prerender() {
    this.shadowRoot.innerHTML = `
      <style>
        #background {
          background-color: black;

          width: 100vw;
          height: 100dvh;

          position: fixed;
          top: 0;
          left: 0;
          z-index: -1;
        }
      </style>

      <div id='background'></div>
    `;
  }

  render() {
    const MIDDLE_ROW_INDEX = Math.floor(
      window.NUMBER_OF_ROW / 2
    );

    const isMobile =
      window.innerWidth < 768;

    const MIDDLE_COL_INDEX = Math.floor(
      window.NUMBER_OF_COL / 2
    );

    const labels = [
      {
        id: "label-years",
        position: {
          x: isMobile
            ? 1
            : MIDDLE_COL_INDEX - 4,
          y: MIDDLE_ROW_INDEX - 6,
        },
        size: { x: 6, y: 1 },
        backgroundColor: "#DADADA",
        text: "지금 이 순간, 10년 후의",
        value: null,
      },
      {
        id: "label-family",
        position: {
          x: isMobile
            ? 1
            : MIDDLE_COL_INDEX - 4,
          y: MIDDLE_ROW_INDEX - 4,
        },
        size: { x: 3, y: 1 },
        backgroundColor: "#8FD4FF",
        text: "가족",
        value: "family",
      },
      {
        id: "label-friend",
        position: {
          x: isMobile
            ? window.NUMBER_OF_COL - 5
            : MIDDLE_COL_INDEX + 1,
          y: MIDDLE_ROW_INDEX - 4,
        },
        size: { x: 3, y: 1 },
        backgroundColor: "#5699FF",
        text: "친구",
        value: "friend",
      },
      {
        id: "label-partner",
        position: {
          x: isMobile
            ? 1
            : MIDDLE_COL_INDEX - 4,
          y: MIDDLE_ROW_INDEX - 3,
        },
        size: {
          x: 5,
          y: 1,
        },
        backgroundColor: "#01A29B",
        text: "소중한 사람",
        value: "specialPerson",
      },
      {
        id: "label-me",
        position: {
          x: isMobile
            ? 1
            : MIDDLE_COL_INDEX - 4,
          y: MIDDLE_ROW_INDEX - 2,
        },
        size: { x: 2, y: 1 },
        backgroundColor: "#FFD56C",
        text: "나",
        value: "me",
      },
      {
        id: "label-pet",
        position: {
          x: isMobile
            ? window.NUMBER_OF_COL - 4
            : MIDDLE_COL_INDEX + 2,
          y: MIDDLE_ROW_INDEX - 1,
        },
        size: { x: 3, y: 1 },
        backgroundColor: "#A8E9AE",
        text: "반려동물",
        value: "pet",
      },
      {
        id: "label-chungju",
        position: {
          x: isMobile
            ? window.NUMBER_OF_COL - 6
            : MIDDLE_COL_INDEX,
          y: MIDDLE_ROW_INDEX,
        },
        size: { x: 2, y: 1 },
        backgroundColor: "#C3C3C3",
        text: "청주시",
        value: "cheongju",
      },
      {
        id: "label-somebody",
        position: {
          x: isMobile
            ? window.NUMBER_OF_COL - 5
            : MIDDLE_COL_INDEX + 1,
          y: MIDDLE_ROW_INDEX + 1,
        },
        size: { x: 3, y: 1 },
        backgroundColor: "#EB4891",
        text: "누군가",
        value: "someone",
      },
      {
        id: "label-wish",
        position: {
          x: isMobile
            ? window.NUMBER_OF_COL - 8
            : MIDDLE_COL_INDEX - 2,
          y: MIDDLE_ROW_INDEX + 3,
        },
        size: { x: 7, y: 1 },
        backgroundColor: "#DADADA",
        text: "를 위한 소망을 남기고 싶어요",
        value: null,
      },
    ];

    const labelStyles = labels.map(
      (label) => {
        const position =
          this.createTilePosition(
            label.position.x,
            label.position.y
          );

        return `
        #${label.id} {
          ${position.x};
          ${position.y};

          width: ${
            window.TILE_SIZE *
            label.size.x
          }px;
          height: ${
            window.TILE_SIZE *
            label.size.y
          }px;

          background-color: ${
            label.backgroundColor
          };
        }
      `
          .replaceAll("\n", "")
          .trim();
      }
    );

    const labelElements = labels.map(
      (label) => {
        return `
        <div
          class='label outer'
          id='${label.id}'
          data-value=${label.value}
        >
          <div class='inner'>
            <div class='front' style='background-color: ${label.backgroundColor}'>
              ${label.text}
            </div>

            <div class='back' style='background-color: ${label.backgroundColor}'>
              ${label.text}
            </div>
          </div>
        </div>
      `
          .replaceAll("\n", "")
          .trim();
      }
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

    const AppLayout =
      document.querySelector(
        "app-layout"
      );

    this.shadowRoot.innerHTML = `
      <style>
        ${PageComponent.resetStyles}

        #logo {
          position: fixed;
          left: 0;
          top: 0;
          z-index: 8900;

          width: ${
            window.TILE_SIZE * 7
          }px;
          height: ${
            window.TILE_SIZE * 2
          }px;

          background-color: #d8d8d8;
          border: 0.5px solid black;
          border-left: 0px;
          border-top: 0px;
          box-sizing: border-box;
        }

        ${labelStyles.join("\n")}

        .label {
          ${PageComponent.labelStyles}
          padding-left: 0;
          z-index: 100;
        }

        .outer {
          perspective: 1000px;
          transition: transform 0.6s;
          transform: translate3d(0, 0, 0);
          perspective-origin: center;
        }

        .flip {
          transform: rotateX(-180deg);
          border: 2px solid black;
        }

        .inner {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .front, .back {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding-left: 8px;

          position: absolute;
          width: 100%;
          height: 100%;

          margin-left: -0.1em;
        }

        .front {
          z-index: 2;

          -webkit-perspective: 0;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }

        .back {
          z-index: 1;
          transform: rotateX(180deg);
          -webkit-transform:rotateX(180deg);
        }

        @keyframes flipIndex {
          0% {
            z-index: 1;
          } 100% {
            z-index: 2;
          }
        }

        .flip .back {
          animation: flipIndex 0.6s forwards;
        }

        button {
          ${PageComponent.buttonStyles}
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

        #button--next:disabled {
          background-color: #c3c3c3;
        }

        #background {
          width: 100vw;
          height: 100dvh;

          position: fixed;
          left: 0;
          top: 0;
          z-index: -1;

          background-color: ${
            window.themeColor ?? "black"
          };
        }
      </style>

      <div id='background'>
      </div>

      <div>
        <img id='logo' src='/public/images/logo--intro.svg' />

        ${labelElements.join("\n")}
      </div>

      <button id='button--back'>이전으로</button>
      <button id='button--next' ${
        AppLayout.state.selectedReceiver
          ? ""
          : "disabled"
      }>다음으로</button>
    `;

    this.addListeners();
  }

  addListeners() {
    this.addLabelListeners();
    this.addButtonListners();
    this.addTileInteractionPreventer();
  }

  addLabelListeners() {
    let labels =
      this.shadowRoot.querySelectorAll(
        ".label"
      );

    labels = [...labels].filter(
      (label) =>
        label.id !== "label-wish" &&
        label.id !== "label-years"
    );

    const nextButton =
      this.shadowRoot.querySelector(
        "#button--next"
      );

    labels.forEach((label) => {
      label.addEventListener(
        "click",
        () => {
          nextButton.disabled = false;

          labels.forEach((label) => {
            label.classList.remove(
              "flip"
            );
          });

          label.classList.add("flip");

          const AppLayout =
            document.querySelector(
              "app-layout"
            );

          AppLayout.state.selectedReceiver =
            label.dataset.value;

          // Store selected label's background color as theme color
          const labelColor =
            getComputedStyle(
              label
            ).backgroundColor;

          window.themeColor =
            labelColor;

          const background =
            this.shadowRoot.getElementById(
              "background"
            );

          background.style.backgroundColor =
            labelColor;
        }
      );
    });
  }

  addButtonListners() {
    const backButton =
      this.shadowRoot.getElementById(
        "button--back"
      );
    const nextButton =
      this.shadowRoot.getElementById(
        "button--next"
      );
    const AppLayout =
      document.querySelector(
        "app-layout"
      );

    const movePage = (pageNumber) => {
      AppLayout.state.pageNumber =
        pageNumber;

      AppLayout.render();
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

    const collapseTiles = () => {
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

    backButton.addEventListener(
      "click",
      () => {
        removeElements();

        collapseTiles();

        setTimeout(() => {
          animateRestack();

          setTimeout(() => {
            movePage(0);
          }, 2000);
        }, 1200);
      }
    );

    nextButton.addEventListener(
      "click",
      () => {
        if (
          !AppLayout.state
            .selectedReceiver
        ) {
          return;
        }

        removeElements();

        collapseTiles();

        setTimeout(() => {
          animateRestack();

          setTimeout(() => {
            movePage(2);
          }, 2000);
        }, 1200);
      }
    );
  }
}

customElements.define(
  "page-first",
  First
);
