import React, { Component } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

import { isBrowser } from 'sly/web/config';
import theme from 'sly/web/components/themes/default';

export const MOBILE = 'mobile';
export const TABLET = 'tablet';
export const LAPTOP = 'laptop';

const { breakpoint: breakpoints } = theme.sizes;

const sizes = Object.keys(breakpoints).reduce((acc, key) => {
  acc[key] = parseInt(breakpoints[key], 10);
  return acc;
}, {});

class Breakpoint {
  constructor() {
    this.currentWidth = window.innerWidth;
  }

  atLeast(breakpoint) {
    if (!sizes[breakpoint]) {
      throw new Error(`no breakpoint ${breakpoint}`);
    }
    if (breakpoint === MOBILE) {
      return this.currentWidth < sizes[TABLET];
    }
    return this.currentWidth >= sizes[breakpoint];
  }

  atLeastTablet = () => this.atLeast(TABLET);
  atLeastLaptop = () => this.atLeast(LAPTOP);

  is(breakpoint) {
    if (!sizes[breakpoint]) {
      throw new Error(`no breakpoint ${breakpoint}`);
    }
    switch (breakpoint) {
      case MOBILE: return this.currentWidth < sizes[TABLET];
      case TABLET: return this.currentWidth >= sizes[TABLET] && this.currentWidth < this.sizes[LAPTOP];
      case LAPTOP: return this.currentWidth >= sizes[LAPTOP];
      default: return false;
    }
  }

  width = () => this.currentWidth;

  isMobile = () => this.is(MOBILE);
  isTablet = () => this.is(TABLET);
  isLaptop = () => this.is(LAPTOP);
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';
}

// WARNING: use with care, only in the browser.
// e.g. ALWAYS check if breakpoint is not null before usage:
// if(breakpoint && breakpoint.atLeastLaptop())... etc
export default function withBreakpoint(ChildComponent) {
  class WithBreakpoint extends Component {
    static displayName = `withBreakpoint(${getDisplayName(ChildComponent)})`;
    static WrappedComponent = ChildComponent;

    state = { breakpoint: null };

    componentDidMount() {
      if (isBrowser) {
        window.addEventListener('resize', this.setBreakpoint);
        this.setBreakpoint();
      }
    }

    componentWillUnmount() {
      if (isBrowser) {
        window.removeEventListener('resize', this.setBreakpoint);
      }
    }

    setBreakpoint = () => {
      this.setState({
        breakpoint: new Breakpoint(),
      });
    };

    render = () => (
      <ChildComponent
        breakpoint={this.state.breakpoint}
        {...this.props}
      />
    );
  }

  hoistNonReactStatic(WithBreakpoint, ChildComponent);

  return WithBreakpoint;
}

