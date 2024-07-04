document.addEventListener(
  "DOMContentLoaded",
  () => {
    const input =
      document.querySelector("input");

    input.addEventListener(
      "input",
      (e) => validateInput(e.target)
    );
  }
);

function validateInput(input) {
  const value = input.value;

  if (value.length > 12) {
    showToast(
      "12자 이내로 작성해주세요"
    );

    input.value = value.slice(0, 12);

    return;
  }

  if (hasEmoji(value)) {
    console.log("이모지 발견!");

    showToast(
      "이모지는 사용할 수 없습니다"
    );

    input.value = filterEmojis(value);

    return;
  }
}

function showToast(contents) {
  const hasToast =
    document.querySelector(".toast");

  if (hasToast) {
    hasToast.remove();
  }

  const toast =
    document.createElement("div");

  toast.classList.add("toast");
  toast.style.position = "fixed";
  toast.style.top = `${
    (Math.floor(
      window.NUMBER_OF_ROW / 2
    ) -
      1) *
    window.TILE_SIZE
  }px`;
  toast.style.left = "50%";
  toast.style.transform =
    "translate(-50%, -100%)";

  toast.textContent = contents;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("fadeout");

    setTimeout(() => {
      toast.remove();
    }, 1000);
  }, 1000);
}
