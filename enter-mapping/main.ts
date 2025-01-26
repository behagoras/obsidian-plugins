import { MarkdownView, Plugin } from "obsidian";

export default class CustomEnterPlugin extends Plugin {
  async onload(): Promise<void> {
    console.log("Enter Mappings Plugin loaded");

    this.registerDomEvent(document, "keydown", (evt: KeyboardEvent) => {
      const activeEditor = this.app.workspace.activeEditor;
      const isEditMode = !this.isSourceMode();

      const doubleEnter = this.isDoubleEnter();

      if (
        evt.key === "Enter" &&
        !evt.shiftKey &&
        activeEditor &&
        isEditMode &&
        activeEditor.editor &&
        doubleEnter
      ) {
        console.log('Enter hit')
        activeEditor.editor.replaceSelection("\n");
      }
    });
  }

  private isSourceMode() {
    const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
    return activeView && !!activeView?.getState().source;
  }


  /**
   * Checks if the current cursor position in the editor indicates a double Enter key press.
   * 
   * This function determines if the current line is empty and the previous line is not empty,
   * which would indicate that the user has pressed Enter twice consecutively.
   * 
   * @returns {boolean} - Returns `true` if the current line is empty and the previous line is not empty,
   *                      indicating a double Enter key press. Returns `false` otherwise.
   */
  private isDoubleEnter(): boolean {
    const activeEditor = this.app.workspace.activeEditor;
    if (!activeEditor || !activeEditor.editor) return false;

    const editor = activeEditor.editor;
    const cursor = editor.getCursor();
    const currentLine = editor.getLine(cursor.line - 1);
    const previousLine = cursor.line > 0 ? editor.getLine(cursor.line - 2) : null;

    const bulletPointRegex = /^(\s*[-*+]\s)/;
    const numberedListRegex = /^(\s*\d+\.\s)/;

    if (bulletPointRegex.test(currentLine) || numberedListRegex.test(currentLine)) {
      return false; // is a bullet point or numbered list
    }
    if (currentLine !== "" || previousLine === "") return true;

    return false;
  }

  onunload(): void {
    console.log("Enter Mappings Plugin unloaded");
  }
}