import emojiRegex from "emoji-regex";

const main = () => {
  const hasEmoji = (text) => {
    const regex = emojiRegex();

    return regex.test(text);
  };

  const filterEmojis = (text) => {
    const regex = emojiRegex();
    const result = text.replaceAll(
      regex,
      ""
    );

    console.log("filtered", result);

    return result;
  };

  window.hasEmoji = hasEmoji;
  window.filterEmojis = filterEmojis;
};

export default main;
