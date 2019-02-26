import React from 'react';
import { string, bool, oneOf, number, oneOfType, node } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { Label, Input, Block, Icon } from 'sly/components/atoms';
// leave as it is: cyclic dependency
import MultipleChoice from 'sly/components/molecules/MultipleChoice';
import CommunityChoice from 'sly/components/molecules/CommunityChoice';
import RatingInput from 'sly/components/molecules/RatingInput';
import Slider from 'sly/components/molecules/Slider';
import DateChoice from 'sly/components/molecules/DateChoice';
import BoxChoice from 'sly/components/molecules/BoxChoice';

const getInputType = type => (type === 'email' ? 'text' : type);
const getInputComponent = (type) => {
  switch (type) {
    case 'rating':
      return RatingInput;
    case 'singlechoice':
    case 'multiplechoice':
    case 'buttonlist':
      return MultipleChoice;
    case 'communitychoice':
      return CommunityChoice;
    case 'slider':
      return Slider;
    case 'boxChoice':
      return BoxChoice;
    case 'dateChoice':
      return DateChoice;
    default:
      return Input;
  }
};

const Wrapper = styled.div`
  position: relative;
  margin-bottom: ${size('spacing.large')};
  > input[type='checkbox'],
  > input[type='radio'] {
    margin-right: ${size('spacing.regular')};
  }
  label {
    vertical-align: middle;
  }
`;

const ErrorWrapper = styled.div`
  display: flex;
  align-items: center;
  // donot use pad to add margin bottom on input as it well lead to
  // rerender on key stroke that will loose focus
  margin-top: ${size('spacing.regular')};
`;

const StyledIcon = styled(Icon)`
  margin-right: ${size('spacing.regular')};
`;

const CheckIcon = styled(Icon)`
  position: absolute;
  right: ${size('spacing.regular')};
  bottom: ${size('spacing.regular')};
`;

const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Field = ({
  error,
  name,
  invalid,
  warning,
  success,
  label,
  type,
  placeholder,
  className,
  value,
  hideErrors,
  labelRight,
  ...props
}) => {
  const inputProps = {
    id: `${name}_${value || +new Date()}`,
    name,
    value,
    type: getInputType(type),
    invalid,
    warning,
    placeholder,
    'aria-describedby': `${name}Error`,
    ...props,
  };
  const InputComponent = getInputComponent(type);
  const renderInputFirst = type === 'checkbox' || type === 'radio';

  return (
    <Wrapper className={className}>
      {renderInputFirst && <InputComponent {...inputProps} />}
      {(label || labelRight) &&
        <LabelWrapper>
          {label &&
            <Label htmlFor={inputProps.id}>
              {label}
            </Label>
          }
          {labelRight &&
            <span>{labelRight}</span>
          }
        </LabelWrapper>
      }
      {renderInputFirst || <InputComponent {...inputProps} />}
      {invalid && !hideErrors && error && (
        <ErrorWrapper>
          <StyledIcon icon="close" size="small" palette="danger" />
          <Block id={`${name}Error`} role="alert" palette="danger" size="caption">
            {error}
          </Block>
        </ErrorWrapper>
      )}
      {warning && !hideErrors && error && (
        <ErrorWrapper>
          <StyledIcon icon="warning" size="small" palette="warning" />
          <Block id={`${name}Warning`} role="alert" palette="warning" size="caption">
            {error}
          </Block>
        </ErrorWrapper>
      )}
      {success &&
        <CheckIcon icon="check" size="regular" palette="green" />
      }
    </Wrapper>
  );
};

Field.propTypes = {
  name: string.isRequired,
  value: oneOfType([
    string,
    number,
  ]),
  className: string,
  invalid: bool,
  warning: bool,
  success: bool,
  error: string,
  hideErrors: bool,
  label: string,
  type: oneOf([
    'textarea',
    'select',
    'communitychoice',
    'singlechoice',
    'multiplechoice',
    'buttonlist',
    'boxChoice',
    'dateChoice',
    'slider',
    'text',
    'email',
    'password',
    'checkbox',
    'radio',
    'rating',
    'number',
  ]),
  placeholder: string,
  labelRight: node,
};

Field.defaultProps = {
  type: 'text',
};

export default Field;
