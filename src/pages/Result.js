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
    if (!window.tiles) {
      const {
        tileSize,
        numberOfCol,
        numberOfTiles,
      } = Tile.setTiles(window.tiles);

      window.tiles =
        Tile.initializeTiles(
          numberOfCol,
          numberOfTiles,
          tileSize
        );
    }

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

      await this.renderBarCode(
        window.createdId
      );

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
            height: 0vh;
          }

          100% {
            height: 9.5vh;
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

          padding-top: 20px;
          padding-bottom: 5vh;

          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
        }

        .label {
          ${PageComponent.labelStyles}
        }

        #label-header {
          position: relative;

          visibility: hidden;
          border: none;
          background-color: transparent;

          font-family: JTimeMachine;
          font-weight: medium;
          font-size: min(3vh, 20px);
          line-height: 160%;
          letter-spacing: -0.2em;

          text-align: center;
          justify-content: center;
          align-items: center;

          height: ${
            NUMBER_OF_ROW *
            0.1 *
            TILE_SIZE
          }px;
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
          -webkit-touch-callout: default !important;
        }

        #card-container {
          width: 85vw;
          height: calc(85vw * 1.36);

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          animation: driveIn 3s forwards ease-out;

          touch-action: auto !important;
          -webkit-touch-callout: default !important;
        }

        @media (min-width: 768px) {
          #card-container {
            width: calc(${
              NUMBER_OF_ROW *
              0.6 *
              TILE_SIZE
            }px * 0.73);

            height: ${
              NUMBER_OF_ROW *
              0.6 *
              TILE_SIZE
            }px;

            
            max-width: calc(60vh * 0.73);
            max-height: 60vh;
          }

          #moon {
            min-height: width: calc(${
              NUMBER_OF_ROW *
              0.6 *
              TILE_SIZE
            }px * 0.73);

            max-height: calc(60vh * 0.73);
          }
        }

        #barcode-container {
          flex: 1;
          width: 100%;
          background-color: white;

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
          min-height: 85vw;
        }

        #button-container {
          position: relative;

          width: 85vw;
          height: ${
            NUMBER_OF_ROW *
            0.1 *
            TILE_SIZE
          }px;

          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        #button-container > button:first-child {
          margin-right: 18px;
        }

        #button-container > button:nth-child(2) {
          margin-left: 18px;
        }

        @media (min-width: 768px) {
          #button-container {
            max-width: 60vh;
          }

          #button-container > button:first-child {
            margin-right: 10px;
          }

          #button-container > button:nth-child(2) {
            margin-left: 10px;
          }
        }

        button {
          ${PageComponent.buttonStyles};
          position: relative;
          visibility: hidden;

          font-size: min(3vh, 20px);
        }

        #download-button {
          flex: 1;
          height: ${
            window.TILE_SIZE * 1
          }px;
        }

        #download-button:disabled {
          background-color: #c3c3c3;
        }

        #home-button {
          flex: 1;
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
          바코드 이미지를 꾹 눌러 저장하세요.
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

  renderBarCode(payload) {
    console.log(
      "payloads be like..",
      payload
    );

    const barcodeCanvas =
      this.shadowRoot.querySelector(
        "#barcode"
      );

    return createBarcode(
      payload,
      barcodeCanvas
    );
  }

  renderCapturedCard() {
    if (
      !this.state.barcodeLoaded ||
      !this.state.moonLoaded
    ) {
      setTimeout(() => {
        console.log(
          "Things are not ready to be captured."
        );
        this.renderCapturedCard();
      }, 100);

      return;
    }

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
        window.location.href = "/";
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
            const container =
              this.shadowRoot.querySelector(
                "#card-container"
              );

            const image =
              container.querySelector(
                "img"
              );

            captureDom(image).then(
              (captureCanvas) => {
                captureCanvas.toBlob(
                  (blob) => {
                    const dataUrl =
                      URL.createObjectURL(
                        blob
                      );

                    const a =
                      document.createElement(
                        "a"
                      );

                    a.href = dataUrl;
                    a.download =
                      "moon.png";
                    a.click();
                  }
                );
              }
            );
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
