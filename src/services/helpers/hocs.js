import React from 'react';
import hoistStatics from 'hoist-non-react-statics';

export const withProps = (digestProps = _ => _) => {
  return (ChildComponent) => {
    const Wrapper = props => (
      <ChildComponent
        {...{
          ...props,
          ...digestProps(props),
        }}
      />
    );

    Wrapper.displayName = `withProps(${ChildComponent.displayName || ChildComponent.name || 'ChildComponent'})`;

    hoistStatics(Wrapper, ChildComponent);

    return Wrapper;
  };
};
