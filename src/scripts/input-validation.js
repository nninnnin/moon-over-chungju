document.addEventListener(
  "DOMContentLoaded",
  () => {
    const input =
      document.querySelector("input");

    input.addEventListener(
      "input",
      () => {
        const value = input.value;

        // when space is continously pressed or value has continous space character,
        // replace that with single space character
        if (value.includes("  ")) {
          input.value = value.replace(
            /\s\s/g,
            " "
          );

          return;
        }

        const lengthWithoutSpace =
          value.replace(
            /\s/g,
            ""
          ).length;

        if (lengthWithoutSpace > 12) {
          const hasToast =
            document.querySelector(
              ".toast"
            );

          if (hasToast) {
            hasToast.remove();
          }

          const toast =
            document.createElement(
              "div"
            );

          toast.classList.add("toast");

          toast.style.position =
            "fixed";
          console.log(
            `${
              Math.floor(
                window.NUMBER_OF_ROW / 2
              ) * window.TILE_SIZE
            }px`
          );
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

          toast.textContent =
            "12자 이내로 작성해주세요";

          document.body.appendChild(
            toast
          );

          setTimeout(() => {
            toast.classList.add(
              "fadeout"
            );

            setTimeout(() => {
              toast.remove();
            }, 1000);
          }, 1000);

          input.value = value.slice(
            0,
            value.length - 1
          );
        }
      }
    );
  }
);
