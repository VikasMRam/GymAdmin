import React from 'react';
import { string, bool, oneOf } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { Label, Input, Block } from 'sly/components/atoms';

const Error = styled(Block)`
  margin-top: ${size('spacing.tiny')};
  font-size: ${size('text.caption')};
`;

const Wrapper = styled.div`
  margin-bottom: ${size('spacing.large')};
  input[type='checkbox'],
  input[type='radio'] {
    margin-right: ${size('spacing.regular')};
  }
  label {
    vertical-align: middle;
  }
`;

const Field = ({
  error,
  name,
  invalid,
  label,
  type,
  placeholder,
  ...props
}) => {
  const inputProps = {
    id: name,
    name,
    type,
    invalid,
    placeholder,
    'aria-describedby': `${name}Error`,
    ...props,
  };
  const renderInputFirst = type === 'checkbox' || type === 'radio';
  return (
    <Wrapper>
      {renderInputFirst && <Input {...inputProps} />}
      {label && (
        <Label invalid={invalid} htmlFor={inputProps.id}>
          {label}
        </Label>
      )}
      {renderInputFirst || <Input {...inputProps} />}
      {invalid &&
        error && (
          <Error id={`${name}Error`} role="alert" palette="danger">
            {error}
          </Error>
        )}
    </Wrapper>
  );
};

Field.propTypes = {
  name: string.isRequired,
  invalid: bool,
  error: string,
  label: string,
  type: oneOf(['textarea', 'select', 'text', 'checkbox', 'radio']),
  placeholder: string,
};

Field.defaultProps = {
  type: 'text',
};

export default Field;
