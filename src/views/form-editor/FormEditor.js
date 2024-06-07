import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useState } from 'react';
import { convertFromRaw } from 'draft-js';
import { Input } from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import DashCard from '../../components/dashboard/dashboardCards/DashCard';
import './editor.scss';

const FormEditor = ({ editorState, setEditorState }) => {
  // const [contentState, setEditorState] = useState(convertFromRaw(content));

  return (
    <>
      <div>
        <Editor
          toolbar={{
            options: [
              'inline',
              'blockType',
              'fontSize',
              // 'fontFamily',
              'list',
              'textAlign',
              'emoji',
              'history',
            ],
            fontSize: {
              options: [8, 9, 10, 11, 12, 14, 16, 18],
            },
            inline: {
              options: ['bold', 'italic', 'underline', 'strikethrough'],
              blockType: {
                inDropdown: true,
                options: ['H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote'],
              },
            },
            textAlign: {
              options: ['left', 'center'],
            },
            list: {
              options: ['unordered', 'ordered'],
            },
          }}
          editorState={editorState}
          wrapperClassName="demo-wrapper mb-0"
          editorClassName="demo-editor border mb-4 edi-height"
          onEditorStateChange={setEditorState}
          // onContentStateChange={onContentStateChange}
        />
        {/* <Input type="textarea" raw={4} disabled value={JSON.stringify(contentState, null, 4)} /> */}
      </div>
    </>
  );
};

export default FormEditor;
