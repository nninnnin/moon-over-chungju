class Layout extends HTMLElement {
  static PAGE_MAP = {
    0: "page-intro",
    1: "page-first",
    2: "page-second",
    3: "page-result",
    4: "page-error",
  };

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.state = {
      pageNumber: 0,
      selectedReceiver: null,
    };
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const pageComponent =
      Layout.PAGE_MAP[
        this.state.pageNumber
      ];

    this.shadowRoot.innerHTML = `
      <style>
      </style>

      ${
        this.state.pageNumber === 0 ||
        this.state.pageNumber === 3 ||
        this.state.pageNumber === 4
          ? ""
          : "<dialog-about></dialog-about>"
      }

      ${`<${pageComponent}></${pageComponent}>`}

      <error-modal>
        메시지 전송에 문제가 생겼습니다.<br/>
        다시 [전송하기] 버튼을 눌러주세요
      </error-modal>
    `;
  }

  setStateAndRerender(state) {
    this.state = {
      ...this.state,
      ...state,
    };

    this.render();
  }
}

window.customElements.define(
  "app-layout",
  Layout
);
