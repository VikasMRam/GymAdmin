import React, {
  Component,
  useContext,
  useLayoutEffect, useMemo,
  useState,
} from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import debounce from 'lodash/debounce';
import { node } from 'prop-types';

import { isBrowser } from 'sly/web/config';
import theme from 'sly/common/system/theme';

export const MOBILE = 'mobile';
export const TABLET = 'tablet';
export const LAPTOP = 'laptop';

export const PORTRAIT = 'portrait';
export const LANDSCAPE = 'landscape';

const { breakpoint: breakpoints } = theme;

export class Breakpoint {
  constructor(currentWidth, currentHeight) {
    this.currentWidth = currentWidth;
    this.currentHeight = currentHeight;
  }

  atLeast(breakpoint) {
    if (!breakpoints[breakpoint] && breakpoint !== MOBILE) {
      throw new Error(`no breakpoint ${breakpoint}`);
    }

    const check = breakpoint === MOBILE
      ? 0
      : breakpoints[breakpoint];
    return this.currentWidth >= check;
  }

  atLeastTablet = () => this.atLeast(TABLET);
  atLeastLaptop = () => this.atLeast(LAPTOP);

  upTo(breakpoint) {
    if (!breakpoints[breakpoint] && breakpoint !== MOBILE) {
      throw new Error(`no breakpoint ${breakpoint}`);
    }

    if (breakpoint === MOBILE) {
      return false;
    }

    return this.currentWidth < breakpoints[breakpoint];
  }

  upToTablet = () => this.upTo(TABLET);
  upToLaptop = () => this.upTo(LAPTOP);

  is(breakpoint, orientation = PORTRAIT) {
    if (!breakpoints[breakpoint] && breakpoint !== MOBILE) {
      throw new Error(`no breakpoint ${breakpoint}`);
    }
    if (breakpoint === LAPTOP && orientation !== PORTRAIT) {
      throw new Error('Laptop can only be PORTRAIT');
    }

    let test = this.currentWidth;
    if ([
      MOBILE,
      TABLET,
    ].includes(breakpoint)) {
      if (orientation === PORTRAIT) {
        if (this.currentWidth > this.currentHeight) {
          return false;
        }
      } else {
        if (this.currentHeight > this.currentWidth) {
          return false;
        }
        test = this.currentHeight;
      }
    }

    switch (breakpoint) {
      case MOBILE: return test < breakpoints[TABLET];
      case TABLET: return test >= breakpoints[TABLET] && test < breakpoints[LAPTOP];
      case LAPTOP: return test >= breakpoints[LAPTOP];
      default: return false;
    }
  }

  width = () => this.currentWidth;
  height = () => this.currentHeight;

  isMobile = orientation => this.is(MOBILE, orientation);
  isTablet = orientation => this.is(TABLET, orientation);
  isLaptop = () => this.is(LAPTOP, LANDSCAPE); // LANDSCAPE only
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';
}

const BreakpointContext = React.createContext(null);

export const BreakpointProvider = ({ children }) => {
  const defaultBreakpoint = useMemo(() => isBrowser
    ? new Breakpoint(window.innerWidth, window.innerHeight)
    : undefined
  , []);

  const [breakpoint, setBreakpoint] = useState(defaultBreakpoint);

  const debouncedNewBreakpoint = useMemo(() => debounce(() => {
    setBreakpoint(new Breakpoint(window.innerWidth, window.innerHeight));
  }), []);

  const newBreakpoint = useMemo(() => () => window.requestAnimationFrame(debouncedNewBreakpoint, 150), []);

  if (isBrowser) {
    useLayoutEffect(() => {
      window.addEventListener('resize', newBreakpoint);
      return () => {
        window.removeEventListener('resize', newBreakpoint);
      };
    }, []);
  }

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

