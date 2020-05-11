import React from 'react';
import { string, bool, func } from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';

import { tinyMCEApiKey } from 'sly/config';

class RichTextArea extends React.Component {
  render() {
    const { value, disabled, onChange } = this.props;
    return (
      <Editor
        apiKey={tinyMCEApiKey}
        disabled={disabled}
        initialValue={value}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
        }}
        onEditorChange={onChange}
      />
    );
  }
}

RichTextArea.propTypes = {
  value: string,
  disabled: bool,
  onChange: func.isRequired,
};

export default RichTextArea;
