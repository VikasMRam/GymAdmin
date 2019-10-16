import React, { Component } from 'react';
import { arrayOf, oneOfType, string, func, bool, shape, number } from 'prop-types';

import { BoxChoiceTile } from 'sly/components/atoms';

const isSelected = (multiChoice, value, option) => (multiChoice)
  ? value.includes(option)
  : value === option;

export default class BoxChoice extends Component {
  static propTypes = {
    options: arrayOf(shape({
      value: oneOfType([string, number]).isRequired,
      label: string,
    })).isRequired,
    multiChoice: bool,
    value: oneOfType([
      oneOfType([string, number]),
      arrayOf(oneOfType([string, number])),
    ]).isRequired,
    onChange: func.isRequired,
  };

  static defaultProps = {
    value: [],
  };

  onClick(option) {
    const { value, onChange, multiChoice } = this.props;
    if (!multiChoice) {
      return onChange(option);
    }

    const index = value.indexOf(option);
    if (index === -1) {
      return onChange([...value, option]);
    }

    const copy = [...value];
    copy.splice(index, 1);
    return onChange(copy);
  }

  render() {
    const {
      value, options, multiChoice,
    } = this.props;

    return (
      <>
        {options.map(option => (
          <BoxChoiceTile
            key={option.value}
            selected={isSelected(multiChoice, value, option.value)}
            onClick={() => this.onClick(option.value)}
            label={option.label}
          />
        ))}
      </>
    );
  }
}
