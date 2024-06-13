const PAGE_MAP = {
  0: `<page-intro>`,
  1: `<page-first>`,
  2: `<page-second>`,
  3: `<page-third>`,
};

class Layout extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.state = {
      pageNumber: 0,
    };
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const pageComponent =
      PAGE_MAP[this.state.pageNumber];

    this.shadowRoot.innerHTML = `
      <style>
      </style>

      ${pageComponent}
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
