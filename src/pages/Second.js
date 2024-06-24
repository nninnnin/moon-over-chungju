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
    const isMobile =
      window.innerWidth < 768;

    const MIDDLE_COL_INDEX = Math.floor(
      window.NUMBER_OF_COL / 2
    );

    const firstLabelPosition =
      this.createTilePosition(
        isMobile
          ? 2
          : MIDDLE_COL_INDEX - 4,
        2
      );

    const secondLabelPosition =
      this.createTilePosition(
        isMobile
          ? 5
          : MIDDLE_COL_INDEX - 1,
        3
      );

    const thirdLabelPosition =
      this.createTilePosition(
        isMobile
          ? window.NUMBER_OF_COL - 1 - 8
          : MIDDLE_COL_INDEX - 2,
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
          border-left: 0px;
          border-top: 0px;
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
            window.TILE_SIZE * 4
          }px;
          height: ${window.TILE_SIZE}px;

          ${secondLabelPosition.x};
          ${secondLabelPosition.y};
          font-size: 20px;

          background-color: ${
            window.themeColor
          };
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
        10년 후의
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
    this.addLogoListener();
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

    const activateSpinner = () => {
      const spinner =
        document.querySelector(
          "#spinner"
        );

      spinner.style.width = `${window.TILE_SIZE}px`;
      spinner.style.height = `${window.TILE_SIZE}px`;

      spinner.style.left = `50%`;
      spinner.style.top = `calc(50% + ${
        window.TILE_SIZE * 1.5
      }px)`;

      spinner.style.transform = `translate(-50%, -50%)`;

      spinner.style.display = "block";
    };

    const removeSpinner = () => {
      const spinner =
        document.querySelector(
          "#spinner"
        );

      spinner.style.display = "none";
    };

    const submitButton =
      this.shadowRoot.querySelector(
        "#button--submit"
      );

    submitButton.addEventListener(
      "click",
      async () => {
        activateSpinner();

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

          MessageInput.disabled = true;

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

        try {
          const response =
            await submit();

          // 스피너 제거
          removeSpinner();

          console.log(
            "submit response",
            response
          );

          const succeed =
            response &&
            (response.statusCode ===
              200 ||
              response.statusCode ===
                201);

          if (!succeed) {
            const AppLayout =
              document.querySelector(
                "app-layout"
              );

            AppLayout.shadowRoot
              .querySelector(
                "error-modal"
              )
              .shadowRoot.querySelector(
                "#container"
              ).style.display = "flex";

            return;
          } else {
            window.createdId =
              response.body;
          }

          // 1. 엘리먼트 사라지기
          hideElements();

          // 2. 메시지 페이드아웃
          const input =
            document.getElementById(
              "message-input"
            );

          input.classList.add(
            "fadeout"
          );

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
        } catch (error) {
          console.error(
            "submit error",
            error
          );

          removeSpinner();

          const AppLayout =
            document.querySelector(
              "app-layout"
            );

          AppLayout.shadowRoot.querySelector(
            "error-modal"
          ).style.display = "block";

          return;
        }
      }
    );
  }

  showContents() {
    const container =
      document.body.querySelector(
        "#third-input-container"
      );

    container.style.height =
      window.TILE_SIZE * 4 + "px";
    container.querySelector(
      'input[type="text"]'
    ).style.height =
      window.TILE_SIZE * 2 + "px";
    container.style.top = `${
      (Math.floor(
        window.NUMBER_OF_ROW / 2
      ) -
        2) *
      window.TILE_SIZE
    }px`;

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
