import React, { Component } from 'react';
import { string, func } from 'prop-types';
import styled, { css } from 'styled-components';

import Span from '../Span/index';

import { size } from 'sly/components/themes/index';

const Wrapper = styled.li`
  display: inline-block;
  list-style: none;
  margin-bottom: -1px;
  margin-right: ${size('spacing.small')};
  padding: ${size('spacing.regular')} ${size('spacing.large')};
  border-top-left-radius: ${size('border.xxLarge')};
  border-top-right-radius: ${size('border.xxLarge')};
  background-color: #EAEBEC;
  border-bottom: 1px solid #DFE1E2;

  ${p => p.active && css`
    background-color: white;
    border: solid #DFE1E2;
    border-width: 1px 1px 0 1px;
    border-bottom: 0;
  `}
`;

class Tab extends Component {
  static propTypes = {
    activeTab: string.isRequired,
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
        activeTab,
        label,
      },
    } = this;

    return (
      <Wrapper
        onClick={onClick}
        active={activeTab === label}
      >
        <Span weight="medium">{label}</Span>
      </Wrapper>
    );
  }
}

export default Tab;
