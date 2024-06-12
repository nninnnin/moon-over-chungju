class Tile {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.z = 0;
    this.size = size;

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
  }

  static initializeTiles(
    numberOfCol,
    numberOfTiles,
    tileSize,
    animateIntro = false
  ) {
    const tiles = [];

    for (let i = 0; i < numberOfTiles; i++) {
      const rowIndex = Math.floor(
        i / numberOfCol
      );
      const colIndex = i % numberOfCol;

      const unit = tileSize;

      const x = unit * colIndex;
      const y = unit * rowIndex;
      const tile = new Tile(x, y, tileSize);

      if (animateIntro) {
        tile.targetY = y;

        const MARGIN = 100;
        tile.y = y - (height + MARGIN);

        setTimeout(() => {
          tile.setAnimatingStack();
        }, 500);
      }

      tiles.push(tile);
    }

    return tiles;
  }

  static setTiles() {
    const isMobile = window.innerWidth < 768;

    const NUMBER_OF_COL = isMobile ? 11 : 23;
    const numberOfCol = NUMBER_OF_COL;
    const tileSize = width / numberOfCol;
    const numberOfRow = Math.ceil(
      height / tileSize
    );
    const numberOfTiles =
      numberOfCol * numberOfRow;

    window.TILE_SIZE = tileSize;
    window.NUMBER_OF_COL = numberOfCol;
    window.NUMBER_OF_ROW = numberOfRow;
    window.NUMBER_OF_TILES = numberOfTiles;

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
      -width / 2 + this.size / 2 + this.x,
      -height / 2 + this.size / 2 + this.y,
      this.z - this.size / 2
    );

    // this.animateZoom();
    this.animateRotation();

    if (this.animatingCollapse) {
      this.animateCollapse();
    }

    if (this.animatingStack) {
      this.animateStack();
    }

    box(this.size);

    pop();
  }

  // Stack
  animateStack() {
    // y값 조절
    if (this.y < this.targetY) {
      this.y += 5 + this.rotation3d.x * 0.033;
    }

    // 회전 조절
    if (this.y < this.targetY) {
      // 처음 반
      const randomRotate = () =>
        Math.floor(Math.random() * 10);

      rotateX(
        (this.rotation3d.x += randomRotate())
      );
    }

    // 더 내려가버렸을 때
    if (this.y > this.targetY) {
      // y 초기화
      this.y = this.targetY;

      // 각도 조절
      if (this.rotation3d.x <= 10) {
        this.rotation3d.x = 0;
        this.resetAnimatingStack();
      } else {
        this.rotation3d.x = lerp(
          this.rotation3d.x,
          0,
          0.1
        );
      }

      rotateX(this.rotation3d.x);
    }
  }

  setAnimatingStack() {
    this.animatingStack = true;
  }

  resetAnimatingStack() {
    this.animatingStack = false;
  }

  // Rotation
  animateRotation() {
    if (this.hovered) {
      this.setRotation();
    }

    if (this.rotation > 0) {
      const milestones = [0, 90, 180, 270, 360];

      const closestMilestone = milestones.find(
        (ms) => ms > this.rotation
      );

      this.targetRotation = closestMilestone;

      if (this.rotation < this.targetRotation) {
        this.rotation += 5;
      } else {
        this.rotation = this.targetRotation;
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
    if (this.yBeforeCollapse === undefined) {
      this.yBeforeCollapse = this.y;
    }

    const outOfScreen = this.y > height + 100;
    if (outOfScreen) {
      this.setNotToBeCollapse();

      // remove tile
      const index = window.tiles.indexOf(this);
      window.tiles.splice(index, 1);

      return;
    }

    this.y =
      this.y + 3 * this.rotation3d.x * 0.033;

    const randomRotate = () =>
      Math.floor(Math.random() * 10);

    rotateX(
      (this.rotation3d.x += randomRotate())
    );
  }

  // Zoom
  animateZoom() {
    if (this.randomize() && !this.animatingZoom) {
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

  randomize() {
    let result;

    result = Math.floor(Math.random() * 2000);

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
    if (!window.mouseIsPressed) {
      this.hovered = false;
      mouseX = 0;
      mouseY = 0;

      return;
    }

    const leftEnd = this.x - this.size / 2;
    const rightEnd = this.x + this.size / 2;
    const topEnd = this.y - this.size / 2;
    const bottomEnd = this.y + this.size / 2;

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
