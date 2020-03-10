import React from 'react';
import { string } from 'prop-types';
import { prop } from 'styled-tools';
import styled from 'styled-components';

import Icon from 'sly/components/atoms/Icon';
import { palette, size } from 'sly/components/themes';

const Wrapper = styled.div`
  position: relative;
  height: ${size('element.button')};

  input[type="file"] {
    opacity: 0;
  }

  label {
    background: linear-gradient(90deg, ${palette('primary', 'filler')} ${prop('percent')}%, #fff  ${prop('percent')}%);
    padding: calc(${size('spacing', 'regular')} + ${size('spacing', 'small')});
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;

    ${Icon} {
      margin-right: ${size('spacing.regular')};
    }
  }
`;

const FileField = React.forwardRef(({ label: textLabel, fileName, name, percent, ...props }, ref) => {
  const id = `file-upload-${name}`;
  console.log('percent', percent);
  return (
    <Wrapper percent={percent}>
      <input
        id={id}
        type="file"
        ref={ref}
        {...props}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-for */}
      <label htmlFor={id}>
        <>
          <Icon icon="add-note" palette="primary" /> {fileName || textLabel}
        </>
      </label>
    </Wrapper>
  );
});

FileField.propTypes = {
  label: string.isRequired,
  name: string.isRequired,
  fileName: string,
  percent: string.isRequired,
};

FileField.defaultProps = {
  label: 'Upload file',
  name: 'file',
  percent: 50,
};

export default FileField;
