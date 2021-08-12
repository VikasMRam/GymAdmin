import React from 'react';
import {
  oneOfType,
  arrayOf,
  shape,
  string,
  number,
  func,
  bool,
} from 'prop-types';
import styled from 'styled-components';

import { color, space } from 'sly/common/system';


const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${color('slate.lighter-90')};
  border-radius: 20px;
`;


const Switch = styled.label`
  cursor: pointer;
  position: relative;
  transition: background-color 0.2s;
  flex: 1
`;

const Label = styled.div`
  display: block;
  padding: ${space('xxs')};
  border-radius: ${space('m')};
  text-align: center;
  margin: 6px;
`;

const StyledInput = styled.input`
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1000;

  &:checked + ${Label} {
    background-color: white;
    transition: 0.2s;
  }
`;

const isSelected = (value, option) => value.includes(option);

const ToggleOptions = ({
  onChange,
  options,
  value,
  onBlur,
  invalid,
  initialValue,
  ...props
}) => {
  const [toggleValue, setToggleValue] = React.useState(() => initialValue);

  const onBlurOption = () => {
    onBlur(value);
  };

  const onClick = (option, e) => {
    if (e.target.checked) {
      setToggleValue(option);
    } else {
      setToggleValue(options.find(({ value }) => value !== option).value);
    }
  };

  React.useEffect(() => {
    onChange(toggleValue);
  }, [toggleValue]);

  return (
    <Wrapper onBlur={onBlurOption} {...props}>
      {options &&
        options.map(({
          value: option, label,
        }) => {
          return (
            <React.Fragment key={option}>
              <Switch>
                <StyledInput
                  type="checkbox"
                  name="toggle"
                  checked={isSelected(value, option)}
                  onClick={e => onClick(option, e)}
                  readOnly
                />
                <Label>{label}</Label>
              </Switch>
            </React.Fragment>
          );
          },
        )
      }
    </Wrapper>
  );
};

ToggleOptions.propTypes = {
  options: arrayOf(shape({
    value: oneOfType([string, number]).isRequired,
    label: string,
  })).isRequired,
  invalid: bool,
  value: oneOfType([
    oneOfType([string, number]),
    arrayOf(oneOfType([string, number])),
  ]).isRequired,
  onBlur: func,
  onChange: func,
  initialValue: string,
};

export default ToggleOptions;
