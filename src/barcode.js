import JSBarcode from "jsbarcode";

const main = () => {
  const createBarcode = (
    str,
    canvasElement
  ) => {
    JSBarcode(
      canvasElement,
      "zbcheq" + str,
      {
        width: 1,
        displayValue: false,
        height: 80,
      }
    );
  };

  window.createBarcode = createBarcode;
};

export default main;
