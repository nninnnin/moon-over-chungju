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
    window.tiles.forEach((tile) => {
      tile.resetAnimatingStack();
    });

    this.animateTiles();

    setTimeout(() => {
      this.render();

      window.tiles.forEach((tile) => {
        tile.resetPunching();
      });
    }, 2500);
  }

  prerender() {
    this.shadowRoot.innerHTML = `
      <style>
        #moon {
          width: 60px;
          height: 60px;
        }

        #third-page-background {
          width: 100vw;
          height: 100dvh;

          position: fixed;
          left: 0;
          top: 0;
          z-index: -1;

          background-color: #01a29b;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        #message-input {
          background-color: white;

          width: 300px;
          height: 28px;

          margin: 34px 0px;

          font-family: JTimeMachine;
          font-weight: 700;
          font-size: 20px;

          border: none;
          outline: none;
        }

        #message-input::placeholder {
          text-align: center;
        }

        /* or, for legacy browsers */

        #message-input::-webkit-input-placeholder {
          text-align: center;
        }

        :-moz-placeholder {
          /* Firefox 18- */
          text-align: center;
        }

        #message-input::-moz-placeholder {
          /* Firefox 19+ */
          text-align: center;
        }

        #message-input:-ms-input-placeholder {
          text-align: center;
        }

        #dummy-box {
          width: 60px;
          height: 60px;
        }
      </style>

      <div id='third-page-background'>
        <img
          id='moon'
          src='/public/images/moon/${
            moons[window.moonIndex]
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
          background-color: #01A29B;

          width: 100vw;
          height: 100dvh;

          position: fixed;
          top: 0;
          left: 0;
        }
      </style>

      <div id='background'>
      </div>

      <img id='logo' src='/public/images/logo--intro.svg' />

      <div class='label' id='label-first'>
        10년 후
      </div>

      <div class='label' id='label-second'>
        ${selectedReceiver}
      </div>

      <div class='label' id='label-third'>
        에게 어떤 말을 전하고 싶나요?
      </div>

      <button id='submit-button'>전송하기</button>
    `;

    this.addListeners();

    this.teleportBackground();
  }

  addListeners() {
    this.addButtonListeners();
  }

  addButtonListeners() {
    //
  }

  teleportBackground() {
    const background =
      document.body.querySelector(
        "#third-input-container"
      );

    background.querySelector(
      "img"
    ).src = `/public/images/moon/${
      moons[window.moonIndex]
    }.svg`;

    background.style.display = "flex";
  }
}

customElements.define(
  "page-third",
  ThirdPage
);
