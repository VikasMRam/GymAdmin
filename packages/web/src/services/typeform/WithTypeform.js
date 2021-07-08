import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';

import { useTypeform } from './TypeFormContext';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';
}


export default function withTypeform(InnerComponent) {
  const Wrapper = (props) => {
    const { triggerTypeform } = useTypeform();
    return <InnerComponent {...props} triggerTypeform={triggerTypeform} />;
  };

  Wrapper.displayName = `withChatbox(${getDisplayName(InnerComponent)})`;
  Wrapper.WrappedComponent = InnerComponent.WrappedComponent || InnerComponent;
  hoistNonReactStatics(Wrapper, InnerComponent);

  return Wrapper;
}
