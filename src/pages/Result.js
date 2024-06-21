class ResultPage extends PageComponent {
  constructor() {
    super();

    this.state = {
      barcodeLoaded: false,
      moonLoaded: false,
      captured: false,
    };
  }

  connectedCallback() {
    this.render();
    this.addListeners();

    setTimeout(() => {
      this.showElements();
    }, 3500);

    const cardContainer =
      this.shadowRoot.querySelector(
        "#card-container"
      );

    cardContainer.addEventListener(
      "animationend",
      () => {
        if (!this.state.captured) {
          this.renderCapturedCard();
        }
      }
    );

    (async () => {
      const moonImg =
        this.shadowRoot.querySelector(
          "#moon"
        );

      moonImg.onload = () => {
        this.state.moonLoaded = true;
      };

      await this.renderBarCode();
      this.state.barcodeLoaded = true;
    })();
  }

  showElements() {
    const buttons =
      this.shadowRoot.querySelectorAll(
        "button"
      );

    buttons.forEach((button) => {
      button.style.visibility =
        "visible";
    });

    const header =
      this.shadowRoot.querySelector(
        "#label-header"
      );

    header.style.visibility = "visible";
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        ${PageComponent.resetStyles}

        #background {
          width: 100vw;
          height: 100vh;

          position: fixed;
          left: 0;
          bottom: 0;
          z-index: -2;

          display: flex;
          justify-content: center;
          align-items: center;

          background-color: ${
            window.themeColor
          };
        }

        @keyframes growIn {
          0% {
            height: 0px;
          }

          100% {
            height: 80px;
          }
        }

        #gradient {
          width: 100vw;

          position: fixed;
          bottom: 0;
          left: 0;
          z-index: -1;

          background: linear-gradient(to top, black 30%, transparent);

          animation: growIn 0.7s forwards ease-in-out;
        }

        #container {
          width: 100vw;
          height: 100dvh;

          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;

          padding-top: ${
            window.TILE_SIZE * 0.5
          }px;
          padding-bottom: ${
            window.TILE_SIZE * 1.5
          }px;
        }

        .label {
          ${PageComponent.labelStyles}
        }

        #label-header {
          position: relative;
          background-color: blue;

          visibility: hidden;
          border: none;

          font-family: JTimeMachine;
          font-weight: medium;
          font-size: 20px;
          line-height: 160%;
          letter-spacing: -0.2em;

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
        }

        @keyframes driveIn {
          0% {
            transform: translateY(-500%);
          }

          100% {
            transform: translateY(0%);
          }
        }

        img {
          touch-action: auto !important;
        }

        #card-container {
          width: ${
            window.TILE_SIZE *
            (window.NUMBER_OF_COL - 2)
          }px;
          height: fit-content;

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
          width: 90%;
          height: 100%;

          display: block;
          margin: 0 auto;
        }

        #moon {
          width: 100%;
        }

        #button-container {
          position: relative;

          width: ${
            window.TILE_SIZE *
            (window.NUMBER_OF_COL - 2)
          }px;

          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        button {
          ${PageComponent.buttonStyles};
          position: relative;
          visibility: hidden;
        }

        #download-button {
          width: ${
            window.TILE_SIZE * 4
          }px;
          height: ${
            window.TILE_SIZE * 1
          }px;
        }

        #home-button {
          width: ${
            window.TILE_SIZE * 4
          }px;
          height: ${
            window.TILE_SIZE * 1
          }px;
        }
      </style>

      <div id='background'>
      </div>

      <div id='gradient'>
      </div>

      <div id='container'>
        <div class='label' id='label-header'>
          당신의 달이 떠올랐습니다.<br/>
          다운로드 버튼을 눌러 저장하세요.
        </div>

        <div id='card-container'>
          <div id='barcode-container'>
            <canvas id='barcode'></canvas>
          </div>

          <img id='moon' src='/public/images/card-moon.png' />
        </div>

        <div id='button-container'>
          <button id='home-button'>처음으로</button>
          <button id='download-button'>바코드 다운로드</button>
        </div>
      </div>
    `;
  }

  renderBarCode() {
    const barcodeCanvas =
      this.shadowRoot.querySelector(
        "#barcode"
      );

    return createBarcode(
      "id....",
      barcodeCanvas
    );
  }

  renderCapturedCard() {
    const cardContainer =
      this.shadowRoot.querySelector(
        "#card-container"
      );

    captureDom(cardContainer).then(
      (captureCanvas) => {
        const dataUrl =
          captureCanvas.toDataURL(
            "image/png"
          );

        const img = new Image();

        img.width =
          cardContainer.offsetWidth;
        img.height =
          cardContainer.offsetHeight;
        img.src = dataUrl;

        img.style.position = "absolute";
        img.style.top = "0px";
        img.style.left = "0px";
        img.style.zIndex = "999";

        cardContainer.appendChild(img);

        cardContainer.style.position =
          "relative";
        cardContainer.style.overflow =
          "hidden";

        const imageHeight =
          window.getComputedStyle(
            img
          ).height;
        const imageWidth =
          window.getComputedStyle(
            img
          ).width;

        cardContainer.style.width =
          imageWidth;
        cardContainer.style.height =
          imageHeight;

        cardContainer.style.overflow =
          "hidden";

        [...cardContainer.children]
          .filter((el) => el !== img)
          .forEach((el) => {
            el.remove();
          });

        this.state.captured = true;

        const canvas =
          document.querySelector(
            "canvas"
          );
        canvas.remove();
      }
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
        this.renderCapturedCard();
      }
    );

    const downloadButton =
      this.shadowRoot.querySelector(
        "#download-button"
      );

    downloadButton.addEventListener(
      "click",
      () => {
        const downloadImage =
          async () => {
            const cardContainer =
              this.shadowRoot.querySelector(
                "#card-container"
              );

            const data =
              await captureDom(
                cardContainer
              );

            const a =
              document.createElement(
                "a"
              );
            a.href = data;
            a.download = "card.png";
            a.click();
          };

        downloadImage();
      }
    );
  }
}

customElements.define(
  "page-result",
  ResultPage
);
