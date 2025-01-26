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

  addCustomStyles() {
    const style = document.createElement("style");
    style.setAttribute("id", "custom-enter-plugin-style");
    style.innerHTML = `
      /* Apply styles only in reading and live preview modes */
      .markdown-preview-view p {
        border: 1px solid blue; /* Border for paragraphs */
        margin-bottom: 0.8em; /* Spacing for orphaned line */
      }

      .markdown-preview-view p + p {
        border: 1px solid red; /* Border for joined lines */
        margin-top: 0.5em; /* Spacing for joined lines */
        margin-bottom: 0.5em; /* Spacing for joined lines */
      }
    `;
    document.head.appendChild(style);
  }

  // This method is called when the plugin is unloaded by Obsidian
  onunload(): void {
    console.log("Custom Enter Behavior Plugin unloaded");
    const styleElement = document.getElementById("custom-enter-plugin-style");
    if (styleElement) {
      styleElement.remove();
    }
  }
}