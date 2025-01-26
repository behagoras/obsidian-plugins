import { Plugin } from "obsidian";
import { lineHighlightField } from "./highlighter";

export default class StyleEntersPlugin extends Plugin {
  async onload() {
    console.log("Style the Enters Plugin loaded");
    this.registerEditorExtension(lineHighlightField);
    this.injectStyles();
  }

  onunload() {
    console.log("Style the Enters Plugin unloaded");
    const styleElement = document.getElementById("style-enters-plugin-style");
    if (styleElement) styleElement.remove();
  }

  private injectStyles() {
    const style = document.createElement("style");
    style.id = "style-enters-plugin-style";
    style.textContent = `
      .cm-empty-highlight:not(.cm-active) {
        height: 0.6em !important;
      }
      .cm-empty-highlight {
        /*border: red solid 1px;*/
      }
    `;
    document.head.appendChild(style);
  }
}