import React from 'react';
import get from 'lodash/get';
import { withRouter as withReactRouter } from 'react-router';
import hoistNonReactStatic from 'hoist-non-react-statics';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';
}

const compare = (extraArgs = []) => (a, b) => {
  const { location: locA, match: matchA, ...restA } = a;
  const { location: locB, match: matchB, ...restB } = b;
  const keysA = Object.keys(restA);
  const keysB = Object.keys(restB);

  if (locA.pathname !== locB.pathname) {
    return false;
  }

  if (keysA.length !== keysB.length) {
    return false;
  }

  if (extraArgs.some((prop) => {
    return get(a, prop) !== get(b, prop);
  })) {
    return false;
  }

  return !keysA.some(key => restA[key] !== restB[key]);
};

export const makeWithRouter = (extraArgs = []) => (Component) => {
  const WithRouter = withReactRouter(React.memo(Component, compare(extraArgs)));

  WithRouter.WrappedComponent = Component;
  WithRouter.displayName = `withRouter(${getDisplayName(Component)})`;
  hoistNonReactStatic(WithRouter, Component);

  return WithRouter;
};

export default makeWithRouter();
