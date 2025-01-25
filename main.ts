import { Plugin } from "obsidian";

export default class CustomEnterPlugin extends Plugin {
  async onload() {
    console.log("Custom Enter Behavior Plugin loaded");

    // Escuchar eventos de teclado en el editor
    this.registerDomEvent(document, "keydown", (evt: KeyboardEvent) => {
      const activeEditor = this.app.workspace.activeEditor;
      if (evt.key === "Enter" && !evt.shiftKey) {
        evt.preventDefault();
        if (activeEditor) {
          if (activeEditor.editor) {
            activeEditor.editor.replaceSelection("\n\n");  // Agrega dos saltos de línea
          }
        }
      } else if (evt.key === "Enter" && evt.shiftKey) {
        evt.preventDefault();
        if (activeEditor) {
          if (activeEditor.editor) {
            activeEditor.editor.replaceSelection("\n");  // Agrega un solo salto de línea
          }
        }
      }
    });
  }

  onunload() {
    console.log("Custom Enter Behavior Plugin unloaded");
  }
}