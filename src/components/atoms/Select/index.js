import React from 'react';
import SyncSelect, { components } from 'react-select';
import AsyncSelect from 'react-select/async';
import { func, string, arrayOf, object, bool, node, oneOf, oneOfType } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { getKey, size, palette } from 'sly/components/themes';
import Icon from 'sly/components/atoms/Icon';
import Hr from 'sly/components/atoms/Hr';

const { Option, Group } = components;

const StyledOption = styled(Option)`
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
  
  hr {
    padding: 0;
    margin: 0;
  }

  ${StyledOption} {
    min-height: ${p => size('element', p.size)};
  }
  
  .react-select__control {
    padding: -2px;
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
  
  .react-select__indicator-separator {
    display: none;
  }  
  
  .react-select__option {
    display: flex;
    align-items: center;
    padding-left: ${size('icon.large')}; 
    background: transparent;
    &--is-selected {
      color: ${palette('primary.base')};
      font-weight: ${size('weight.medium')};
      padding-left: 0;
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
  justify-content: center;
  width: ${size('icon.large')};
  height: 1em;
`;

const StyledHr = styled(Hr)`
  margin-top: ${size('spacing.regular')};
  margin-bottom: 0;
`;

SyncSelect.displayName = 'Select';
AsyncSelect.displayName = 'AsyncSelect';

const getIconSize = (selectSize) => {
  switch (selectSize) {
    case 'small': return 'cmall';
    case 'button': return 'caption';
    default: return 'regular';
  }
};

const IconOption = ({ selectProps, ...props }) => {
  const iconSize = getIconSize(selectProps.size);
  return (
    <StyledOption {...props}>
      <div>
        {props.isSelected && <StyledIcon icon="check" size={iconSize} palette="primary" />}
        {props.data.label}
      </div>
    </StyledOption>
  );
}

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
  size,
  textSize,
  value,
  options,
  async,
  loadOptions,
  ...props
}) => {
  const SelectComponent = async
    ? AsyncSelect
    : SyncSelect;
  const reducer = (accumulator, currentValue) => accumulator.push(currentValue.options ? currentValue.options : currentValue) && accumulator;
  const values = options.reduce(reducer, []);
  const flattenedValues = values.reduce((a, b) => a.concat(b), []);
  value = flattenedValues.find(v => v.value === value) || value;

  return (
    <Wrapper textSize={textSize} size={size}>
      <SelectComponent
        className="react-select-container"
        classNamePrefix="react-select"
        options={options}
        loadOptions={loadOptions}
        defaultValue={value}
        size={size}
        theme={theme}
        components={{ Option: IconOption, Group: GroupSection }}
        blurInputOnSelect
        {...props}
      />
    </Wrapper>
  );
};

Select.propTypes = {
  size: oneOf([ 'small', 'regular', 'button', 'large' ]),
  textSize: string,
  lineHeight: string,
  async: bool,
  value: oneOfType([string, arrayOf(string)]),
  options: arrayOf(object).isRequired,
  loadOptions: func,
};

Select.defaultProps = {
  size: 'regular',
  async: false,
  options: [],
};

export default Select;
