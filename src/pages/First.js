class First extends PageComponent {
  constructor() {
    super();
  }

  render() {
    this.shadowRoot.innerHTMl = `
      <style>
      </style>

      <div>
        스텝 원
      </div>
    `;
  }
}

customElements.define("page-first", First);
