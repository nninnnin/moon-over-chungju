class First extends PageComponent {
  constructor() {
    super();

    this.state = {
      selectedReceiver: null,
    };
  }

  connectedCallback() {
    const isAnimatingOver =
      window.tiles.every(
        (tile) => !tile.animatingFill
      );

    console.log(
      "끝났냐규",
      isAnimatingOver
    );

    if (isAnimatingOver) {
      setTimeout(() => {
        this.render();
      }, 500);
    }
  }

  render() {
    console.log("호출은 되나?");

    const MIDDLE_ROW_INDEX = Math.floor(
      window.NUMBER_OF_ROW / 2
    );

    const labels = [
      {
        id: "label-years",
        position: {
          x: 1,
          y: MIDDLE_ROW_INDEX - 6,
        },
        size: { x: 3, y: 1 },
        backgroundColor: "#DADADA",
        text: "10년 후",
      },
      {
        id: "label-family",
        position: {
          x: 1,
          y: MIDDLE_ROW_INDEX - 4,
        },
        size: { x: 3, y: 1 },
        backgroundColor: "#8FD4FF",
        text: "가족",
      },
      {
        id: "label-friend",
        position: {
          x: window.NUMBER_OF_COL - 5,
          y: MIDDLE_ROW_INDEX - 4,
        },
        size: { x: 3, y: 1 },
        backgroundColor: "#5699FF",
        text: "친구",
      },
      {
        id: "label-partner",
        position: {
          x: 1,
          y: MIDDLE_ROW_INDEX - 3,
        },
        size: { x: 5, y: 1 },
        backgroundColor: "#01A29B",
        text: "소중한 사람",
      },
      {
        id: "label-me",
        position: {
          x: 1,
          y: MIDDLE_ROW_INDEX - 2,
        },
        size: { x: 2, y: 1 },
        backgroundColor: "#FFD56C",
        text: "나",
      },
      {
        id: "label-pet",
        position: {
          x: window.NUMBER_OF_COL - 4,
          y: MIDDLE_ROW_INDEX - 1,
        },
        size: { x: 3, y: 1 },
        backgroundColor: "#A1EEA8",
        text: "반려동물",
      },
      {
        id: "label-chungju",
        position: {
          x: window.NUMBER_OF_COL - 6,
          y: MIDDLE_ROW_INDEX,
        },
        size: { x: 2, y: 1 },
        backgroundColor: "#EB4891",
        text: "청주시",
      },
      {
        id: "label-somebody",
        position: {
          x: window.NUMBER_OF_COL - 5,
          y: MIDDLE_ROW_INDEX + 1,
        },
        size: { x: 3, y: 1 },
        backgroundColor: "#01A29B",
        text: "누군가",
      },
      {
        id: "label-wish",
        position: {
          x: window.NUMBER_OF_COL - 8,
          y: MIDDLE_ROW_INDEX + 3,
        },
        size: { x: 7, y: 1 },
        backgroundColor: "#DADADA",
        text: "에게 바람을 남기고 싶어요",
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
        const AppLayout =
          document.querySelector(
            "app-layout"
          );

        const isSelectedLabel =
          AppLayout.state
            .selectedReceiver ===
          label.id;

        return `
        <div class='label ${
          isSelectedLabel ? "zoom" : ""
        }' id='${label.id}'>
          ${label.text}
        </div>
      `
          .replaceAll("\n", "")
          .trim();
      }
    );

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

        .label {
          ${PageComponent.labelStyles}
          z-index: 1;
        }

        ${labelStyles.join("\n")}

        .zoom {
          transform: scale3d(1.3, 1.3, 1.3);
          z-index: 9999;
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

        #background {
          width: 100vw;
          height: 100dvh;

          position: fixed;
          left: 0;
          top: 0;
          z-index: -1;

          background-color: black;
        }
      </style>

      <div id='background'>
      </div>

      <div>
        <img id='logo' src='/public/images/logo--intro.svg' />

        ${labelElements.join("\n")}
      </div>

      <button id='button--back'>이전으로</button>
      <button id='button--next'>다음으로</button>
    `;

    this.addListeners();
  }

  addListeners() {
    this.addLabelListeners();
    this.addButtonListners();
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

    labels.forEach((label) => {
      label.addEventListener(
        "click",
        () => {
          labels.forEach((label) => {
            label.classList.remove(
              "zoom"
            );
          });

          label.classList.add("zoom");

          const AppLayout =
            document.querySelector(
              "app-layout"
            );

          AppLayout.state.selectedReceiver =
            label.innerText;

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
          "fill"
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
            movePage(0);
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
            movePage(2);
          }, 2500);
        }, 2500);
      }
    );
  }
}

customElements.define(
  "page-first",
  First
);
