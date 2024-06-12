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
    let xPosition;
    let yPosition;

    if (x < 0) {
      xPosition = `right: ${
        window.TILE_SIZE * Math.abs(x)
      }px;`;
    } else {
      xPosition = `left: ${
        window.TILE_SIZE * Math.abs(x)
      }px;`;
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
}
