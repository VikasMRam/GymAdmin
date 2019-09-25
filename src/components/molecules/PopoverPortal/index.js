import React, { Component } from 'react';
import { string, element, object } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';
import Measure from 'react-measure';

import { Block } from 'sly/components/atoms';
import { size, palette } from 'sly/components/themes';
import ButtonLink from 'sly/components/molecules/ButtonLink';
import withBreakpoint from 'sly/components/helpers/breakpoint';

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
    ${ifProp('left', css`
      left: calc(${p => p.left}px - ${size('spacing.xLarge')});
    `)}
    margin-right: auto;
    width: unset;
    height: unset;
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

@withBreakpoint

export default class PopoverPortal extends Component {
  static propTypes = {
    title: string,
    button: element,
    children: element,
    breakpoint: object,
  };

  state = {
    isOpen: false,
    buttonX: 0,
    left: 0,
  };

  onClick = () => this.setState({
    isOpen: !this.state.isOpen,
  });

  onButtonResize = ({ bounds }) => {
    const { left } = bounds;
    this.setState({ buttonX: left });
  };

  onContentResize = ({ bounds }) => {
    const { width } = bounds;
    this.setState({ width });
  };

  render() {
    const { button, children, title, breakpoint } = this.props;
    const { isOpen, width, buttonX } = this.state;

    const total = buttonX + width;
    const left = breakpoint && total > breakpoint.width()
      ? breakpoint.width() - total
      : 0;

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
        <PopoverWrapper left={left} isOpen={isOpen}>
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
          <Measure bounds client onResize={this.onContentResize}>
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
