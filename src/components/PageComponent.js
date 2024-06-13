class PageComponent extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({
      mode: "open",
    });
  }

  connectedCallback() {
    this.render();
  }

  render() {}

  createTilePosition(x, y) {
    if (isNaN(x) || isNaN(y)) {
      return;
    }

    let xPosition;
    let yPosition;

    if (x < 0) {
      xPosition = `right: ${
        window.TILE_SIZE * Math.abs(x)
      }px`;
    } else {
      xPosition = `left: ${
        window.TILE_SIZE * Math.abs(x)
      }px`;
    }

    if (y < 0) {
      yPosition = `bottom: ${
        window.TILE_SIZE * Math.abs(y)
      }px`;
    } else {
      yPosition = `top: ${
        window.TILE_SIZE * Math.abs(y)
      }px`;
    }

    return {
      x: xPosition,
      y: yPosition,
    };
  }

  static labelStyles = `
    box-sizing: border-box;
    background-color: turquoise;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    white-space: nowrap;
    overflow: hidden;
    padding-left: 0.2em;

    position: fixed;
    z-index: 9999;

    border: 0.5px solid rgba(0, 0, 0, 0.8);
    filter: blur(0.2px);

    font-family: JTimeMachine;
    font-weight: 700;
    font-size: 20px;
    letter-spacing: -0.2em;

    cursor: pointer;

    transition: 0.5s;
  `;

  static buttonStyles = `
    position: fixed;
    z-index: 9999;

    font-size: 1em;
    white-space: nowrap;

    touch-action: manipulation;
    user-select: none;
    -webkit-user-select: none;

    box-sizing: border-box;

    border: none;
    outline: none;
    background-color: black;
    color: white;

    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    font-family: JTimeMachine;
    font-weight: 500;
    font-size: 20px;
    letter-spacing: -0.2em;
  `;
}
