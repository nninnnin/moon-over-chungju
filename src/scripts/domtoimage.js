import { toPng } from "html-to-image";

const main = () => {
  const captureDom = (node) => {
    return toPng(node);
  };

  window.captureDom = captureDom;
};

export default main;
