import React from 'react';
import SyncSelect, { components } from 'react-select';
import AsyncSelect from 'react-select/async';
import { func, string, arrayOf, object, bool, node, oneOf, oneOfType } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, palette, getKey, getSizeKeys } from 'sly/common/components/themes';
import Block from 'sly/common/components/atoms/Block';
import Icon from 'sly/common/components/atoms/Icon';
import Hr from 'sly/common/components/atoms/Hr';

const { Option, Group, SingleValue } = components;

const StyledOption = styled(Option)`
  .react-select__menu-list &.react-select__option {
    color: ${palette('base')};
  }
`;

const Wrapper = styled(Block)`
  .react-select-container {
    ${ifProp('textSize', ({ textSize, lineHeight }) => css`
      font-size: ${size('text', textSize)};
      ${ifProp('lineHeight', css`
        line-height: ${size('lineHeight', lineHeight)};
      `, css`
        line-height: ${size('lineHeight', textSize)};
      `)}
    `)};
  }

  .react-select__value-container {
    overflow: visible;
    padding-right: 0px;
  }

  hr {
    padding: 0;
    margin: 0;
  }

  ${StyledOption} {
    min-height: ${p => size('element', p.size)};
  }

  .react-select__multi-value {
    background-color: ${palette('slate.lighter-90')};
  }

  .react-select__multi-value__label {
    font-size: 100%;
  }

  .react-select__control {
    border-color: ${palette('slate.stroke')};
    box-shadow: none;
    min-height: ${p => size('element', p.size)};
    &--menu-is-open {
      border-color: ${palette('primary.base')};
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  .react-select__menu-list {
    padding-top: 0px;
    padding-bottom: 0px;
  }

  .react-select__indicator {
    padding: 0 ${size('spacing.small')};
  }

  .react-select__indicator-separator {
    display: none;
  }

  .react-select__option, .react-select__single-value {
    margin-left: 0;
    display: flex;
    align-items: center;
    padding-left: ${size('text.hero')};
    background: transparent;

    &--is-selected  {
      color: ${palette('primary.base')};
      font-weight: ${size('weight.medium')};
    }
  }

  .react-select__group-heading {
    color: ${palette('primary', 'base')};
    font-weight: ${size('weight.bold')};
  }

  .react-select__menu {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    top: 100%;
    margin-top: 0px;
    min-width: max-content;
  }
`;

const StyledIcon = styled(Icon)`
  justify-content: center;
  margin: 0 ${size('spacing.small')} 0 0;
  align-self: baseline;
`;

SyncSelect.displayName = 'Select';
AsyncSelect.displayName = 'AsyncSelect';

const IconOption = ({ selectProps,  ...props }) => {
  const {  icon = 'check' } = props.data;
  const pp = props.data.palette || 'primary';
  const showIcon = props.data.icon || props.isSelected;
  return (
    <StyledOption showIcon={showIcon} palette={pp} {...props}>
      {showIcon && <StyledIcon icon={icon} size={selectProps.textSize} palette={pp} />}
      <span>{props.data.label}</span>
    </StyledOption>
  );
};

IconOption.propTypes = {
  selectProps: object,
  data: object,
  isSelected: bool,
};

const StyledSingleValue = styled(SingleValue)`
  &.react-select__single-value {
    top: unset;
    transform: unset;
    position: unset;
    min-width: max-content;
    padding-left: 0;
    ${StyledIcon} {
      justify-content: flex-start;
      margin-left: ${size('spacing.tiny')};
      margin-right: ${size('spacing.tiny')};
    }
    color: ${palette('base')};
  }
`;

const IconSingleValue = ({ selectProps, ...props }) => {
  const { palette: pp = 'primary', icon = 'check' } = props.data;
  const showIcon = !!props.data.icon;
  return (
    <StyledSingleValue showIcon={showIcon} palette={pp} {...props}>
      {showIcon && <StyledIcon icon={icon} size={selectProps.textSize} palette={pp} />}
      <span>{props.data.label}</span>
    </StyledSingleValue>
  );
};

IconSingleValue.propTypes = {
  selectProps: object,
  data: object,
  isSelected: bool,
};
const GroupSection = (props) => {
  const lastGroupLabel = props.selectProps.options.map(v => v.label).pop();
  return (
    <Group {...props}>
      {props.children}
      {props.label !== lastGroupLabel && <Hr marginTop="regular" />}
    </Group>
  );
};

GroupSection.propTypes = {
  children: node,
  selectProps: object,
  label: string,
};

const getTextSize = (size) => {
  const sizes = {
    tag: 'tiny',
    regular: 'caption',
    large: 'body',
  };
  const keys = getSizeKeys('element');
  let textSize = '';
  return keys.some((key) => {
    textSize = sizes[key] || textSize;
    return size === key;
  }) && textSize;
};

// hack to mix emotion and styled-components themes
const theme = theme => ({
  ...theme,
  palette: getKey('palette'),
  sizes: getKey('sizes'),
});

const Select = ({
  size,
  value,
  components,
  options,
  async,
  loadOptions,
  disabled,
  className,
  ...props
}) => {
  const SelectComponent = async
    ? AsyncSelect
    : SyncSelect;

  const flattenedOptions = options.reduce((acc, opt) => {
    if (opt.options) {
      acc.push(...opt.options);
    } else {
      acc.push(opt);
    }
    return acc;
  }, []);

  // the only occasion that we build the values from outside is when we are using
  // autocomplete, which doesn't have a given array of options
  if (flattenedOptions.length) {
    if (props.isMulti) {
      value = flattenedOptions.filter(o => (value || []).includes(o.value));
    } else {
      value = flattenedOptions.find((o => value === o.value));
    }
  }

  const textSize = getTextSize(size);

  return (
    <Wrapper
      textSize={textSize}
      size={size}
      className={className}
    >
      <SelectComponent
        className="react-select-container"
        classNamePrefix="react-select"
        theme={theme}
        options={options}
        loadOptions={loadOptions}
        value={value}
        textSize={textSize}
        components={{ Option: IconOption, Group: GroupSection, SingleValue: IconSingleValue, ...components }}
        blurInputOnSelect
        isDisabled={disabled}
        {...props}
      />
    </Wrapper>
  );
};

Select.propTypes = {
  size: oneOf(['tiny', 'small', 'regular', 'button', 'large']),
  lineHeight: string,
  className: string,
  async: bool,
  value: oneOfType([string, arrayOf(string)]),
  options: arrayOf(object).isRequired,
  components: object,
  loadOptions: func,
  isSearchable: bool,
  isMulti: bool,
  disabled: bool,
};

Select.defaultProps = {
  size: 'button',
  async: false,
  options: [],
  components: {},
  isSearchable: false,
};

export default Select;
