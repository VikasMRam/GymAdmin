import React, { Component } from 'react';
import { string, func, bool } from 'prop-types';
import styled, { css } from 'styled-components';

import { size, palette } from 'sly/components/themes';
import Span from 'sly/components/atoms/Span';

const Wrapper = styled.li`
  display: inline-block;
  list-style: none;
  padding: ${size('spacing.large')} ${size('spacing.xLarge')};
  background-color: ${palette('white', 'base')};

  ${p => p.active && css`
    border-bottom: ${size('border', 'xxLarge')} solid ${palette('slate', 'base')};
  `}
`;

class Tab extends Component {
  static propTypes = {
    active: bool.isRequired,
    label: string.isRequired,
    onClick: func.isRequired,
    className: string,
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
      },
    } = this;

    let spanPalette = 'grey';
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
      >
        <Span weight="medium" palette={spanPalette} variation={spanVariation}>{label}</Span>
      </Wrapper>
    );
  }
}

export default Tab;
