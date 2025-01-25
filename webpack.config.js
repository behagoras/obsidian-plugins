const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./dist/main.js", // The compiled TypeScript output
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    libraryTarget: "commonjs",
  },
  mode: "production",
  resolve: {
    extensions: [".js"],
  },
  externals: {
    obsidian: "commonjs obsidian",
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "manifest.json", to: "." }, // Copy manifest.json to dist
        { from: "styles.css", to: "." }, // If you have custom CSS
      ],
    }),
  ],
};