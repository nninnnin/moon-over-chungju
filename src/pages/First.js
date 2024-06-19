class First extends PageComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    this.resetTileInteractionPreventer();

    if (this.isFillAnimationOver()) {
      this.render();
    }
  }

  render() {
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
        value: null,
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
        value: "family",
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
        value: "friend",
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
        value: "specialPerson",
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
        value: "me",
      },
      {
        id: "label-pet",
        position: {
          x: window.NUMBER_OF_COL - 4,
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
          x: window.NUMBER_OF_COL - 6,
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
          x: window.NUMBER_OF_COL - 5,
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
          x: window.NUMBER_OF_COL - 8,
          y: MIDDLE_ROW_INDEX + 3,
        },
        size: { x: 7, y: 1 },
        backgroundColor: "#DADADA",
        text: "에게 바람을 남기고 싶어요",
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
        }' id='${
          label.id
        }' data-value=${label.value}>
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
          box-sizing: border-box;
        }

        .label {
          ${PageComponent.labelStyles}
          z-index: 1;
        }

        ${labelStyles.join("\n")}

        .zoom {
          transform: scale3d(1.3, 1.3, 1.3);
          z-index: 8900;
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
              "zoom"
            );
          });

          label.classList.add("zoom");

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

    const refillTiles = () => {
      window.tiles.forEach((tile) => {
        tile.setAnimatingFill();
      });
    };

    backButton.addEventListener(
      "click",
      () => {
        removeElements();
        refillTiles();
        movePage(0);
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
        refillTiles();
        movePage(2);
      }
    );
  }
}

customElements.define(
  "page-first",
  First
);
