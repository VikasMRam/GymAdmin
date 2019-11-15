import React from 'react';
import SyncSelect, { components } from 'react-select';
import AsyncSelect from 'react-select/async';
import { func, string, arrayOf, object, bool, node, oneOf, oneOfType } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, palette, getKey } from 'sly/components/themes';
import Icon from 'sly/components/atoms/Icon';
import Hr from 'sly/components/atoms/Hr';

const { Option, Group, SingleValue } = components;

const StyledOption = styled(Option)`
  .react-select__menu-list &.react-select__option {
    ${ifProp('showIcon', css`padding-left: 0;`)};
    color: ${palette('base')};
  }
`;

const Wrapper = styled.div`
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
  }
  
  hr {
    padding: 0;
    margin: 0;
  }

  ${StyledOption} {
    min-height: ${p => size('element', p.size)};
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
    padding-left: ${size('icon.large')}; 
    background: transparent;
    
    &--is-selected  {
      color: ${palette('primary.base')};
      font-weight: ${size('weight.medium')};
    }
  }
  
  .react-select__group-heading {
    color: ${palette('secondary', 'base')};
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
  margin-right: ${size('spacing.small')};
  align-self: baseline;
  width: ${size('icon.large')};
`;

const StyledHr = styled(Hr)`
  margin-top: ${size('spacing.regular')};
  margin-bottom: 0;
`;

SyncSelect.displayName = 'Select';
AsyncSelect.displayName = 'AsyncSelect';

const getIconSize = (textSize) => {
  switch (textSize) {
    case 'micro':
    case 'tiny': return 'small';
    case 'caption': return 'caption';
    default: return 'regular';
  }
};

const IconOption = ({ selectProps,  ...props }) => {
  const iconSize = getIconSize(selectProps.textSize);
  const {  icon = 'check' } = props.data;
  const pp = props.data.palette || 'primary';
  const showIcon = props.data.icon || props.isSelected;
  return (
    <StyledOption showIcon={showIcon} palette={pp} {...props}>
      {showIcon && <StyledIcon icon={icon} size={iconSize} palette={pp} />}
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
    padding-left: 0;
    ${StyledIcon} {
      width: ${size('icon.regular')};
      justify-content: flex-start;
      margin-left: ${size('spacing.tiny')};
    }
    color: ${palette('base')};
  }
`;

const IconSingleValue = ({ selectProps, ...props }) => {
  const iconSize = getIconSize(selectProps.textSize);
  const { palette: pp = 'primary', icon = 'check' } = props.data;
  const showIcon = !!props.data.icon;
  return (
    <StyledSingleValue showIcon={showIcon} palette={pp} {...props}>
      {showIcon && <StyledIcon icon={icon} size={iconSize} palette={pp} />}
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
      {props.label !== lastGroupLabel && <StyledHr />}
    </Group>
  );
};

GroupSection.propTypes = {
  children: node,
  selectProps: object,
  label: string,
};

const getTextSize = (size) => {
  switch (size) {
    case 'tiny': return 'micro';
    case 'small':
    case 'regular': return 'tiny';
    case 'large': return 'body';
    default: return 'caption';
  }
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
  ...props
}) => {
  const SelectComponent = async
    ? AsyncSelect
    : SyncSelect;
  const reducer = (accumulator, currentValue) => accumulator.push(currentValue.options ? currentValue.options : currentValue) && accumulator;
  const values = options.reduce(reducer, []);
  const flattenedValues = values.reduce((a, b) => a.concat(b), []);
  value = flattenedValues.find(v => v.value === value) || value;

  const textSize = getTextSize(size);

  return (
    <Wrapper textSize={textSize} size={size} >
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
  async: bool,
  value: oneOfType([string, arrayOf(string)]),
  options: arrayOf(object).isRequired,
  components: object,
  loadOptions: func,
  isSearchable: bool,
  disabled: bool,
};

Select.defaultProps = {
  size: 'regular',
  async: false,
  options: [],
  components: {},
  isSearchable: false,
};

export default Select;
