import { MarkdownView, Plugin } from "obsidian";

export default class CustomEnterPlugin extends Plugin {
  async onload(): Promise<void> {
    console.log("Enter Mappings Plugin loaded");

    // Listen for keyboard events in the active editor
    this.registerDomEvent(document, "keydown", (evt: KeyboardEvent) => {
      const activeEditor = this.app.workspace.activeEditor;
      const isEditMode = !this.isSourceMode();
      if (
        evt.key === "Enter" &&
        !evt.shiftKey &&
        activeEditor &&
        isEditMode &&
        activeEditor.editor
      ) {
        console.log('Enter hit')
        activeEditor.editor.replaceSelection("\n");
      }
    });
  }

  isSourceMode() {
    const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
    return activeView && !!activeView?.getState().source;
  }

  onunload(): void {
    console.log("Enter Mappings Plugin unloaded");
  }
}