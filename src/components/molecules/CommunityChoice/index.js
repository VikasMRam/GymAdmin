import React, { Component } from 'react';

import {
  oneOf,
  oneOfType,
  arrayOf,
  shape,
  string,
  number,
  func,
} from 'prop-types';

import styled from 'styled-components';
import { font, palette } from 'styled-theme';
import { ifProp, prop } from 'styled-tools';

import { size } from 'sly/components/themes';
import CommunityChoiceTile from 'sly/components/molecules/CommunityChoiceTile';

export default class CommunityChoice extends Component {
  static propTypes = {
    options: arrayOf(shape({
      value: oneOfType([string, number]).isRequired,
      label: string,
    })).isRequired,
    value: arrayOf(oneOfType([string, number])).isRequired,
  };

  static defaultProps = {
    value: [],
  };

  onClick(option) {
    const { value, onChange } = this.props;
    const index = value.indexOf(option);
    if (index === -1) {
      onChange([...value, option]);
    } else {
      const copy = [...value];
      copy.splice(index, 1);
      onChange(copy);
    }
  }

  render() {
    const {
      options, value, type, invalid, ...props
    } = this.props;
    return (
      <div {...props}>
        {options &&
          options.map(({ value: option, label, ...props }, i) => (
            <CommunityChoiceTile
              key={option+i}
              selected={value.includes(option)}
              onClick={() => this.onClick(option)}
              {...props}
            />
          ))}
      </div>
    );
  }
}
