class Tile {
  constructor(
    x,
    y,
    size,
    rowIndex,
    colIndex
  ) {
    this.x = x;
    this.y = y;
    this.z = 0;
    this.size = size;

    this.rowIndex = rowIndex;
    this.colIndex = colIndex;

    this.targetY = null;

    this.rotation = 0;
    this.rotation3d = {
      x: 0,
      y: 0,
      z: 0,
    };
    this.targetRotation = null;

    this.hovered = false;
    this.animatingStack = false;
    this.animatingZoom = false;
    this.animatingCollapse = false;
    this.animatingPunching = false;
    this.animatingFill = false;

    this.punchingPositions = {};
  }
  static initializeTiles(
    numberOfCol,
    numberOfTiles,
    tileSize,
    animateIntro = null
  ) {
    const tiles = [];

    for (
      let i = 0;
      i < numberOfTiles;
      i++
    ) {
      const rowIndex = Math.floor(
        i / numberOfCol
      );
      const colIndex = i % numberOfCol;

      const unit = tileSize;

      const x = unit * colIndex;
      const y = unit * rowIndex;

      const tile = new Tile(
        x,
        y,
        tileSize,
        rowIndex,
        colIndex
      );

      if (!!animateIntro) {
        if (animateIntro === "fill") {
          tile.setAnimatingFill();
        } else if (
          animateIntro === "restack"
        ) {
          tile.targetY = y;

          const MARGIN = 100;
          tile.y =
            y - (height + MARGIN);

          setTimeout(() => {
            tile.setAnimatingStack();
          }, 500);
        }
      }

      tiles.push(tile);
    }

    return tiles;
  }

  static setTiles() {
    const isMobile =
      window.innerWidth < 768;

    const isWideScreen =
      window.innerWidth > 1560;

    const NUMBER_OF_COL = isWideScreen
      ? 37
      : isMobile
      ? 11
      : 23;
    const numberOfCol = NUMBER_OF_COL;

    const tileSize =
      (width ?? innerWidth) /
      numberOfCol;
    const numberOfRow = Math.ceil(
      (height ?? innerHeight) / tileSize
    );
    const numberOfTiles =
      numberOfCol * numberOfRow;

    window.TILE_SIZE = tileSize;
    window.NUMBER_OF_COL = numberOfCol;
    window.NUMBER_OF_ROW = numberOfRow;
    window.NUMBER_OF_TILES =
      numberOfTiles;

    return {
      tileSize,
      numberOfRow,
      numberOfCol,
      numberOfTiles,
    };
  }

  draw() {
    push();

    translate(
      -width / 2 +
        this.size / 2 +
        this.x,
      -height / 2 +
        this.size / 2 +
        this.y,
      this.z - this.size / 2
    );

    // this.animateZoom();

    if (!window.preventMousePress) {
      this.animateRotation();
    }

    if (this.animatingCollapse) {
      this.animateCollapse();
    }

    if (this.animatingStack) {
      this.animateStack();
    }

    if (this.animatingFill) {
      this.animateFill();
    }

    if (this.animatingPunching) {
      this.animatePunching();
    }

    fill(218);
    box(this.size);

    pop();
  }

  // Stack
  animateStack() {
    // y값 조절
    if (this.y < this.targetY) {
      this.y +=
        5 + this.rotation3d.x * 0.033;
    }

    // 회전 조절
    if (this.y < this.targetY) {
      // 처음 반
      const randomRotate = () =>
        Math.floor(Math.random() * 10);

      rotateX(
        (this.rotation3d.x +=
          randomRotate())
      );
    }

    // 더 내려가버렸을 때
    if (this.y > this.targetY) {
      // y 초기화
      this.y = this.targetY;

      this.rotation3d.x = 0;
      this.resetAnimatingStack();

      rotateX(this.rotation3d.x);
    }
  }

  setAnimatingStack() {
    this.animatingStack = true;
  }

  resetAnimatingStack() {
    this.animatingStack = false;
  }

  setAnimatingFill() {
    this.animatingFill = true;
  }

  resetAnimatingFill() {
    this.animatingFill = false;
  }

  animateFill() {
    const isEmptyTile =
      this.rotation === undefined;

    if (isEmptyTile) {
      this.rotation = 0;
      this.z = -160;
      return;
    }

    if (this.z < 0) {
      this.z = this.z + 4;
    } else {
      this.z = 0;
      this.resetAnimatingFill();
    }
  }

  // Rotation
  animateRotation() {
    if (this.hovered) {
      this.setRotation();
    }

    if (this.rotation > 0) {
      const milestones = [
        0, 90, 180, 270, 360,
      ];

      const closestMilestone =
        milestones.find(
          (ms) => ms > this.rotation
        );

      this.targetRotation =
        closestMilestone;

      if (
        this.rotation <
        this.targetRotation
      ) {
        this.rotation += 5;
      } else {
        this.rotation =
          this.targetRotation;
        this.targetRotation = null;
      }
    }

    rotateY(this.rotation);
  }

  // Collapse
  setToBeCollapse() {
    this.animatingCollapse = true;
  }

  setNotToBeCollapse() {
    this.animatingCollapse = false;
  }

  animateCollapse() {
    // 시작될때의 y위치를 저장해둔다
    if (
      this.yBeforeCollapse === undefined
    ) {
      this.yBeforeCollapse = this.y;
    }

    const outOfScreen =
      this.y > height + 100;

    if (outOfScreen) {
      this.setNotToBeCollapse();

      // remove tile
      const index =
        window.tiles.indexOf(this);
      window.tiles.splice(index, 1);

      return;
    }

    this.y =
      this.y +
      3 * this.rotation3d.x * 0.033;

    const randomRotate = () =>
      Math.floor(Math.random() * 10);

    rotateX(
      (this.rotation3d.x +=
        randomRotate())
    );
  }

