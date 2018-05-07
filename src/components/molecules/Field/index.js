import React from 'react';
import { string, bool, oneOf } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { Label, Input, Block } from 'sly/components/atoms';

// leave as it is: cyclic dependency
import MultipleChoice from 'sly/components/molecules/MultipleChoice';
import CommunityChoice from 'sly/components/molecules/CommunityChoice';
import Slider from 'sly/components/molecules/Slider';

const getInputType = type => (type === 'email' ? 'text' : type);
const getInputComponent = (type) => {
  switch (type) {
    case 'singlechoice':
    case 'multiplechoice':
      return MultipleChoice;
    case 'communitychoice':
      return CommunityChoice;
    case 'slider':
      return Slider;
    default:
      return Input;
  }
};

const Error = styled(Block)`
  margin-top: ${size('spacing.tiny')};
  font-size: ${size('text.caption')};
`;

const Wrapper = styled.div`
  margin-bottom: ${size('spacing.large')};
  > input[type='checkbox'],
  > input[type='radio'] {
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
    type: getInputType(type),
    invalid,
    placeholder,
    'aria-describedby': `${name}Error`,
    ...props,
  };
  const InputComponent = getInputComponent(type);
  const renderInputFirst = type === 'checkbox' || type === 'radio';
  return (
    <Wrapper>
      {renderInputFirst && <InputComponent {...inputProps} />}
      {label && (
        <Label invalid={invalid} htmlFor={inputProps.id}>
          {label}
        </Label>
      )}
      {renderInputFirst || <InputComponent {...inputProps} />}
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
  type: oneOf([
    'textarea',
    'select',
    'communitychoice',
    'singlechoice',
    'multiplechoice',
    'slider',
    'text',
    'email',
    'checkbox',
    'radio',
  ]),
  placeholder: string,
};

Field.defaultProps = {
  type: 'text',
};

export default Field;
