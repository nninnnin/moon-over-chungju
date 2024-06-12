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
    console.log(this.state);

    const pageComponent =
      PAGE_MAP[this.state.pageNumber];

    console.log(pageComponent);

    this.shadowRoot.innerHTML = `
      <style>
      </style>

      ${pageComponent}
    `;
  }
}

window.customElements.define(
  "app-layout",
  Layout
);
