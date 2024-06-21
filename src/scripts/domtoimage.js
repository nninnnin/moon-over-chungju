import html2canvas from "html2canvas";

const main = () => {
  const captureDom = (node) => {
    return html2canvas(node);
  };

  window.captureDom = captureDom;
};

export default main;
