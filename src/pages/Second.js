class SecondPage extends PageComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    this.resetTileInteractionPreventer();
    this.prerender();

    if (this.isFillAnimationOver()) {
      this.animateTiles();

      setTimeout(() => {
        this.render();
      }, 500);
    }
  }

  prerender() {
    this.shadowRoot.innerHTML = `
      <style>
        #background {
          background-color: ${window.themeColor};

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

  animateTiles() {
    this.prerender();

    window.tiles.forEach((tile) => {
      tile.setToBePunching();

      setTimeout(() => {
        tile.resetPunching();
      }, 2500);
    });
  }

  render() {
    const MIDDLE_COL_INDEX = Math.floor(
      window.NUMBER_OF_COL / 2
    );

    const firstLabelPosition =
      this.createTilePosition(2, 3);

    const secondLabelPosition =
      this.createTilePosition(5, 3);

    const thirdLabelPosition =
      this.createTilePosition(
        window.NUMBER_OF_COL - 1 - 8,
        4
      );

    const backButtonStyle =
      this.createTilePosition(
        MIDDLE_COL_INDEX - 4,
        window.NUMBER_OF_ROW - 3
      );

    const submitButtonStyle =
      this.createTilePosition(
        MIDDLE_COL_INDEX,
        window.NUMBER_OF_ROW - 3
      );

    const AppLayout =
      document.querySelector(
        "app-layout"
      );

    const selectedReceiver =
      AppLayout.state.selectedReceiver;

    this.shadowRoot.innerHTML = `
      <style>
        ${PageComponent.resetStyles}

        #logo {
          position: fixed;
          left: 0;
          top: 0;
          z-index: 8000;

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

          cursor: default;
          pointer-events: none;
        }

        #label-first {
          width: ${
            window.TILE_SIZE * 3
          }px;
          height: ${window.TILE_SIZE}px;

          ${firstLabelPosition.x};
          ${firstLabelPosition.y};
          font-size: 20px;
        }

        #label-second {
          width: ${
            window.TILE_SIZE * 3
          }px;
          height: ${window.TILE_SIZE}px;

          ${secondLabelPosition.x};
          ${secondLabelPosition.y};
          font-size: 20px;

          background-color: #01A29B;
        }

        #label-third {
          width: ${
            window.TILE_SIZE * 8
          }px;
          height: ${window.TILE_SIZE}px;

          ${thirdLabelPosition.x};
          ${thirdLabelPosition.y};
          font-size: 20px;
        }

        button {
          ${PageComponent.buttonStyles}
        }

        button:disabled {
          background-color: #c3c3c3;
        }

        #button--back {
          width: ${TILE_SIZE * 3}px;
          height: ${TILE_SIZE}px;

          ${backButtonStyle.x};
          ${backButtonStyle.y};
        }

        #button--submit {
          width: ${TILE_SIZE * 5}px;
          height: ${TILE_SIZE}px;

          ${submitButtonStyle.x};
          ${submitButtonStyle.y};
        }

        #background {
          position: fixed;
          left: 0;
          top: 0;
          z-index: -1;

          width: 100vw;
          height: 100dvh;

          background-color: ${
            window.themeColor
          };
        }
      </style>

      <div id='background'></div>

      <img id='logo' src='/public/images/logo--intro.svg' />

      <div class='label' id='label-first'>
        10년 후
      </div>

      <div class='label' id='label-second'>
        ${
          LABEL_VALUE_MAP[
            selectedReceiver
          ]
        }
      </div>

      <div class='label' id='label-third'>
        을 위해 소망을 남겨주세요
      </div>

      <button id='button--back'>이전으로</button>
      <button id='button--submit' disabled>전송하기</button>
    `;

    this.showContents();
    this.addListeners();
  }

  addListeners() {
    this.addButtonListeners();
    this.addInputListener();
  }

  addInputListener() {
    const input =
      document.getElementById(
        "message-input"
      );

    input.addEventListener(
      "input",
      (e) => {
        const value = e.target.value;

        const submitButton =
          this.shadowRoot.querySelector(
            "#button--submit"
          );

        if (
          submitButton &&
          value?.length
        ) {
          submitButton.disabled = false;
        } else {
          submitButton.disabled = true;
        }
      }
    );
  }

  addButtonListeners() {
    const backButton =
      this.shadowRoot.querySelector(
        "#button--back"
      );

    const AppLayout =
      document.querySelector(
        "app-layout"
      );

    const hideElements = () => {
      const elements = [
        this.shadowRoot.querySelector(
          "#logo"
        ),
        ...this.shadowRoot.querySelectorAll(
          ".label"
        ),
        backButton,
        submitButton,
      ];

      elements.forEach((el) => {
        if (!el) return;

        el.remove();
      });
    };

    const movePage = (pageNumber) => {
      AppLayout.state.pageNumber =
        pageNumber;

      AppLayout.render();
    };

    const collapseTiles = () => {
      window.tiles.forEach((tile) => {
        tile.setToBeCollapse();
      });

      setTimeout(() => {
        window.tiles.forEach((tile) => {
          tile.setNotToBeCollapse();
        });
      }, 2500);
    };

    const restackTiles = () => {
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
        hideElements();
        this.hideContents();

        collapseTiles();

        setTimeout(() => {
          restackTiles();

          setTimeout(() => {
            movePage(1);
          }, 2000);
        }, 1200);
      }
    );

    const submitButton =
      this.shadowRoot.querySelector(
        "#button--submit"
      );

    submitButton.addEventListener(
      "click",
      async () => {
        submitButton.disabled = true;

        const submit = async () => {
          const MessageInput =
            document.querySelector(
              "#message-input"
            );

          const keyword =
            AppLayout.state
              .selectedReceiver;

          const message =
            MessageInput.value;

          const payload = {
            keyword,
            moonType: "",
            message,
          };

          console.log(
            "보내는 페이로드",
            payload
          );

          return await requestLambda(
            payload
          );
        };

        const animateMoon = () => {
          const lastMoon =
            document.querySelector(
              "#last-moon"
            );

          lastMoon.classList.add(
            "moon-drive"
          );
        };

        const response = await submit();

        console.log(
          "submit response",
          response
        );

        // 1. 엘리먼트 사라지기
        hideElements();

        // 2. 메시지 페이드아웃
        const input =
          document.getElementById(
            "message-input"
          );

        input.classList.add("fadeout");

        setTimeout(() => {
          // 3. 타일 콜랩스
          setTimeout(() => {
            collapseTiles();
          }, 300);

          // 4. 달 떠오르기
          animateMoon();

          setTimeout(() => {
            movePage(3);
          }, 4000);
        }, 900);
      }
    );
  }

  showContents() {
    const container =
      document.body.querySelector(
        "#third-input-container"
      );

    const isMobile =
      window.innerWidth < 768;

    if (isMobile) {
      container.style.top = `${
        (Math.floor(
          window.NUMBER_OF_ROW / 2
        ) -
          1.5) *
        window.TILE_SIZE
      }px`;
    } else {
      container.style.top = `${
        (Math.floor(
          window.NUMBER_OF_ROW / 2
        ) -
          1) *
        window.TILE_SIZE
      }px`;
      container.querySelector(
        "input"
      ).margin = "0px";
    }
    container.style.display = "flex";
  }

  hideContents() {
    const background =
      document.body.querySelector(
        "#third-input-container"
      );

    background.style.display = "none";
  }
}

customElements.define(
  "page-second",
  SecondPage
);
