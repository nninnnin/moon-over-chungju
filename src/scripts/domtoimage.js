import html2canvas from "html2canvas";

const main = () => {
  const captureDom = (node) => {
    return html2canvas(node, {
      width: node.offsetWidth - 1,
      height: node.offsetHeight - 1,
    });
  };

  window.captureDom = captureDom;
};

export default main;
