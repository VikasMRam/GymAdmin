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
import CommunityTile from 'sly/components/molecules/CommunityTile';

const StyledCommunityTile = styled(CommunityTile)`
  margin-right: ${size('spacing.large')};
  margin-bottom: ${size('spacing.large')};
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -${size('spacing.large')};
  margin-bottom: -${size('spacing.large')};
`;

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
      options, value, type, ...props
    } = this.props;
    return (
      <Wrapper type={type} {...props}>
        {options &&
          options.map(({ value: option, label, ...props }, i) => (
            <StyledCommunityTile
              key={option+i}
              selectable
              selected={value.includes(option)}
              onClick={() => this.onClick(option)}
              {...props}
            />
          ))}
      </Wrapper>
    );
  }
}
