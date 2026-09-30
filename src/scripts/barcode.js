import JSBarcode from "jsbarcode";

const main = () => {
  const createBarcode = async (
    str,
    canvasElement
  ) => {
    return JSBarcode(
      canvasElement,
      "zbcheq" + (str || "000001"),
      {
        format: "CODE128",
        width: 240,
        displayValue: false,
        height: 80,
      }
    );
  };

  window.createBarcode = createBarcode;
};

export default main;
