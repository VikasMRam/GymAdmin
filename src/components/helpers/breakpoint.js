import React, { Component } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

import { isBrowser } from 'sly/config';
import theme from 'sly/components/themes/default';

export const MOBILE = 'mobile';
export const TABLET = 'tablet';
export const LAPTOP = 'laptop';

const { breakpoint: breakpoints } = theme.sizes;

class Breakpoint {
  constructor() {
    this.sizes = Object.keys(breakpoints).reduce((acc, key) => {
      acc[key] = parseInt(breakpoints[key], 10);
      return acc;
    }, {});

    if (isBrowser) {
      window.addEventListener('resize', () => {
        this.currentWidth = window.innerWidth;
      });
      this.currentWidth = window.innerWidth;
    } else {
      this.currentWidth = this.sizes.laptop;
    }
  }

  atLeast(breakpoint) {
    if (!this.sizes[breakpoint]) {
      throw new Error(`no breakpoint ${breakpoint}`);
    }
    if (breakpoint === MOBILE) {
      return this.currentWidth < this.sizes[TABLET];
    }
    return this.currentWidth >= this.sizes[breakpoint];
  }

  atLeastTablet = () => this.atLeast(TABLET);
  atLeastLaptop = () => this.atLeast(LAPTOP);

  is(breakpoint) {
    if (!this.sizes[breakpoint]) {
      throw new Error(`no breakpoint ${breakpoint}`);
    }
    switch (breakpoint) {
      case MOBILE: return this.currentWidth < this.sizes[TABLET];
      case TABLET: return this.currentWidth >= this.sizes[TABLET] && this.currentWidth < this.sizes[LAPTOP];
      case LAPTOP: return this.currentWidth >= this.sizes[LAPTOP];
      default: return false;
    }
  }

  isMobile = () => this.is(MOBILE);
  isTablet = () => this.is(TABLET);
  isLaptop = () => this.is(LAPTOP);
}

const breakpoint = new Breakpoint();

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';
}

export default function withBreakpoint(ChildComponent) {
  class WithBreakpoint extends Component {
    static displayName = `withBreakpoint(${getDisplayName(ChildComponent)})`;
    static WrappedComponent = ChildComponent;

    render = () => {
      return (
        <ChildComponent breakpoint={breakpoint} {...this.props} />
      );
    }
  }

  hoistNonReactStatic(WithBreakpoint, ChildComponent);

  return WithBreakpoint;
}

