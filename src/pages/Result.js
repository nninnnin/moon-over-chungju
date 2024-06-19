class ResultPage extends PageComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.renderBarCode();

    this.addListeners();
  }

  render() {
    const MIDDLE_COL_INDEX = Math.floor(
      window.NUMBER_OF_COL / 2
    );

    const headerPosition =
      this.createTilePosition(1, 1);

    const cardPoisiton =
      this.createTilePosition(1, 3.5);

    const aboutButtonPosition =
      this.createTilePosition(
        MIDDLE_COL_INDEX - 4,
        window.NUMBER_OF_ROW - 2.5
      );

    const homeButtonPosition =
      this.createTilePosition(
        MIDDLE_COL_INDEX + 1,
        window.NUMBER_OF_ROW - 2.5
      );

    setTimeout(() => {
      const buttons =
        this.shadowRoot.querySelectorAll(
          "button"
        );

      buttons.forEach((button) => {
        button.style.display = "flex";
      });

      const header =
        this.shadowRoot.querySelector(
          "#label-header"
        );

      header.style.display = "flex";
    }, 3500);

    this.shadowRoot.innerHTML = `
      <style>
        #container {
          width: 100vw;
          height: 100vh;

          display: flex;
          justify-content: center;
          align-items: center;

          background-color: ${
            window.themeColor
          };
        }

        .label {
          ${PageComponent.labelStyles}
        }

        #label-header {
          display: none;
          border: none;

          font-family: JTimeMachine;
          font-weight: bold;
          font-size: 20px;
          line-height: 160%;

          text-align: center;
          justify-content: center;
          align-items: center;

          width: ${
            window.TILE_SIZE * 9
          }px;
          height: ${
            window.TILE_SIZE * 2
          }px;
          background-color: transparent;

          left: 50%;
          transform: translateX(-50%);
          ${headerPosition.y};
        }

        @keyframes driveIn {
          0% {
            transform: translateY(-500%);
          }

          100% {
            transform: translateY(0);
          }
        }

        #card-container {
          width: ${
            window.TILE_SIZE * 9
          }px;
          height: ${
            window.TILE_SIZE *
            (window.NUMBER_OF_ROW - 7)
          }px;

          position: fixed;
          ${cardPoisiton.y};
          z-index: 9999;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          animation: driveIn 3s forwards ease-out;
        }

        #barcode-container {
          background-color: white;
          width: 100%;
          height: ${
            window.TILE_SIZE * 4
          }px;

          display: flex;
          justify-content: center;
          align-items: center;
        }

        #barcode {
          width: 100%;
          height: 100%;

          display: block;
        }

        #moon-container {
          width: 100%;
          height: ${
            window.TILE_SIZE * 9
          }px;

          position: relative;
          background: linear-gradient(0deg, black, transparent 20%), #ffd56c;

          overflow: hidden;
        }

        #moon-container #moon {
          width: 100%;
          height: auto;

          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        #moon-container #card-logo {
          position: absolute;
          bottom: 64px;
          left: 50%;
          transform: translateX(-50%);

          width: 90%;
        }

        #moon-container #card-description {
          position: absolute;
          top: 25%;
          left: 50%;
          transform: translateX(-50%);

          text-align: center;
          font-size: 14px;
          font-family: JTimeMachine;
          font-weight: 500;
          letter-spacing: -0.27em;

          color: black;

          white-space: nowrap;
        }

        button {
          ${PageComponent.buttonStyles};
          display: none;
        }

        #about-button {
          width: ${
            window.TILE_SIZE * 4
          }px;
          height: ${
            window.TILE_SIZE * 1
          }px;

          ${aboutButtonPosition.x};
          ${aboutButtonPosition.y};
        }

        #home-button {
          width: ${
            window.TILE_SIZE * 4
          }px;
          height: ${
            window.TILE_SIZE * 1
          }px;

          ${homeButtonPosition.x};
          ${homeButtonPosition.y};
        }
      </style>

      <div id='container'>
        <div class='label' id='label-header'>
          당신의 달이 떠올랐습니다.<br/>
          바코드 이미지를 꾹 눌러 저장하세요.
        </div>

        <div id='card-container'>
          <div id='barcode-container'>
            <canvas id='barcode'></canvas>
          </div>

          <div id='moon-container'>
            <img id='moon' src='/public/images/last-moon.png' />

            <img id='card-logo' src='/public/images/card-logo.svg' />

            <div id='card-description'>
              청주시립미술관에 방문하여<br/>
              나의 달을 찾아보세요
            </div>
          </div>
        </div>

        <button id='about-button'>전시소개</button>
        <button id='home-button'>처음으로</button>
      </div>
    `;
  }

  renderBarCode() {
    const barcodeCanvas =
      this.shadowRoot.querySelector(
        "#barcode"
      );

    createBarcode(
      "id....",
      barcodeCanvas
    );
  }

  addListeners() {
    const homeButton =
      this.shadowRoot.querySelector(
        "#home-button"
      );

    homeButton.addEventListener(
      "click",
      () => {
        window.location.reload();
      }
    );
  }
}

customElements.define(
  "page-result",
  ResultPage
);
