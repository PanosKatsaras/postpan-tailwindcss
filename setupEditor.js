import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { json } from "@codemirror/lang-json";
import { indentWithTab } from "@codemirror/commands";

export default function setupEditors() {
  const jsonRequestBody = document.querySelector("[data-json-request-body]");
  const jsonResponseBody = document.querySelector("[data-json-response-body]");

  
  if (!jsonRequestBody || !jsonResponseBody) {
    console.error("Required elements not found in the DOM.");
    return;
  }

  // Define the basic extensions with the correct tab binding
  const basicExtensions = [
    keymap.of([indentWithTab]),  // Use indentWithTab to handle the Tab key press
    json()
  ];

  // Initialize the editor for the request body
  const requestEditor = new EditorView({
    state: EditorState.create({
      doc: "{\n\t\n}",
      extensions: basicExtensions
    }),
    parent: jsonRequestBody
  });

  // Initialize the editor for the response body
  const responseEditor = new EditorView({
    state: EditorState.create({
      doc: "{}",
      extensions: [...basicExtensions, EditorView.editable.of(false)],
    }),
    parent: jsonResponseBody
  });

  function updateResponseEditor(value) {
    responseEditor.dispatch({
      changes: {
        from: 0,
        to: responseEditor.state.doc.length,  // Clear existing content
        insert: JSON.stringify(value, null, 2),  // Insert formatted JSON
      },
    });
  }



  return { requestEditor, updateResponseEditor };
}
