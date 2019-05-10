import React, { Component } from 'react';
import { string, func, bool, array } from 'prop-types';
import styled, { css } from 'styled-components';

import { size, palette } from 'sly/components/themes';
import Span from 'sly/components/atoms/Span';

const Wrapper = styled.li`
  display: inline-block;
  list-style: none;
  padding-bottom: calc(${size('spacing.large')} - ${size('border.xxLarge')});
  margin-right: ${size('spacing.xLarge')};
  background-color: ${palette('white', 'base')};

  ${p => p.active && css`
    border-bottom: ${size('border', 'xxLarge')} solid ${palette('slate', 'base')};
  `}

  ${p => p.tabStyles}
`;

class Tab extends Component {
  static propTypes = {
    active: bool.isRequired,
    label: string.isRequired,
    onClick: func.isRequired,
    className: string,
    tabStyles: array,
  };

  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  }

  render() {
    const {
      onClick,
      props: {
        active,
        label,
        className,
        tabStyles,
      },
    } = this;

    let spanPalette = 'slate';
    let spanVariation = 'filler';
    if (active) {
      spanPalette = 'slate';
      spanVariation = 'base';
    }
    return (
      <Wrapper
        onClick={onClick}
        active={active}
        className={className}
        tabStyles={tabStyles}
      >
        <Span weight="bold" size="tiny" palette={spanPalette} variation={spanVariation}>{label}</Span>
      </Wrapper>
    );
  }
}

export default Tab;
