import React, { Component } from 'react';
import { element } from 'prop-types';
import styled from 'styled-components';

const PopoverWrapper = styled.div`
  display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
  position: absolute;
  top: calc(100% + 5px);
  z-index: 1000;
  margin-right: auto;
`;

const Wrapper = styled.div`
  position: relative;
`;

export default class PopoverPortal extends Component {
  static propTypes = {
    button: element,
    children: element,
  };
  state = {
    isOpen: false,
  };

  onClick = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const { button, children } = this.props;
    const { isOpen } = this.state;
    const newButton = React.cloneElement(button, {
      onClick: this.onClick,
    });

    return (
      <Wrapper>
        {newButton}
        <PopoverWrapper isOpen={isOpen}>
          {children}
        </PopoverWrapper>
      </Wrapper>
    );
  }
}
