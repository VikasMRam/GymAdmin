import React, { Component } from 'react';
import { string, element, object } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';
import Measure from 'react-measure';

import { Block } from 'sly/components/atoms';
import { size, palette } from 'sly/components/themes';
import ButtonLink from 'sly/components/molecules/ButtonLink';
import withBreakpoint from 'sly/components/helpers/breakpoint';
import theme from 'sly/components/themes/default';

const gutter = parseFloat(theme.sizes.layout.gutter) * 16;

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
    ${ifProp('left', css`left: ${p => p.left}px;`)}
    margin-right: auto;
    width: unset;
    height: unset;
  }
`;

const MobileHeader = styled.div`
  display: flex;
  padding: ${size('spacing.xLarge')} ${size('spacing.large')};
  border-bottom: 1px solid ${palette('slate.stroke')};
  align-items: center;
   
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: none;
  }
`;

const Title = styled(Block)`
  ${ifProp('hasHeaderButton', css`text-align: center;`)};  
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
    subtitle: string,
    button: element,
    headerButton: element,
    children: element,
    breakpoint: object,
  };

  state = {
    isOpen: false,
    buttonX: 0,
  };

  ref = React.createRef();

  componentDidMount = () => {
    document.addEventListener('click', this.onDocumentClick);
    document.addEventListener('keyup', this.onKeyUp);
  };

  componentWillUnmount = () => {
    document.removeEventListener('click', this.onDocumentClick);
    document.removeEventListener('keyup', this.onKeyUp);
  };

  onDocumentClick = (event) => {
    const { isOpen } = this.state;
    // check if the element is not being already removed from the dom,
    // which means that it is probably the element that received the click
    if (isOpen && document.contains(event.target) && !this.ref.current.contains(event.target)) {
      this.toggle();
    }
  };

  onKeyUp = (event) => {
    const { isOpen } = this.state;
    if (isOpen && event.code === 'Escape') {
      this.toggle();
    }
  };

  toggle = () => this.setState({
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
    const { button, children, title, subtitle, headerButton, breakpoint } = this.props;
    const { isOpen, width, buttonX } = this.state;

    const total = buttonX + width + gutter;
    const left = breakpoint && total > breakpoint.width()
      ? breakpoint.width() - total
      : 0;

    return (
      <Wrapper innerRef={this.ref}>
        <Measure bounds onResize={this.onButtonResize}>
          {({ measureRef }) => (
            <StyledFilterButton
              innerRef={measureRef}
              onClick={this.toggle}
            >
              {button}
            </StyledFilterButton>
          )}
        </Measure>
        <PopoverWrapper left={left} isOpen={isOpen}>
          <MobileHeader>
            {headerButton}
            <Title hasHeaderButton={!!headerButton} size="regular" weight="medium">
              {title}
              {subtitle && <Block size="caption" weight="regular" palette="grey">{subtitle}</Block>}
            </Title>
            <DoneButton
              palette="primary"
              weight="medium"
              size="caption"
              onClick={this.toggle}
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
