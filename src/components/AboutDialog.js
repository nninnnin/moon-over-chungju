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
          <청주에 뜬 달>
        </header>

        <div>
          <div>
            통합 청주시 10주년을 기념하여, 시민 참여 워크숍을 기반한 실감 미디어 아트전 <청주에 뜬 달>을 선보입니다. 이번 전시에서 ‘달’은 시민들과 상호작용을 통해 과거와 현재, 미래를 연결하는 매개체가 됩니다. 시민들의 참여로 보내진 수많은 메시지는 전시장 미디어월에 달과 함께 떠오릅니다. 메시지는 전시기간동안 계속해서 축적되어 하나의 거대한 물결을 만들어 냅니다.

            <br/>
            <br/>

            예로부터 선조들은 보름달 아래에서 소원을 빌었습니다. 달은 어두운 밤하늘에 길을 잃지 않게 해주는 안내자였고, 미래를 향해 우리의 꿈을 비추는 등불이었습니다. <청주에 뜬 달> 웹사이트에서 시민들이 보낸 메시지는 미디어월에 실시간으로 보여지고, 시간과 공간을 초월해 서로의 소망과 희망을 하나로 이어줍니다. 과거와 현재, 그리고 미래 세대를 연결하며 다양한 꿈과 희망이 담겨 있는 달을 보며 빛나는 경험이 되기를 바랍니다.
          </div>
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

        <div>
          작품 체험 방법

          <ul>
            <li>당신의 희망과 소원을 담은 메시지를 달에게 보내보세요.</li>
            <li>청주시립미술관을 방문하여 저장된 바코드를 통해 미디어월에 당신의 메시지를 띄어주세요.</li>
            <li>물결에 일렁이는 다른 이들의 빛나는 소망을 살펴보세요.</li>
          </ul>
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
        }

        #contents {
          position: fixed;
          top: 0;
          right: 0;
          z-index: 9998;

          width: 93vw;
          height: ${
            window.TILE_SIZE *
            (window.NUMBER_OF_ROW - 2)
          }px;

          border: 1px solid black;
          border-top: 0px;
          border-right: 0px;
          padding: 1em;

          overflow: scroll;
          background: linear-gradient(to top, black, transparent 48px), #dadada;

          padding-bottom: 3em;
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

        #contents > div {
          margin-bottom: 60px;
        }

        .logo {
          height: 24px;
        }

        ul {
          list-style: decimal;
          margin-top: 0;
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
