function setup() {
  const canvas = createCanvas(
    window.innerWidth,
    window.innerHeight,
    WEBGL
  );

  window.addEventListener(
    "resize",
    () => {
      if (innerWidth < 768) {
        return;
      }

      resizeCanvas(
        window.innerWidth,
        window.innerHeight
      );

      const {
        tileSize,
        numberOfRow,
        numberOfCol,
        numberOfTiles,
      } = Tile.setTiles(width, height);

      // After set tiles, rerender components
      rerenderComponents();

      window.tiles = [
        ...Tile.initializeTiles(
          numberOfCol,
          numberOfTiles,
          tileSize
        ),
      ];
    }
  );

  angleMode(DEGREES);
  blendMode(BLEND);

  rerenderComponents();
}

function draw() {
  clear();

  ortho(
    -width / 2,
    width / 2,
    -height / 2,
    height / 2,
    100,
    1000
  );

  // orbitControl();

  if (!window.tiles) return;

  window.tiles.forEach((tile) => {
    tile.checkIsHovered();

    // if (tile.animatingPunching) {
    //   perspective();
    // } else {
    //   ortho(
    //     -width / 2,
    //     width / 2,
    //     -height / 2,
    //     height / 2,
    //     100,
    //     1000
    //   );
    // }

    ortho(
      -width / 2,
      width / 2,
      -height / 2,
      height / 2,
      100,
      1000
    );

    // perspective();

    tile.draw();
  });
}
