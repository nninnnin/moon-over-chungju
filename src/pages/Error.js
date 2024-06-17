class Result extends PageComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        div {
          width: 100vw;
          height: 100vh;

          display: flex;
          justify-content: center;
          align-items: center;

          background-color: violet;
        }
      </style>

      <div>
        Error..
      </div>
    `;
  }
}

customElements.define(
  "page-error",
  Result
);
