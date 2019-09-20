import React, { Component } from 'react';
import { string, element } from 'prop-types';
import styled from 'styled-components';

import { Block } from 'sly/components/atoms';
import { size, palette } from 'sly/components/themes';
import ButtonLink from 'sly/components/molecules/ButtonLink';

const Wrapper = styled.div`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    position: relative;
  }
`;

const PopoverWrapper = styled.div`
  display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
  z-index: 1000;
  background: ${palette('white.base')};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    top: calc(100% + 5px);
    margin-right: auto;
  }
`;

const MobileHeader = styled.div`
  display: flex;
  padding: ${size('spacing.xLarge')} ${size('spacing.large')};
   
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: none;
  }
`;

const Title = styled(Block)`
  
  flex-grow: 1; 
`;

const Cloned = ({ element, ...props }) => React.cloneElement(element, props);

const StyledFilterButton = styled(Cloned)``;

const DoneButton = styled(ButtonLink)`
  padding: 0 ${size('spacing.large')};
`;

export default class PopoverPortal extends Component {
  static propTypes = {
    title: string,
    button: element,
    children: element,
  };

  state = { isOpen: true };

  onClick = () => this.setState({
    isOpen: !this.state.isOpen,
  });

  render() {
    const { button, children, title } = this.props;
    const { isOpen } = this.state;

    return (
      <Wrapper>
        <StyledFilterButton element={button} onClick={this.onClick} />
        <PopoverWrapper isOpen={isOpen}>
          <MobileHeader>
            <Title size="subtitle" weight="medium">{title}</Title>
            <DoneButton
              palette="primary"
              weight="medium"
              onClick={this.onClick}
            >
              Done
            </DoneButton>
          </MobileHeader>
          {children}
        </PopoverWrapper>
      </Wrapper>
    );
  }
}
