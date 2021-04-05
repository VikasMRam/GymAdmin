import React, {
  Component,
  useContext,
  useLayoutEffect, useMemo,
  useState,
} from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import debounce from 'lodash/debounce';
import { node } from 'prop-types';

import theme from 'sly/common/system/theme';

export const MOBILE = 'mobile';
export const TABLET = 'tablet';
export const LAPTOP = 'laptop';

const { breakpoint: breakpoints } = theme;

const sizes = Object.keys(breakpoints).reduce((acc, key) => {
  acc[key] = parseInt(breakpoints[key], 10);
  return acc;
}, {});

class Breakpoint {
  constructor(currentWidth, scrollY) {
    this.currentWidth = currentWidth;
    this.scrollY = scrollY;
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

  upTo(breakpoint) {
    if (!sizes[breakpoint]) {
      throw new Error(`no breakpoint ${breakpoint}`);
    }
    return this.currentWidth < sizes[breakpoint];
  }

  upToTablet = () => this.upTo(TABLET);
  upToLaptop = () => this.upTo(LAPTOP);

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

  isMobile = () => this.upTo(TABLET);
  isTablet = () => this.is(TABLET);
  isLaptop = () => this.is(LAPTOP);
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';
}

const BreakpointContext = React.createContext(null);

export const BreakpointProvider = ({ children }) => {
  const [breakpoint, setBreakpoint] = useState(new Breakpoint(window.innerWidth, window.scrollY));

  const debouncedNewBreakpoint = useMemo(() => debounce(() => {
    setBreakpoint(new Breakpoint(window.innerWidth, window.scrollY));
  }), []);

  const newBreakpoint = useMemo(() => () => window.requestAnimationFrame(debouncedNewBreakpoint, 150), []);

  useLayoutEffect(() => {
    window.addEventListener('resize', newBreakpoint);
    window.addEventListener('scroll', newBreakpoint);
    return () => {
      window.removeEventListener('resize', newBreakpoint);
      window.removeEventListener('scroll', newBreakpoint);
    };
  }, []);

  return (
    <BreakpointContext.Provider value={breakpoint}>
      {children}
    </BreakpointContext.Provider>
  );
};

BreakpointProvider.propTypes = {
  children: node,
};

export const useBreakpoint = () => {
  return  useContext(BreakpointContext);
};

// WARNING: use with care, only in the browser.
// e.g. ALWAYS check if breakpoint is not null before usage:
// if(breakpoint && breakpoint.atLeastLaptop())... etc
export default function withBreakpoint(ChildComponent) {
  class WithBreakpoint extends Component {
    static displayName = `withBreakpoint(${getDisplayName(ChildComponent)})`;
    static WrappedComponent = ChildComponent;

    render = () => (
      <BreakpointContext.Consumer>
        {breakpoint => <ChildComponent breakpoint={breakpoint} {...this.props} />}
      </BreakpointContext.Consumer>
    );
  }

  hoistNonReactStatic(WithBreakpoint, ChildComponent);

  return WithBreakpoint;
}

