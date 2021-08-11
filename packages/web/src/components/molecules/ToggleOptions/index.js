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
  padding: ${space('m')};
  border-radius: ${space('m')};
  text-align: center;
`;

const StyledInput = styled.input`
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1000;
`;

const Slider = styled.div`
  position: absolute;
  width: 50%;
  background: ${color('white.base')};
  height: 80%;
  margin: 5.5px;
  border-radius: 20px;
  margin-left: ${props => !props.on && '-5.5px'};
  transform: ${props => props.on ? 'translate(0)' : 'translate(100%)'};
  transition: 0.2s;
`;


const isSelected = (value, option) => value.includes(option);


const ToggleOptions = ({
  onChange,
  options,
  value,
  onBlur,
  invalid,
  ...props
}) => {
  const [toggle, setToggle] = React.useState(() => value === options[0].value);
  const [toggleValue, setToggleValue] = React.useState(() => value);

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

  const handleChecked = () => {
    setToggle(!toggle);
  };

  React.useEffect(() => {
    onChange(toggleValue);
  }, [toggleValue]);

  return (
    <Wrapper onBlur={onBlurOption} {...props}>
      <Slider on={toggle} />
      {options &&
        options.map(({
          value: option, label,
        }) => {
          return (
            <React.Fragment key={option}>
              <Switch onClick={handleChecked}>
                <StyledInput
                  type="checkbox"
                  name="toggle"
                  checked={isSelected(value, option)}
                  onClick={e => onClick(option, e)}
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
};

export default ToggleOptions;
