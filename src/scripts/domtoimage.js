import domtoimage from "dom-to-image";

const main = () => {
  const captureDom = async (node) => {
    return await domtoimage.toPng(
      node,
      {
        width: 300,
        height: 300,
      }
    );
  };

  window.captureDom = captureDom;
};

export default main;
