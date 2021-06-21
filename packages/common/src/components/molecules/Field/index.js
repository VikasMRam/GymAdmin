import React from 'react';
import { string, bool, oneOf, number, oneOfType, node, array, object, arrayOf } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import getInputComponent from './getInputComponent';

import { size, getKey } from 'sly/common/components/themes';
import { isReactNative } from 'sly/common/constants/utils';
import { startingWith, upTo } from 'sly/common/components/helpers';
import { Label, Block, Icon } from 'sly/common/components/atoms';
import InputMessage from 'sly/common/components/molecules/InputMessage';

const wrapperWebStyles = !isReactNative ? css`
  > input[type='checkbox'],
  > input[type='radio'] {
    margin-right: ${size('spacing.regular')};
  }
  .react-datepicker__input-container {
    display: block;
  }
` : null;

const Wrapper = styled(Block)`
  ${wrapperWebStyles}

  ${startingWith('tablet', css`
    ${ifProp('leftMargin', css`
      margin-left: ${getKey('sizes.tabletLayout.col3')};
    `)}

    flex-direction: ${ifProp('wideWidth', 'row')};
    ${ifProp({ type: 'checkbox' }, ifProp('options', css`
      align-items: flex-start;
    `))};
  `)}
`;

const LabelWrapper = styled(Block)`
  ${upTo('tablet', 'flex-basis: auto;')}
`;

const InputBlock = styled(Block)`
  ${upTo('tablet', 'flex-basis: auto;')}
  ${ifProp('wideWidth', startingWith('tablet', 'margin-bottom: 0;'))}
`;

const StyledInputMessage = styled(InputMessage)`
  ${upTo('tablet', 'margin-left: 0;')}
  ${ifProp('noLeftMarginStyledInputMessage', css`
      margin-left: 0 !important;
    `)}
`;

const LabelRightWideWidth = styled(Block)`
  ${upTo('tablet', 'margin-left: 0;')}
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
  pad,
  leftMargin,
  noLeftMarginStyledInputMessage,
  showIcon,
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
  const renderInputFirst =
    (type === 'checkbox' && !options) || type === 'radio' || type === 'file' || type === 'boxChoice' || type === 'toggle';
  const valueLength = inputProps.value ? inputProps.value.length : 0;
  if (type === 'date') {
    inputProps.selected = inputProps.value;
    inputProps.placeholderText = inputProps.placeholder;
  }
  if (type === 'button' && inputProps.buttonType) {
    inputProps.type = inputProps.buttonType;
  }

  showCharacterCount = showCharacterCount && inputProps.maxLength;
  const labelSection = (
    <>
      {(type !== 'boolean' && (label || labelRight)) &&
        <LabelWrapper
          display="flex"
          align="space-between"
          verticalAlign="middle"
          wideWidth={wideWidth}
          type={type}
          options={options}
          pad={type === 'checkbox' && !!options === true ? 'regular' : undefined}
          flexGrow={0}
          flexShrink={0}
          flexBasis={wideWidth ? getKey('sizes.tabletLayout.col3') : undefined}
        >
          {label &&
            <Label htmlFor={inputProps.id}>
              {label}
              {required && <Block display="inline" palette="danger">*</Block>}
            </Label>
          }
          {labelRight && !wideWidth &&
            <Block display="inline">{labelRight}</Block>
          }
        </LabelWrapper>
      }
    </>
  );

  return (
    <Wrapper
      pad={pad}
      display="flex"
      position="relative"
      direction={renderInputFirst ? 'row' : 'column'}
      className={className}
      wideWidth={wideWidth}
      type={type}
      options={options}
      leftMargin={leftMargin}
    >
      {!renderInputFirst && labelSection}
      <InputBlock
        position="relative"
        pad={!hideErrors && showIcon && message && (invalid || warning) && !renderInputFirst ? 'regular' : undefined}
        wideWidth={wideWidth}
        display="flex"
        flex={1}
      >
        <Block
          display="flex"
          flexWrap="wrap"
          width="100%"
          align={showCharacterCount ? 'right' : undefined}
          direction="column"
        >
          <InputComponent
            {...inputProps}
            marginRight={type === 'checkbox' && !!options === true ? 'large' : undefined}
            pad={type === 'boxChoice' ? 'large' : undefined}
            lastChildProps={{ pad: 0 }}
            flex={1}
          />
          {showCharacterCount &&
            <Block
              size="tiny"
              palette={((valueLength / inputProps.maxLength) * 100) > 90 ? 'danger' : 'slate'}
              align="right"
              marginTop="regular"
              data-testid="CharCount"
            >
              {valueLength}/{inputProps.maxLength}
            </Block>
          }
        </Block>
        {success &&
          <Icon
            icon="check"
            palette="green"
            position="absolute"
            right="regular"
            bottom="regular"
          />
        }
      </InputBlock>
      {renderInputFirst && labelSection}
      {labelRight && wideWidth &&
        <LabelRightWideWidth
          marginLeft="large"
          verticalAlign="middle"
        >
          {labelRight}
        </LabelRightWideWidth>
      }
      {!hideErrors && message && (invalid || warning) && (
        <StyledInputMessage
          name={`${name}${invalid ? 'Error' : 'Warning'}`}
          icon={invalid ? 'close' : 'warning'}
          showIcon={showIcon}
          palette={invalid ? 'danger' : 'warning'}
          message={message}
          wideWidth={wideWidth}
          marginLeft={wideWidth ? 'large' : undefined}
          noLeftMarginStyledInputMessage={noLeftMarginStyledInputMessage}
        />
      )}
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
  leftMargin: bool,
  label: node,
  required: bool,
  showCharacterCount: bool,
  showIcon: bool,
  noLeftMarginStyledInputMessage: bool,
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
    'toggle',
  ]),
  placeholder: string,
  labelRight: node,
  wideWidth: bool,
  widthSpacing: string,
  hideValue: bool,
  options: arrayOf(object),
  pad: string.isRequired,
};

Field.defaultProps = {
  type: 'text',
  widthSpacing: 'tabletLayout.col3',
  pad: 'large',
  showIcon: true,
};

export default Field;
