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
import { Button } from 'sly/components/atoms';
import { CommunityTile } from 'sly/components/molecules';

const StyledButton = styled(Button)`
  margin-right: ${size('spacing.small')};
  &:last-child {
    margin-right: none;
  }
`;

const StyledCommunityTile = styled(CommunityTile)`
  margin-right: ${size('spacing.large')};
  margin-bottom: ${size('spacing.large')};
`;

const getComponent = type =>
  type === 'communitychoice' ? StyledCommunityTile : StyledButton;

const getGutter = ({ type }) => 
  type === 'communitychoice' ? size('spacing.large') : size('spacing.small');

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -${getGutter};
  margin-bottom: -${getGutter};
`;

export default class MultipleChoice extends Component {
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
    const { options, value, type, ...props } = this.props;
    const ChoiceComponent = getComponent(type);
    return (
      <Wrapper type={type} {...props}>
        {options &&
          options.map(({ value: option, label, ...props }, i) => (
            <ChoiceComponent
              selectable
              ghost={!value.includes(option)}
              key={option+i}
              onClick={() => this.onClick(option)}
              {...props}
            >
              {label}
            </ChoiceComponent>
          ))}
      </Wrapper>
    );
  }
}
