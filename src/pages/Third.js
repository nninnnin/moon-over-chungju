const moons = [
  "new-moon",
  "waxing-crescent",
  "first-quarter",
  "waxing-gibbous",
  "full-moon",
  "waning-gibbous",
  "last-quarter",
  "waning-crescent",
];

class ThirdPage extends PageComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    const canvas =
      document.querySelector("canvas");

    if (!canvas) return;

    if (!window.tiles?.length) {
      const {
        tileSize,
        numberOfCol,
        numberOfTiles,
      } = Tile.setTiles();

      window.tiles =
        Tile.initializeTiles(
          numberOfCol,
          numberOfTiles,
          tileSize
        );
    }

    window.tiles.forEach((tile) => {
      tile.resetAnimatingStack();
    });

    this.animateTiles();

    setTimeout(() => {
      this.render();
    }, 2500);
  }

  prerender() {
    this.shadowRoot.innerHTML = `
      <style>
        #moon {
          width: 60px;
          height: 60px;
        }

        #third-input-container {
          width: 100vw;
          height: fit-content;

          position: fixed;
          left: 0;
          top: 50%;
          transform: translateY(-46%);
          z-index: -1;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        #message-input {
          width: 300px;
          height: 28px;

          margin: 34px 0px;

          font-family: JTimeMachine;
          font-weight: 700;
          font-size: 18px;
          text-align: center;
          letter-spacing: -0.2em;

          border: none;
          outline: none;
          background-color: transparent;
        }

        #message-input::placeholder {
          text-align: center;
          color: rgba(0, 0, 0, 0.4);
        }

        /* or, for legacy browsers */

        #message-input::-webkit-input-placeholder {
          text-align: center;
          color: rgba(0, 0, 0, 0.4);
        }

        :-moz-placeholder {
          /* Firefox 18- */
          text-align: center;
          color: rgba(0, 0, 0, 0.4);
        }

        #message-input::-moz-placeholder {
          /* Firefox 19+ */
          text-align: center;
          color: rgba(0, 0, 0, 0.4);
        }

        #message-input:-ms-input-placeholder {
          text-align: center;
          color: rgba(0, 0, 0, 0.4);
        }

        #dummy-box {
          width: 60px;
          height: 60px;
        }

        @keyframes moon-centering {
          0% {
            transform: translateY(0%)
              scale(1);
          }
          100% {
            transform: translateY(40%)
              scale(3);
          }
        }

        @keyframes moon-fly {
          0% {
            transform: translateY(40%)
              scale(3);
          }
          100% {
            transform: translateY(-2000%)
              scale(3);
          }
        }

        .moon-centering {
          animation: moon-centering 1s
            forwards;
        }

        .moon-fly {
          animation: moon-fly 3s forwards;
        }

        #background {
          background-color: ${
            window.themeColor
          };

          width: 100vw;
          height: 100dvh;

          position: fixed;
          top: 0;
          left: 0;
          z-index: -1;
        }
      </style>

      <div id='background'></div>

      <div id='third-input-container'>
        <img
          id='moon'
          src='/public/images/moon/${
            moons[window.moonIndex] ??
            "waxing-crescent"
          }.svg'
        />

        <input
          id='message-input'
          type='text'
          placeholder='10자 이내로 입력해주세요!'
        />

        <div id='dummy-box'></div>
      </div>
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

    const submitButtonStyle =
      this.createTilePosition(
        MIDDLE_COL_INDEX - 2,
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

        #submit-button {
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
          height: 100vh;

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
        ${selectedReceiver ?? "나"}
      </div>

      <div class='label' id='label-third'>
        에게 어떤 말을 전하고 싶나요?
      </div>

      <button id='submit-button'>전송하기</button>
    `;

    this.addListeners();

    this.showContents();
  }

  addListeners() {
    this.addButtonListeners();
  }

  addButtonListeners() {
    const submitButton =
      this.shadowRoot.querySelector(
        "#submit-button"
      );

    submitButton.addEventListener(
      "click",
      async () => {
        const submit = async () => {
          const AppLayout =
            document.querySelector(
              "app-layout"
            );

          const MessageInput =
            document.querySelector(
              "#message-input"
            );

          console.log(
            "input element",
            MessageInput
          );

          // const keyword =
          //   AppLayout.state
          //     .selectedReceiver;
          // const moonType =
          //   moons[window.moonIndex];

          const keyword = "나";
          const moonType =
            "waxing-crescent";
          const message =
            MessageInput.value;

          const payload = {
            keyword,
            moonType,
            message,
          };

          return await requestLambda(
            payload
          );
        };

        const hideElements = () => {
          const elements = [
            document.querySelector(
              "#third-input-container"
            ),
            this.shadowRoot.querySelector(
              "#logo"
            ),
            ...this.shadowRoot.querySelectorAll(
              ".label"
            ),
            document.getElementById(
              "message-input"
            ),
            document.getElementById(
              "dummy-box"
            ),
            submitButton,
          ];

          elements.forEach((el) => {
            if (!el) return;

            el.style.display = "none";
          });
        };

        const collapseTiles = () => {
          window.tiles.forEach(
            (tile) => {
              tile.setToBeCollapse();
            }
          );
        };

        const animateMoon = (cb) => {
          this.prerender();

          this.shadowRoot.getElementById(
            "dummy-box"
          ).style.visibility = "hidden";

          this.shadowRoot.getElementById(
            "message-input"
          ).style.visibility = "hidden";

          setTimeout(() => {
            const moon =
              this.shadowRoot.getElementById(
                "moon"
              );

            moon.classList.add(
              "moon-centering"
            );

            setTimeout(() => {
              moon.classList.add(
                "moon-fly"
              );

              setTimeout(() => {
                cb();
              }, 3000);
            }, 2000);
          }, 2000);
        };

        const movePage = (
          pageNumber
        ) => {
          const AppLayout =
            document.querySelector(
              "app-layout"
            );

          AppLayout.setStateAndRerender(
            {
              pageNumber,
            }
          );
        };

        hideElements();
        collapseTiles();

        const result = await submit();

        console.log(
          "submit result..",
          result
        );

        animateMoon(() => {
          if (!result) {
            // 실패 페이지로 이동
            movePage(5);

            return;
          }

          movePage(4);
        });
      }
    );
  }

  showContents() {
    const background =
      document.body.querySelector(
        "#third-input-container"
      );

    background.querySelector(
      "img"
    ).src = `/public/images/moon/${
      moons[window.moonIndex] ??
      "waxing-crescent"
    }.svg`;

    background.style.display = "flex";
  }
}

customElements.define(
  "page-third",
  ThirdPage
);
