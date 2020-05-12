import React, { Component } from 'react';
import { string, number, bool, func, oneOf } from 'prop-types';
import styled, { css } from 'styled-components';
import { prop, switchProp, ifProp } from 'styled-tools';
import omit from 'lodash/omit';

import { size, palette } from 'sly/web/components/themes';

const thumbColor = ({ disabled }) => palette(disabled ? 2 : 0);

const barColor = palette('slate', 'stroke');

const hoverThumbColor = ({ disabled }) => !disabled && palette('base');

const thumbHeight = size('slider.knobHeight');
const thumbWidth = size('slider.knobWidth');
const barHeight = size('spacing.small');

const border = '0rem solid transparent';
const thumbBorderRadius = size('spacing.small');
const trackBorderRadius = size('spacing.nano');

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: ${size};
  color: ${palette('slate', 'filler')};
  background-color: transparent;
  ${switchProp('valuePosition', {
    bottom: css`
      flex-flow: column;
      align-items: flex-start;`,
    top: css`
      flex-flow: column-reverse;
      align-items: flex-start;`,
  })};
`;

const SliderBar = styled.input`
  -webkit-appearance: none;
  width: 100%;
  margin: 0;
  height: ${size('element.regular')};
  background: transparent;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: ${thumbColor};
    border: ${border};
    height: ${thumbHeight};
    width: ${thumbWidth};
    border-radius: ${thumbBorderRadius};
    cursor: pointer;
    // hack: test and fix
    margin-top: -0.95rem;
    transition: background 0.15s ease-in-out;
    &:hover {
      background: ${hoverThumbColor};
    }
  }

  &::-moz-range-thumb {
    background: ${thumbColor};
    height: ${thumbHeight};
    width: ${thumbWidth};
    border: ${border};
    border-radius: ${thumbBorderRadius};
    cursor: pointer;
    transition: background 0.15s ease-in-out;
    &:hover {
      background: ${hoverThumbColor};
    }
  }

  &::-ms-thumb {
    height: ${thumbHeight};
    width: ${thumbWidth};
    cursor: pointer;
    border: ${border};
    border-radius: ${thumbBorderRadius};
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: ${barHeight};
    background: ${barColor};
    border-radius: ${trackBorderRadius};
    border: ${border};
  }

  &::-ms-track {
    width: 100%;
    height: ${barHeight};
    border: ${border};
    border-radius: ${trackBorderRadius};
    color: transparent;
  }

  &::-moz-range-track {
    width: 100%;
    height: ${barHeight};
    background: ${barColor};
    border-radius: ${trackBorderRadius};
    border: ${border};
  }

  &::-moz-range-progress {
    background: ${thumbColor};
  }

  &::-ms-fill-lower {
    background: ${thumbColor};
    border: ${border};
    border-radius: ${trackBorderRadius};
  }

  &::-ms-fill-upper {
    background: ${barColor};
    border: ${border};
    border-radius: ${trackBorderRadius};
  }
`;

const Value = styled.span`
  text-align: right;
  ${ifProp({ valuePosition: 'right' }, `
    width: ${props => size('slider.valueWidth', prop('width')(props))(props)};`)}
`;

class Slider extends Component {
  state = {
    value: this.props.value,
  };

  onChange = ({ target }) => {
    const { onChange } = this.props;
    const value = parseFloat(target.value);
    if (onChange) {
      onChange(value);
    }
    this.setState({ value });
  };

  onBlur = ({ target }) => {
    const { onBlur } = this.props;
    onBlur(parseFloat(target.value));
  };

  render() {
    const {
      id,
      min,
      max,
      valueWidth,
      valueParse,
      step,
      onChange,
      onBlur,
      ...props
    } = this.props;

    const { value } = this.state;

    return (
      <Wrapper {...props}>
        <SliderBar
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          onChange={this.onChange}
          onBlur={this.onBlur}
          {...omit(props, 'type')}
        />
        <Value {...props} width={valueWidth}>{valueParse(value)}</Value>
      </Wrapper>
    );
  }
}

Slider.propTypes = {
  id: string,
  type: string,
  min: number,
  max: number,
  step: number,
  value: number,
  disabled: bool,
  valueParse: func,
  valueWidth: oneOf(['small', 'regular', 'large']),
  valuePosition: oneOf(['right', 'top', 'bottom']),
  onChange: func,
  onBlur: func,
};

Slider.defaultProps = {
  min: 0,
  max: 2,
  step: 1,
  palette: 'primary',
  valueParse: val => val,
  valueWidth: 'regular',
  valuePosition: 'right',
};

export default Slider;
