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
    flex-direction: ${ifProp('wideWidth', 'row')};
    ${ifProp({ type: 'checkbox' }, ifProp('options', css`
      align-items: flex-start;
    `))};
  `)}
`;

const LabelWrapper = styled(Block)`
  ${upTo('tablet', 'flex-basis: auto;')}
  ${startingWith('tablet', ifProp('wideWidth', css`
    margin-right: ${size('spacing.xLarge')};
  `))}
`;

const InputBlock = styled(Block)`
  ${upTo('tablet', 'flex-basis: auto;')}
  ${ifProp('wideWidth', startingWith('tablet', 'margin-bottom: 0;'))}
`;

const StyledInputMessage = styled(InputMessage)`
  ${upTo('tablet', 'margin-left: 0;')}
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
    (type === 'checkbox' && !options) || type === 'radio' || type === 'file' || type === 'boxChoice';
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
          flexBasis={wideWidth ? getKey('sizes.tabletLayout.col2') : undefined}
        >
          {label &&
            <Label
              htmlFor={inputProps.id}
              pad={renderInputFirst ? null : undefined}
            >
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
      pad="large"
      display="flex"
      position="relative"
      direction={renderInputFirst ? 'row' : 'column'}
      className={className}
      wideWidth={wideWidth}
      type={type}
      options={options}
    >
      {!renderInputFirst && labelSection}
      <InputBlock
        position="relative"
        pad={!hideErrors && message && (invalid || warning) && !renderInputFirst ? 'regular' : 0}
        wideWidth={wideWidth}
        display="flex"
        flexGrow={0}
        flexShrink={0}
        flexBasis={wideWidth ? getKey('sizes', widthSpacing) : undefined}
        flex={!wideWidth && type !== 'radio' ? 1 : undefined}
      >
        <Block
          display="flex"
          flexWrap="wrap"
          width="100%"
          align={showCharacterCount ? 'right' : undefined}
          direction={type === 'boxChoice' || showCharacterCount ? 'column' : 'row'}
        >
          <InputComponent
            {...inputProps}
            margin={type === 'checkbox' && !!options === true ? [0, 'large'] : 0}
            pad={type === 'boxChoice' ? 'large' : 0}
            lastChildProps={{ pad: 0 }}
            flex={1}
          />
          {showCharacterCount &&
            <Block
              size="tiny"
              palette={((valueLength / inputProps.maxLength) * 100) > 90 ? 'danger' : 'slate'}
              align="right"
              marginTop="regular"
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
          palette={invalid ? 'danger' : 'warning'}
          message={message}
          wideWidth={wideWidth}
          marginLeft={wideWidth ? 'large' : 0}
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
