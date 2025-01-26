const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./dist/main.js", // after tsc compiles main.ts to dist/main.js
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    libraryTarget: "commonjs",
  },
  mode: "production",
  externals: {
    obsidian: "commonjs obsidian"
    // plus any others like @codemirror/state, @codemirror/view if needed
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "manifest.json", to: "." }
      ],
    }),
  ],
  target: "node",
};