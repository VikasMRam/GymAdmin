import React from 'react';
import SyncSelect, { components } from 'react-select';
import AsyncSelect from 'react-select/async';
import { string, arrayOf, object, bool, node, oneOfType } from 'prop-types';
import styled from 'styled-components';

import { getKey, size, palette } from 'sly/components/themes';
import Icon from 'sly/components/atoms/Icon';
import Hr from 'sly/components/atoms/Hr';

const { Option, Group } = components;

const Wrapper = styled.div`
  .react-select-container {
    ${({ textSize }) => `font-size: ${size('text', textSize)}`};
  }

  .react-select__control {
    padding: -2px;
    border-color: ${palette('slate.stroke')};
    box-shadow: none;
    &--menu-is-open {
      border-color: ${palette('primary.base')};
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  
  .react-select__indicator-separator {
    display: none;
  }  
  
  .react-select__option {
    padding-left: ${size('spacing.xxxLarge')}; 
    background: transparent;
    &--is-selected {
      color: ${palette('primary.base')};
      font-weight: ${size('weight.medium')};
      padding-left: calc(${size('spacing.large')} + ${size('spacing.small')});
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

const theme = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: getKey('palette.primary.base'),
  },
});

const StyledIcon = styled(Icon)`
  margin-right: ${size('spacing.regular')};
`;

const StyledHr = styled(Hr)`
  margin-top: ${size('spacing.regular')};
  margin-bottom: 0;
`;

SyncSelect.displayName = 'Select';
AsyncSelect.displayName = 'AsyncSelect';

const IconOption = props => (
  <Option {...props}>
    {props.isSelected && <StyledIcon icon="check" size="small" palette="primary" />}
    {props.data.label}
  </Option>
);

IconOption.propTypes = {
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

const Select = ({
  textSize,
  value,
  options,
  async,
  loadOptions,
  ...props,
}) => {
  const SelectComponent = async
    ? AsyncSelect
    : SyncSelect;
  const reducer = (accumulator, currentValue) => accumulator.push(currentValue.options ? currentValue.options : currentValue) && accumulator;
  const values = options.reduce(reducer, []);
  const flattenedValues = values.reduce((a, b) => a.concat(b), []);
  value = flattenedValues.find(v => v.value === value) || value;

  return (
    <Wrapper textSize={textSize}>
      <SelectComponent
        className="react-select-container"
        classNamePrefix="react-select"
        options={options}
        loadOptions={loadOptions}
        defaultValue={value}
        theme={theme}
        components={{ Option: IconOption, Group: GroupSection }}
        blurInputOnSelect
        {...props}
      />
    </Wrapper>
  );
};

// v6hEox4BtF

Select.propTypes = {
  async: bool,
  value: oneOfType([string, arrayOf(string)]),
  textSize: string,
  options: arrayOf(object).isRequired,
};

Select.defaultProps = {
  async: false,
  options: [],
};

export default Select;
