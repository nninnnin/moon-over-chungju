import JSBarcode from "jsbarcode";

const main = () => {
  const createBarcode = async (
    str,
    canvasElement
  ) => {
    return JSBarcode(
      canvasElement,
      "zbcheq" + str,
      {
        width: 240,
        displayValue: false,
        height: 80,
      }
    );
  };

  window.createBarcode = createBarcode;
};

export default main;
