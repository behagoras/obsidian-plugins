import {
  EditorState,
  StateField,
  Transaction,
  RangeSetBuilder,
  Text
} from "@codemirror/state";
import {
  Decoration,
  DecorationSet,
  EditorView
} from "@codemirror/view";

export const lineHighlightField = StateField.define<DecorationSet>({
  create(state: EditorState) {
    return buildLineDecorations(state.doc);
  },
  update(decorations: DecorationSet, tr: Transaction) {
    if (!tr.docChanged) return decorations;
    return buildLineDecorations(tr.newDoc);
  },
  provide: (field) => EditorView.decorations.from(field),
});

function buildLineDecorations(doc: Text): DecorationSet {
  const builder = new RangeSetBuilder<Decoration>();
  let consecutiveEmptyCount = 0;
  for (let i = 1; i <= doc.lines; i++) {
    const line = doc.line(i);
    const isEmpty = line.text.trim() === "";
    if (isEmpty) {
      consecutiveEmptyCount++;
      // highlight only 1st, 3rd, 5th, etc. consecutive empty line
      if (consecutiveEmptyCount % 2 === 1) {
        builder.add(
          line.from, 
          line.from,
          Decoration.line({ class: "cm-empty-highlight" })
        );
      }
    } else {
      consecutiveEmptyCount = 0;
    }
  }
  return builder.finish();
}