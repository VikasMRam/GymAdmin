import React, { Component } from 'react';
import { string, element } from 'prop-types';
import styled from 'styled-components';
import Measure from 'react-measure';

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

const StyledFilterButton = styled.div``;

const DoneButton = styled(ButtonLink)`
  padding: 0 ${size('spacing.large')};
`;

const Content = styled.div``;

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

  onContentResize = (params) => {
    console.log('content', params);
  };

  onButtonResize = (params) => {
    console.log('button', params);
  };

  render() {
    const { button, children, title } = this.props;
    const { isOpen } = this.state;

    return (
      <Wrapper>
        <Measure bounds onResize={this.onButtonResize}>
          {({ measureRef }) => (
            <StyledFilterButton
              innerRef={measureRef}
              onClick={this.onClick}
            >
              {button}
            </StyledFilterButton>
          )}
        </Measure>
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
          <Measure bounds onResize={this.onContentResize}>
            {({ measureRef }) => (
              <Content innerRef={measureRef}>
                {children}
              </Content>
            )}
          </Measure>
        </PopoverWrapper>
      </Wrapper>
    );
  }
}
