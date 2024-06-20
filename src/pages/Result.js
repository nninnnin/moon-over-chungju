class ResultPage extends PageComponent {
  constructor() {
    super();

    this.state = {
      barcodeLoaded: false,
      moonLoaded: false,
      logoLoaded: false,
    }
  }

  connectedCallback() {
    this.render();
    this.addListeners();

    (async () => {
      await this.renderBarCode();

      this.state.barcodeLoaded = true;

      const cardCont =
        this.shadowRoot.querySelector(
          "#card-container"
        );

      cardCont.addEventListener(
        "animationend",
        () => {
          setTimeout(() => {
            this.renderCapturedCard();
          }, 500)
        }
      );

      const images = cardCont.querySelectorAll('img')
      console.log(images);

      images.forEach(img => {
        img.addEventListener('load', (e) => {
          console.log("img is loaded", e.target.id)
          if (e.target.id === 'moon') {
            this.state.moonLoaded = true;
          }

          if (e.target.id === 'card-logo') {
            this.state.logoLoaded = true;
          }
        })
      })
    })();
  }

  render() {
    const MIDDLE_COL_INDEX = Math.floor(
      window.NUMBER_OF_COL / 2
    );

    setTimeout(() => {
      const buttons =
        this.shadowRoot.querySelectorAll(
          "button"
        );

      buttons.forEach((button) => {
        button.style.visibility = "visible";
      });

      const header =
        this.shadowRoot.querySelector(
          "#label-header"
        );

      header.style.visibility = "visible";
    }, 3500);

    this.shadowRoot.innerHTML = `
      <style>
        ${PageComponent.resetStyles}

        #container {
          width: 100vw;
          height: 100dvh;

          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;

          padding-top: ${window.TILE_SIZE}px;
          padding-bottom: ${window.TILE_SIZE}px;

          background: linear-gradient(to top, black, transparent 80px), ${
            window.themeColor
          };
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
          width: ${window.TILE_SIZE * (window.NUMBER_OF_COL - 2)}px;
          height: fit-content;

          background-color: red;

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

        #moon {
          width: 100%;
        }

        #button-container {
          position: relative;

          width: ${window.TILE_SIZE * (window.NUMBER_OF_COL - 2)}px;

          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        button {
          ${PageComponent.buttonStyles};
          position: relative;
          visibility: hidden;
        }

        #about-button {
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
          <button id='about-button'>전시소개</button>
          <button id='home-button'>처음으로</button>
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
      (data) => {
        console.log(
          "captured card:",
          data
        );

        const image = new Image();
        image.width =
          cardContainer.offsetWidth;
        image.height =
          cardContainer.offsetHeight;
        image.src = data;

        cardContainer.innerHTML = ``;
        cardContainer.appendChild(
          image
        );

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
        window.location.reload();
      }
    );
  }
}

customElements.define(
  "page-result",
  ResultPage
);
