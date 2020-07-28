import React from 'react';
import { string, bool, oneOf, number, oneOfType, node, array, object, arrayOf } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import getInputComponent from './getInputComponent';

import { size } from 'sly/common/components/themes';
import { Label, Block } from 'sly/common/components/atoms';
import { Input, Icon, Span } from 'sly/web/components/atoms';
import InputMessage from 'sly/web/components/molecules/InputMessage';
import { textAlign } from 'sly/web/components/helpers/text';

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

  ${ifProp('row', css`
    flex-direction: row;
    align-items: baseline;
  `)};

  .react-datepicker__input-container {
    display: block;
  }

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    flex-direction: ${ifProp({ wideWidth: true }, 'row')};
    ${({ type, options }) => (type === 'checkbox' && !!options === true) && css`
      align-items: flex-start;
    `};
  }
`;

const CheckIcon = styled(Icon)`
  position: absolute;
  right: ${size('spacing.regular')};
  bottom: ${size('spacing.regular')};
`;

const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ type, options }) => (type === 'checkbox' && !!options === true) && css`
    margin-bottom: ${size('spacing.regular')};
  `};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    ${({ wideWidth }) => wideWidth && css`
      vertical-align: middle;
      margin-right: ${size('tabletLayout.gutter')};
      flex: 0 0 ${size('tabletLayout.col2')};
      ${({ type, options }) => (type === 'checkbox' && !!options === true) && css`
        margin-bottom: 0;
      `};
    `}
  }
`;

/* Input checkbox 2 columns
  display: grid;
  grid-gap: ${size('spacing.large')};
  grid-template-columns: auto auto;
*/

/* Input checkbox 3 rows auto flow columns
  display: grid;
  grid-gap: ${size('spacing.large')};
  grid-template-rows: auto auto auto;
  grid-auto-flow: column;
*/

const InputWrapper = styled.div`
  ${({ type, options }) => (type === 'checkbox' && !!options === true) && css`
    > * {
      margin-bottom: ${size('spacing.large')};
      :last-child {
        margin-bottom: 0;
      }
    }
  `};
  @media screen and (min-width: ${size('breakpoint.mobile')}) {
    ${({ type, options }) => (type === 'checkbox' && !!options === true) && css`
      > * {
        margin-bottom: 0;
      }
      display: grid;
      grid-gap: ${size('spacing.large')};
      grid-template-columns: auto auto;
    `};
  }
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    ${({ wideWidth, widthSpacing }) => wideWidth && css`
      margin-right: ${size('spacing.large')};
      flex: 0 0 ${size(widthSpacing)};
    `}
  }
`;

const InputBeforeLabelWrapper = styled.div`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-left: ${ifProp({ wideWidth: true }, size('tabletLayout.col2'))};
  }
`;

// donot use pad to add margin bottom on input as it well lead to
// rerender on key stroke that will loose focus
const StyledInputMessage = styled(InputMessage)`
  margin-top: ${ifProp({ renderInputFirst: false }, size('spacing.regular'))};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-top: ${ifProp({ wideWidth: true }, 0)};
  }
`;
// donot use pad to add margin bottom on input as it well lead to
// rerender on key stroke that will loose focus
const CharCount = styled(textAlign(Block, 'right'))`
  margin-top: ${size('spacing.regular')};
`;
CharCount.displayName = 'CharCount';

const StyledLabel = styled(Label)`
  ${ifProp('renderInputFirst', css`
    margin-bottom: 0;
    margin-right: ${size('spacing.regular')};
  `)};
`;
const textTypeInputs = ['email', 'iconInput'];
const getInputType = type => textTypeInputs.includes(type) ? 'text' : type;

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
  widthSpacing,
  hideValue,
  showCharacterCount,
  options,
  required,
  ...props
}) => {
  const inputProps = {
    id: name,
    name,
    value: hideValue ? null : value,
    type: getInputType(type),
    invalid: invalid && !hideErrors,
    warning,
    placeholder,
    'aria-describedby': `${name}Error`,
    options,
    label,
    ...props,
  };
  const InputComponent = getInputComponent(type);
  const renderInputFirst = (type === 'checkbox' && !options) || type === 'radio' || type === 'file';
  const valueLength = inputProps.value ? inputProps.value.length : 0;
  if (type === 'date') {
    inputProps.selected = inputProps.value;
    inputProps.placeholderText = inputProps.placeholder;
    inputProps.customInput = <Input size={props.size} autocomplete="off" />;
  }
  if (type === 'button' && inputProps.buttonType) {
    inputProps.type = inputProps.buttonType;
  }

  return (
    <Wrapper className={className} wideWidth={wideWidth} type={type} options={options} row={renderInputFirst}>
      {renderInputFirst && (wideWidth ? <InputBeforeLabelWrapper wideWidth={wideWidth}><InputComponent {...inputProps} /></InputBeforeLabelWrapper> : <InputComponent {...inputProps} />)}
      {(type !== 'boolean' && (label || labelRight)) &&
        <LabelWrapper wideWidth={wideWidth} type={type} options={options}>
          {label &&
            <StyledLabel htmlFor={inputProps.id} renderInputFirst={renderInputFirst}>
              {label}
              {required && <Span palette="danger">*</Span>}
            </StyledLabel>
          }
          {labelRight &&
            <span>{labelRight}</span>
          }
        </LabelWrapper>
      }
      {renderInputFirst || (wideWidth ? <InputWrapper wideWidth={wideWidth} widthSpacing={widthSpacing} type={type} options={options}><InputComponent {...inputProps} /></InputWrapper> : <InputComponent {...inputProps} />)}
      {invalid && !hideErrors && message && (
        <StyledInputMessage name={`${name}Error`} icon="close" palette="danger" message={message} wideWidth={wideWidth} renderInputFirst={renderInputFirst} />
      )}
      {warning && !hideErrors && message && (
        <StyledInputMessage name={`${name}Warning`} icon="warning" palette="warning" message={message} wideWidth={wideWidth} renderInputFirst={renderInputFirst} />
      )}
      {success &&
        <CheckIcon icon="check" palette="green" />
      }
      {showCharacterCount && inputProps.maxLength &&
        <CharCount size="tiny" palette={((valueLength / inputProps.maxLength) * 100) > 90 ? 'danger' : 'slate'}>{valueLength}/{inputProps.maxLength}</CharCount>
      }
    </Wrapper>
  );
};

Field.propTypes = {
  name: string.isRequired,
  value: oneOfType([
    string,
    number,
    array,
    bool,
    object,
  ]),
  size: string,
  className: string,
  invalid: bool,
  warning: bool,
  success: bool,
  message: string,
  hideErrors: bool,
  label: node,
  required: bool,
  showCharacterCount: bool,
  type: oneOf([
    'textarea',
    'select',
    'choice', // react-select
    'autocomplete',
    'community',
    'user',
    'communitychoice',
    'singlechoice',
    'multiplechoice',
    'buttonlist',
    'boxChoice',
    'dateChoice',
    'slider',
    'text',
    'boolean',
    'file',
    'phone',
    'email',
    'password',
    'checkbox',
    'radio',
    'rating',
    'number',
    'iconInput',
    'hidden',
    'date',
    'locationSearch',
    'daterange',
    'richtextarea',
    'button',
  ]),
  placeholder: string,
  labelRight: node,
  wideWidth: bool,
  widthSpacing: string,
  hideValue: bool,
  options: arrayOf(object),
};

Field.defaultProps = {
  type: 'text',
  widthSpacing: 'tabletLayout.col3',
};

export default Field;
