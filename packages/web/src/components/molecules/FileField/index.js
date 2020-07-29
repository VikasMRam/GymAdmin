import React from 'react';
import { element, number, string } from 'prop-types';
import { prop } from 'styled-tools';
import styled from 'styled-components';

import { palette } from 'sly/common/components/themes';

const Wrapper = styled.div`
  position: relative;
  width: max-content;

  input[type="file"] {
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    right: 0;
    top: 0;
  }

  label {
    width: max-content;
    background: linear-gradient(90deg, ${palette('primary', 'filler')} ${prop('percent')}%, #fff  ${prop('percent')}%);
  }
`;

const FileField = React.forwardRef(({ children, name, percent, ...props }, ref) => {
  const id = `file-upload-${name}`;
  return (
    <Wrapper percent={percent}>
      {/* eslint-disable-next-line jsx-a11y/label-has-for */}
      <label htmlFor={id}>
        {children}
      </label>
      <input
        id={id}
        type="file"
        ref={ref}
        name="uploadPhoto"
        multiple
        {...props}
      />
    </Wrapper>
  );
});

FileField.propTypes = {
  name: string.isRequired,
  percent: number.isRequired,
  children: element,
};

FileField.defaultProps = {
  label: 'Upload file',
  name: 'file',
  percent: 50,
};

export default FileField;
