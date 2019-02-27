import React from 'react';
import { string, bool, oneOf, number, oneOfType, node } from 'prop-types';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { size } from 'sly/components/themes';
import { Label, Input, Block, Icon } from 'sly/components/atoms';
// leave as it is: cyclic dependency
import MultipleChoice from 'sly/components/molecules/MultipleChoice';
import CommunityChoice from 'sly/components/molecules/CommunityChoice';
import RatingInput from 'sly/components/molecules/RatingInput';
import Slider from 'sly/components/molecules/Slider';
import DateChoice from 'sly/components/molecules/DateChoice';
import BoxChoice from 'sly/components/molecules/BoxChoice';
import IconInput from 'sly/components/molecules/IconInput';

const textTypeInputs = ['email', 'iconInput'];
const getInputType = type => textTypeInputs.includes(type) ? 'text' : type;
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
    case 'iconInput':
      return IconInput;
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
  display: flex;
  flex-direction: ${ifProp({ orientation: 'horizontal' }, 'row', 'column')};
  align-items: ${ifProp({ orientation: 'horizontal' }, 'center', 'initial')};

  > * {
    margin-right: ${ifProp({ orientation: 'horizontal' }, size('spacing.large'), 0)};
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
  message,
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
  orientation,
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
    <Wrapper className={className} orientation={orientation}>
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
      {invalid && !hideErrors && message && (
        <ErrorWrapper>
          <StyledIcon icon="close" size="small" palette="danger" />
          <Block id={`${name}Error`} role="alert" palette="danger" size="caption">
            {message}
          </Block>
        </ErrorWrapper>
      )}
      {warning && !hideErrors && message && (
        <ErrorWrapper>
          <StyledIcon icon="warning" size="small" palette="warning" />
          <Block id={`${name}Warning`} role="alert" palette="warning" size="caption">
            {message}
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
  message: string,
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
    'iconInput',
  ]),
  orientation: oneOf(['horizontal', 'vertical']).isRequired,
  placeholder: string,
  labelRight: node,
};

Field.defaultProps = {
  type: 'text',
  orientation: 'vertical',
};

export default Field;
