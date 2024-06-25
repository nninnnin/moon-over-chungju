class AboutDialog extends PageComponent {
  constructor() {
    super();

    this.state = {
      opened: false,
    };
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (!window.NUMBER_OF_COL) return;

    window.ignoreHover =
      this.state.opened;

    const WIDTH_TILE_SPAN = 2;

    const containerPosition =
      this.createTilePosition(
        window.NUMBER_OF_COL -
          WIDTH_TILE_SPAN,
        0
      );

    const contents = `
      <div id='contents'>
        <header>
          시민참여 실감 미디어 아트전
          <br/>
          <span>≪청주에 뜬 달≫</span>
        </header>

        <div>
          오랜 세월 동안 우리 선조들은 보름달 아래에서 소원을 빌었습니다. 달은 어두운 밤하늘에 길을 잃지 않게 해주는 안내자였고, 미래를 향해 우리의 꿈을 비추는 등불이었습니다. 통합 청주시 출범 10주년을 기념하여 개최하는 시민 참여 워크숍 기반 실감 미디어 아트전 <span>《청주에 뜬 달》에서</span> ‘달’은 시민들의 참여를 통해 과거―현재―미래 세대를 연결하는 매개가 됩니다.

          <br/>
          <br/>

          <span>《청주에 뜬 달》</span> 웹사이트에서 시민들이 보낸 수많은 메시지는 강익중 작가의 ‘강익중체’가 적용되어 전시장 미디어월에 달과 함께 떠오릅니다. 다채로운 소망을 담은 메시지는 시공간을 초월해 전시 기간 동안 하나의 거대한 물결을 만들어 냅니다. 다양한 이들의 소망이 서로를 응원하고 모두의 빛나는 경험으로 이어질 수 있기를 바랍니다.
        </div>

        <div>
          미디어 체험 방법

          <ul>
            <li>QR코드를 인식해 <span>《청주에 뜬 달》</span> 웹사이트에 접속하세요.</li>
            <li>10년 후 전해질 당신의 소망을 달에게 담아보세요.</li>
            <li>달에게 받은 바코드 이미지를 꾹 눌러 저장하세요.</li>
            <li>청주시립미술관에 방문하여 나의 달을 찾아보세요.</li>
          </ul>
        </div>

        <div>
          참여작가: 레벨나인
          <br/>
          일시: 2024. 7. 4.(목) - 9. 29.(일)
          <br/>
          장소: 청주시립미술관 1층 실감영상체험관

          <div style='display: flex; margin-top: 12px;'>
            <img class='logo' src='/public/images/logo--cj.svg' style='margin-right: 20px' />
            <img class='logo' src='/public/images/logo--cjart.svg' />
          </div>
        </div>
      </div>
    `;

    this.shadowRoot.innerHTML = `
      <style>
        * {
          box-sizing: border-box;
        }

        #trigger {
          ${PageComponent.labelStyles}

          width: ${
            window.TILE_SIZE *
            WIDTH_TILE_SPAN
          }px;
          height: ${window.TILE_SIZE}px;
          z-index: 9999;

          ${containerPosition.x};
          ${containerPosition.y};

          display: flex;
          align-items: center;
          justify-content: center;

          border: 0.5px solid black;
          border-top: 0px;
          border-right: 0px;
        }

        #contents {
          position: fixed;
          top: 0;
          right: 0;
          z-index: 9998;

          width: 93vw;
          max-width: 540px;
          height: ${
            window.TILE_SIZE *
            (window.NUMBER_OF_ROW - 2)
          }px;

          border: 0.5px solid black;
          border-top: 0px;
          border-right: 0px;
          padding: 1em;

          overflow: scroll;
          background: linear-gradient(to top, black, transparent 48px), #dadada;

          padding-bottom: 3em;
        }

        /* Hide scrollbar for Chrome, Safari and Opera */
        #contents::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        #contents {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }

        #contents * {
          font-family: JTimeMachine;
          font-weight: 500;
          font-size: 16px;
          line-height: 170%;
          letter-spacing: -0.25em;

          word-break: keep-all;
          -webkit-font-smoothing: auto;
          text-rendering: optimizeLegibility;
        }

        #contents header {
          margin-bottom: 60px;
        }

        #contents span {
          display: inline-block;
        }

        #contents > div {
          margin-bottom: 60px;
        }

        .logo {
          height: 24px;
        }

        ul {
          list-style: decimal;
          margin: 0;
          padding-left: 1em;
        }
      </style>

      <div id='trigger'>
        <img
          id='trigger-icon'
          src=${
            this.state.opened
              ? "/public/images/menu-close.svg"
              : "/public/images/hamburger.svg"
          }
        />
      </div>

      ${
        this.state.opened
          ? contents
          : ""
      }
    `;

    this.addListeners();
  }

  addListeners() {
    const triggerButton =
      this.shadowRoot.querySelector(
        "#trigger"
      );

    triggerButton.addEventListener(
      "click",
      () => {
        this.setState({
          opened: !this.state.opened,
        });

        this.render();
      }
    );

    if (!this.state.opened) {
      this.addInteractionPreventer();
    }
  }

  addInteractionPreventer() {
    const triggerButton =
      this.shadowRoot.querySelector(
        "#trigger"
      );

    triggerButton.addEventListener(
      "mouseover",
      () => {
        window.ignoreHover = true;
      }
    );

    triggerButton.addEventListener(
      "mouseleave",
      () => {
        window.ignoreHover = false;
      }
    );

    triggerButton.addEventListener(
      "pointerover",
      () => {
        window.ignoreHover = true;
      }
    );

    triggerButton.addEventListener(
      "pointerout",
      () => {
        window.ignoreHover = false;
      }
    );
  }

  setState(newState) {
    window.ignoreHover = false;

    this.state = {
      ...this.state,
      ...newState,
    };
  }
}

customElements.define(
  "dialog-about",
  AboutDialog
);
