import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import styles from "./CreatePost.module.css"
import CSSModules from "react-css-modules"

const CreatePost = () => {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <form onSubmit={log}>
    <label for="post" class="form__label"/>
    <input id="post" name="post" styleName="form__control"  placeholder="Bob Jones" />
      <Editor
        apiKey='8285m4z241eb5qr9vs1xokxlufq5ozru9ce5im2pj01vl2my'
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <button >Log editor content</button>
    </form>
  );
}

export default CSSModules(CreatePost, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});