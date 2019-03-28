import React, { Component } from 'react';
import { string, func, bool } from 'prop-types';
import styled, { css } from 'styled-components';

import { size, palette } from 'sly/components/themes';
import Span from 'sly/components/atoms/Span';

const Wrapper = styled.li`
  display: inline-block;
  list-style: none;
  margin-bottom: -${size('border', 'regular')};
  margin-right: ${size('spacing.small')};
  padding: ${size('spacing.regular')} ${size('spacing.large')};
  border-top-left-radius: ${size('border.xxLarge')};
  border-top-right-radius: ${size('border.xxLarge')};
  background-color: ${palette('grey', 'stroke')};
  border-bottom: ${size('border', 'regular')} solid ${palette('slate', 'stroke')};

  ${p => p.active && css`
    background-color: white;
    border: solid ${palette('slate', 'stroke')};
    border-width: ${size('border', 'regular')} ${size('border', 'regular')} 0 ${size('border', 'regular')};
    border-bottom: 0;
  `}
`;

class Tab extends Component {
  static propTypes = {
    active: bool.isRequired,
    label: string.isRequired,
    onClick: func.isRequired,
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
      },
    } = this;

    return (
      <Wrapper
        onClick={onClick}
        active={active}
      >
        <Span weight="medium">{label}</Span>
      </Wrapper>
    );
  }
}

export default Tab;
