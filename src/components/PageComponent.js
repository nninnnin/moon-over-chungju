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
      x = `right: ${window.TILE_SIZE * x}px;`;
    } else {
      x = `left: ${window.TILE_SIZE}px;`;
    }

    if (y < 0) {
      y = `right: ${window.TILE_SIZE}px`;
    } else {
      y = `left: ${window.TILE_SIZE}px`;
    }

    return {
      x: xPosition,
      y: yPosition,
    };
  }
}
