import { MarkdownView, Plugin } from "obsidian";

export default class CustomEnterPlugin extends Plugin {
  // This method is called when the plugin is loaded by Obsidian
  async onload(): Promise<void> {
    console.log("Custom Enter Behavior Plugin loaded");

    // Listen for keyboard events in the active editor
    this.registerDomEvent(document, "keydown", (evt: KeyboardEvent) => {
      const activeEditor = this.app.workspace.activeEditor;
      const isSourceMode = this.isSourceMode();
      const isEditMode = !isSourceMode;

      if (
        evt.key === "Enter" &&
        !evt.shiftKey &&
        activeEditor &&
        isEditMode &&
        activeEditor.editor
      ) {
        activeEditor.editor.replaceSelection("\n");
      }
    });

    this.addCustomStyles();
  }

  isSourceMode() {
    const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);

    if (activeView) {
      const state = activeView.getState(); // Get the view state
      const isSourceMode = state?.source === true;

      return !!isSourceMode;
    }

    return {};
  }

  private addCustomStyles() {
    const style = document.createElement("style");
    style.setAttribute("id", "custom-enter-plugin-style");
    style.innerHTML = `
      /* Apply styles only in reading and live preview modes */
      .is-live-preview div + .cm-line:has(br):nth-of-type(even):not(.cm-active) {
          /* border: red 1px solid;*/
          height: .4em;
      }
    `;
    document.head.appendChild(style);
  }

  onunload(): void {
    console.log("Custom Enter Behavior Plugin unloaded");
    const styleElement = document.getElementById("custom-enter-plugin-style");
    if (styleElement) {
      styleElement.remove();
    }
  }
}