const path = require("path");
const { ProvidePlugin } = require("webpack");

module.exports = {
  entry: "./src/lambda-client.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "lambda-client-bundled.js",
  },
  resolve: {
    fallback: {
      crypto: false,
      "crypto-browserify": false,
    },
  },
  plugins: [
    new ProvidePlugin({
      process: "process/browser.js",
    }),
  ],
};
