import React, { Component } from 'react';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { palette, size } from 'sly/components/themes';

const bodyClassName = 'ReactModal__Body--open';

const ResponsiveOverlay = styled.div`
  @media screen and (max-width: ${size('breakpoint.laptop')}) {
    visibility: ${ifProp('isOpen', 'visible', 'hidden')};
    position: absolute;
    background-color: ${palette('slate', 'base')};
    background-color: ${palette('slate', 'base')}e5;
    z-index: 100;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

const ResponsiveContent = styled.div`
  @media screen and (max-width: ${size('breakpoint.laptop')}) {
    visibility: ${ifProp('isOpen', 'visible', 'hidden')};
    position: absolute;
    background-color: ${palette('white', 'base')};
    z-index: 101 !important;
    top: 0;
    bottom: 0;
    left: 0;
    padding: ${size('spacing', 'xxLarge')};
  }
`;

export default class ResponsiveSidebar extends Component {
  componentDidMount() {
    if(this.props.isOpen) {
      document.body.classList.add();
    }
  }

  componentDidUpdate({ isOpen: wasOpen }) {
    const { isOpen } = this.props;

    if(wasOpen !== isOpen) {
      if(isOpen) {
        document.body.classList.add(bodyClassName);
      } else {
        document.body.classList.remove(bodyClassName);
      }
    }
  }

  componentWillUnmount() {
    document.body.classList.remove(bodyClassName);
  }

  handleOverlayClick = (e) => {
    if(e.target === e.currentTarget) {
      this.props.onCloseRequested();
    }

    e.preventDefault();
  };

  render() {
    const { children, isOpen } = this.props;

    return (
      <ResponsiveOverlay onClick={this.handleOverlayClick} isOpen={isOpen} ref={this.overlayRef}>
        <ResponsiveContent isOpen={isOpen}>{children}</ResponsiveContent>
      </ResponsiveOverlay>
    )
  }
}
