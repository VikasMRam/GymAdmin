import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';

import { useChatbox } from './ChatBoxContext';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';
}


export default function withChatbox(InnerComponent) {
  const Wrapper = (props) => {
    const { triggerChatBot } = useChatbox();
    return <InnerComponent {...props} triggerChatBot={triggerChatBot} />;
  };

  Wrapper.displayName = `withChatbox(${getDisplayName(InnerComponent)})`;
  Wrapper.WrappedComponent = InnerComponent.WrappedComponent || InnerComponent;
  hoistNonReactStatics(Wrapper, InnerComponent);

  return Wrapper;
}
