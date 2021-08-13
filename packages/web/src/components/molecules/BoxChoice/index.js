import React, { Component } from 'react';
import { arrayOf, oneOfType, string, func, bool, shape, number, object } from 'prop-types';

import { BoxChoiceTile } from 'sly/web/components/atoms';

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
    lastChildProps: object.isRequired,
    hasRadio: bool,
  };

  static defaultProps = {
    value: [],
    lastChildProps: {},
    hasRadio: false,
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
      value, options, multiChoice, hasRadio, lastChildProps, ...props
    } = this.props;

    return (
      <>
        {options.map((option, i) => {
          const extraProps = i === options.length - 1 ? lastChildProps : {};

          return (
            <BoxChoiceTile
              /* allow hiding checkbox using props, hence put this before expanding props */
              hasCheckbox={multiChoice}
              hasRadio={hasRadio}
              {...props}
              {...extraProps}
              key={option.value}
              selected={isSelected(multiChoice, value, option.value)}
              onClick={() => this.onClick(option.value)}
              label={option.label}
              description={option?.description}
            />
          );
        })}
      </>
    );
  }
}