  // Zoom
  animateZoom() {
    if (
      this.randomize() &&
      !this.animatingZoom
    ) {
      this.animatingZoom = true;
    }

    if (this.animatingZoom) {
      this.zoomIn();
    } else {
      this.zoomOut();
    }
  }

  zoomIn() {
    if (this.z < 50) {
      this.z = this.z + 3;
    } else {
      this.z = 50;
      this.animatingZoom = false;
    }
  }

  zoomOut() {
    if (this.z > 0) {
      this.z = this.z - 3;
    } else {
      this.z = 0;
      this.animatingZoom = false;
    }
  }

  // Punching Middle Hole
  setToBePunching() {
    this.animatingPunching = true;
  }

  resetPunching() {
    this.animatingPunching = false;
  }

  getPunchingShapeMiddleIndexes() {
    return {
      x: Math.floor(
        window.NUMBER_OF_COL / 2
      ),
      y:
        Math.floor(
          window.NUMBER_OF_ROW / 2
        ) - 1,
    };
  }

  calculatePunchingPosition() {
    // canvas 크기에 따라 계산된 값이 메모되어져 있는지 확인한다
    const canvasSize = `${width}x${height}`;
    const isCached =
      this.punchingPositions[
        canvasSize
      ];

    if (isCached) {
      return this.punchingPositions[
        canvasSize
      ];
    }

    const FLOOR = 4;
    const punchingPositions = [];

    const {
      x: middleColIndex,
      y: middleRowIndex,
    } =
      this.getPunchingShapeMiddleIndexes();

    for (let i = 0; i < FLOOR; i++) {
      const currentFloor = i + 1;

      for (
        let j = 0;
        j < window.NUMBER_OF_COL;
        j++
      ) {
        const colIndex = j;

        const isSkippingIndex =
          Math.abs(
            middleColIndex - colIndex
          ) >
          FLOOR - currentFloor + 1;

        if (isSkippingIndex) {
          continue;
        }

        const upperTileIndex = {
          colIndex,
          rowIndex:
            middleRowIndex -
            (currentFloor - 1), // 4, 3, 2, 1, 0
        };

        const lowerTileIndex = {
          colIndex,
          rowIndex:
            middleRowIndex +
            currentFloor, // 5, 6, 7, 8, 9
        };

        punchingPositions.push(
          upperTileIndex,
          lowerTileIndex
        );
      }
    }

    this.punchingPositions[canvasSize] =
      punchingPositions;

    return punchingPositions;
  }

  animatePunching() {
    const punchingPositions =
      this.calculatePunchingPosition();

    const tileIndex = {
      colIndex: this.colIndex,
      rowIndex: this.rowIndex,
    };

    const isPunchingTile =
      punchingPositions.some(
        (position) =>
          position.colIndex ===
            tileIndex.colIndex &&
          position.rowIndex ===
            tileIndex.rowIndex
      );

    if (isPunchingTile) {
      this.rotation3d.x += 3;
      this.rotation3d.y += 3;

      rotateX(this.rotation3d.x);
      rotateY(this.rotation3d.y);

      // 다이아몬드의 중앙 인덱스에서 어느 평방에 위치하는지 알아낸다
      const {
        x: middleColIndex,
        y: middleRowIndex,
      } =
        this.getPunchingShapeMiddleIndexes();

      const isUpperTile =
        middleRowIndex > this.rowIndex;
      const isLowerTile =
        middleRowIndex < this.rowIndex;

      if (isUpperTile) {
        this.x = this.x - 3;
        this.z = this.z + 3;
      } else if (isLowerTile) {
        this.y = this.y + 3;
        this.z = this.z - 3;
      } else {
        // middle
        const isLeftTile =
          middleColIndex >
          this.colIndex;
        const isRightTile =
          middleColIndex <
          this.colIndex;

        if (isLeftTile) {
          this.x = this.x - 3;
        } else if (isRightTile) {
          this.x = this.x + 3;
        } else {
          this.x = this.x + 3;
        }

        this.z = this.z + 3;
      }
    }
  }

  randomize() {
    let result;

    result = Math.floor(
      Math.random() * 2000
    );

    return result === 0;
  }

  setRotation() {
    this.rotation = this.rotation + 5;

    return this.rotation;
  }

  setRotateBack() {
    if (this.rotation > 0) {
      this.rotation = this.rotation - 5;
    } else {
      this.rotation = 0;
    }

    return this.rotation;
  }

  checkIsHovered() {
    if (window.ignoreHover) return;

    const isMobile =
      window.innerWidth < 768;

    if (
      isMobile &&
      !window.mouseIsPressed
    ) {
      this.hovered = false;
      mouseX = 0;
      mouseY = 0;

      return;
    }

    const leftEnd =
      this.x - this.size / 2;
    const rightEnd =
      this.x + this.size / 2;
    const topEnd =
      this.y - this.size / 2;
    const bottomEnd =
      this.y + this.size / 2;

    if (
      mouseX > leftEnd &&
      mouseX < rightEnd &&
      mouseY > topEnd &&
      mouseY < bottomEnd
    ) {
      this.hovered = true;
    } else {
      this.hovered = false;
    }

    return this.hovered;
  }
}
