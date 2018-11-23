import React, { Component } from 'react';
import { string, number, bool, func } from 'prop-types';

import Rating from 'sly/components/molecules/Rating';

const getPalette = ({ disabled, palette }) => disabled
  ? 'slate'
  : palette;

const getDefaultValue = (props) => {
  const { value, defaultValue } = props;
  return typeof value === 'number'
    ? value
    : defaultValue;
};


export default class RatingInput extends Component {
  static propTypes = {
    id: string,
    value: number,
    defaultValue: number,
    disabled: bool,
    onChange: func,
  };

  static defaultProps = {
    defaultValue: 3.5,
  };

  state = { value: getDefaultValue(this.props) };

  onClick = (event) => {
    const { onChange, disabled } = this.props;

    if (disabled) {
      return;
    }

    const nextValue = this.getValue(event);
    if (onChange) {
      onChange(nextValue);
    }
    this.setState({ value: nextValue });
  };

  onMouseOver = (event) => {
    const { disabled } = this.props;

    if (disabled) {
      return;
    }

    const { value } = this.state;
    const nextValue = this.getValue(event);
    if (value !== nextValue) {
      this.setState({ value: nextValue });
    }
  };

  onMouseOut = () => {
    const { disabled } = this.props;

    if (disabled) {
      return;
    }

    this.resetValue();
  };

  getValue = (event) => {
    const currentValue = this.state.value;
    const { current } = this.innerRef;
    const clientRect = current.getBoundingClientRect();
    const { left } = clientRect;
    const last = current.children[current.children.length - 1];
    const lastClientRect = last.getBoundingClientRect();
    const right = lastClientRect.left + last.offsetWidth;

    if (event.clientX > right) {
      return currentValue;
    }

    const value = (event.clientX - left) / (right - left);
    return Math.ceil(value * 5.0);
  };

  innerRef = React.createRef();

  resetValue = () => {
    this.setState({ value: getDefaultValue(this.props) });
  };

  render() {
    const { value } = this.state;
    const { defaultValue, value: discardValue, ...props } = this.props;
    return (
      <Rating
        innerRef={this.innerRef}
        value={value}
        onClick={this.onClick}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        palette={getPalette(props)}
        {...props}
      />
    );
  }
}

