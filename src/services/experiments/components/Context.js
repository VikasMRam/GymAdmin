import React, { useContext } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

export const ExperimentContext = React.createContext();

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';
}

export function withExperimentContext(Component) {
  function WithExperimentContext(props) {
    const experimentContext = useContext(ExperimentContext);
    return (
      <Component {...props} experimentContext={experimentContext} />
    );
  }

  WithExperimentContext.displayName = `WithExperimentContext(${getDisplayName(Component)})`;
  WithExperimentContext.WrappedComponent = Component.WrappedComponent || Component;
  hoistNonReactStatic(WithExperimentContext, Component);

  return WithExperimentContext;
}


