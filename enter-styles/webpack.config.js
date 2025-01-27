const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./dist/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    libraryTarget: "commonjs",
  },
  mode: "production",
  externals: {
    obsidian: "commonjs obsidian",
    "@codemirror/state": "commonjs @codemirror/state",
    "@codemirror/view": "commonjs @codemirror/view"
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "manifest.json", to: "." }
      ],
    }),
  ],
  target: "node"
};