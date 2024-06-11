class Tile {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.z = 0;
    this.size = size;

    this.rotation = 0;
    this.rotation3d = {
      x: 0,
      y: 0,
      z: 0,
    };
    this.targetRotation = null;

    this.hovered = false;
    this.animatingZoom = false;
    this.animatingCollapse = false;
  }

  draw() {
    push();

    translate(
      -width / 2 + this.size / 2 + this.x,
      -height / 2 + this.size / 2 + this.y,
      this.z - this.size / 2
    );

    // this.animateZoom();
    // this.animateRotation();
    this.animateCollapse();

    box(this.size);

    pop();
  }

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

  setToBeCollapsed() {
    this.animatingCollapse = true;
  }

  animateCollapse() {
    if (this.animatingCollapse) {
      this.y =
        this.y + 3 * this.rotation3d.x * 0.033;

      const randomRotate = () =>
        Math.floor(Math.random() * 10);

      rotateX(
        (this.rotation3d.x += randomRotate())
      );

      // rotateY(
      //   (this.rotation3d.y += randomRotate())
      // );

      // rotateZ(
      //   (this.rotation3d.z += randomRotate())
      // );
    }
  }

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
