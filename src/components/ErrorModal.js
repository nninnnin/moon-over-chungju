class ErrorModal extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.addListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        ${PageComponent.resetStyles}

        * {
          font-family: JTimeMachine;
          font-weight: 500;
          text-align: center;

          line-height: 160%;
          font-size: 20px;
          letter-spacing: -0.18em;

          box-sizing: border-box;
        }

        #container {
          width: 100vw;
          height: 196px;
  
          position: fixed;
          bottom: 0;
          left: 0;
          z-index: 9999;
  
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
  
          padding: 16px;

          background-color: black;
          color: #dadada;

          display: none;
        }

        button {
          width: 180px;
          height: 36px;

          border: 0.5px solid white;
          color: white;
          background-color: black;

          display: flex;
          justify-content: center;
          align-items: center;

          margin-bottom: 24px;

          cursor: pointer;
        }
      </style>

      <div id='container'>
        <div id='message'>
          <slot></slot>
        </div>

        <button>확인</button>
      </div>

    `;
  }

  addListeners() {
    const button =
      this.shadowRoot.querySelector(
        "button"
      );

    button.addEventListener(
      "click",
      () => {
        this.remove();
      }
    );
  }
}

window.customElements.define(
  "error-modal",
  ErrorModal
);
