//TEXT EDITOR COMPONENT : using React Draft-js and React-Draft-WYSIWYG
import React, { useState} from 'react';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './TextEditor.css';
import { convertToHTML } from 'draft-convert';
const { forwardRef, useImperativeHandle } = React;


const TextEditor = forwardRef((props, ref) => {
  const [editorState, setEditorState] = useState(
    () => {
      if(props.initialText !== undefined){
        const blocksFromHTML = convertFromHTML(props.initialText);
        const state = ContentState.createFromBlockArray(
                        blocksFromHTML.contentBlocks,
                        blocksFromHTML.entityMap,
                      );
        return EditorState.createWithContent(state)
      }else{
        EditorState.createEmpty()
      }
    }
  );
  
  //handles editor change
  const handleEditorChange = (state) => {
    setEditorState(state);
  }

  //use of useRef to call covertToHTML function
  useImperativeHandle(ref, () => ({
  async convertContentToHTML() {
    if(editorState !== undefined){
      let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
      return (currentContentAsHTML);
    }else{
      return ("")
    }
  }
}))
  
  return (
    <div className="TextEditor">
      <header className="Editor-header">
        Edit Contract Text
      </header>
      <Editor 
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
    </div>
  )
})
export default TextEditor;
