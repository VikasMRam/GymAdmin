import React from 'react';
import { string, bool, oneOf, number, oneOfType, node } from 'prop-types';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { size } from 'sly/components/themes';
import { Label, Input, Icon } from 'sly/components/atoms';
// leave as it is: cyclic dependency
import MultipleChoice from 'sly/components/molecules/MultipleChoice';
import CommunityChoice from 'sly/components/molecules/CommunityChoice';
import RatingInput from 'sly/components/molecules/RatingInput';
import Slider from 'sly/components/molecules/Slider';
import DateChoice from 'sly/components/molecules/DateChoice';
import BoxChoice from 'sly/components/molecules/BoxChoice';
import IconInput from 'sly/components/molecules/IconInput';
import InputMessage from 'sly/components/molecules/InputMessage';

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
  display: flex;
  flex-direction: column;
  align-items: initial;
  
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    flex-direction: ${ifProp({ wideWidth: true }, 'row')};
  }
`;

const CheckIcon = styled(Icon)`
  position: absolute;
  right: ${size('spacing.regular')};
  bottom: ${size('spacing.regular')};
`;

const LabelWrapper = styled.div`
  display: flex;
  vertical-align: middle;
  justify-content: space-between;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${ifProp({ wideWidth: true }, size('tabletLayout.col2'))};
    margin-right: ${ifProp({ wideWidth: true }, size('tabletLayout.gutter'))};
  }
`;

const InputWrapper = styled.div`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${ifProp({ wideWidth: true }, size('tabletLayout.col3'))};
    margin-right: ${ifProp({ wideWidth: true }, size('spacing.large'))};
  }
`;

const InputBeforeLabelWrapper = styled.div`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-left: ${ifProp({ wideWidth: true }, size('tabletLayout.col2'))};
  }
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
  wideWidth,
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
    <Wrapper className={className} wideWidth={wideWidth}>
      {renderInputFirst && (wideWidth ? <InputBeforeLabelWrapper wideWidth={wideWidth}><InputComponent {...inputProps} /></InputBeforeLabelWrapper> : <InputComponent {...inputProps} />)}
      {(label || labelRight) &&
        <LabelWrapper wideWidth={wideWidth}>
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
      {renderInputFirst || (wideWidth ? <InputWrapper wideWidth={wideWidth}><InputComponent {...inputProps} /></InputWrapper> : <InputComponent {...inputProps} />)}
      {invalid && !hideErrors && message && (
        <InputMessage name={`${name}Error`} icon="close" palette="danger" message={message} />
      )}
      {warning && !hideErrors && message && (
        <InputMessage name={`${name}Warning`} icon="warning" palette="warning" message={message} />
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
  placeholder: string,
  labelRight: node,
  wideWidth: bool,
};

Field.defaultProps = {
  type: 'text',
};

export default Field;
