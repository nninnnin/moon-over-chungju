const dotenv = require("dotenv");
dotenv.config();

const path = require("path");
const {
  ProvidePlugin,
  DefinePlugin,
} = require("webpack");

module.exports = () => {
  const env = dotenv.config().parsed;

  const envKeys = Object.keys(
    env
  ).reduce((prev, next) => {
    prev[`process.env.${next}`] =
      JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    entry: "./src/scripts/index.js",
    output: {
      path: path.resolve(
        __dirname,
        "dist"
      ),
      filename: "bundled.js",
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
      new DefinePlugin(envKeys),
    ],
  };
};
