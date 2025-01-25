import { Plugin } from "obsidian";

export default class CustomEnterPlugin extends Plugin {
  // This method is called when the plugin is loaded by Obsidian
  async onload(): Promise<void> {
    console.log("Custom Enter Behavior Plugin loaded");

    // Listen for keyboard events in the active editor
    this.registerDomEvent(document, "keydown", (evt: KeyboardEvent) => {
      const activeEditor = this.app.workspace.activeEditor;

      // Check if the Enter key is pressed without Shift
      if (evt.key === "Enter" && !evt.shiftKey) {
        // Prevent the default Enter behavior
        evt.preventDefault();
        if (activeEditor && activeEditor.editor) {
          // Insert two line breaks
          activeEditor.editor.replaceSelection("\n\n");
        }
      }
      // Check if the Enter key is pressed with Shift
      else if (evt.key === "Enter" && evt.shiftKey) {
        // Prevent the default Shift+Enter behavior
        evt.preventDefault();
        if (activeEditor && activeEditor.editor) {
          // Insert one line break
          activeEditor.editor.replaceSelection("\n");
        }
      }
    });
  }

  // This method is called when the plugin is unloaded by Obsidian
  onunload(): void {
    console.log("Custom Enter Behavior Plugin unloaded");
  }
}