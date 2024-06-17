const glide = new Glide(".glide", {
  type: "carousel",
  perView: 1,
  focusAt: "center",
  swipeThreshold: false,
  dragThreshold: false,
  keyboard: false,
  animationDuration: 800,
});

glide.on("move.after", () => {
  window.moonIndex = glide.index;
});

glide.mount();

const glideArrowLeft =
  document.querySelector(
    ".glide__arrow--left"
  );

glideArrowLeft.addEventListener(
  "click",
  () => {
    glide.go("<");
  }
);

const glideArrowRight =
  document.querySelector(
    ".glide__arrow--right"
  );

glideArrowRight.addEventListener(
  "click",
  () => {
    glide.go(">");
  }
);
