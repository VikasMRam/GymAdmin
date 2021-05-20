import React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import memoize from 'memoize-one';
import isDeepEqual from 'lodash/isEqual';

export const withProps = (digestProps = _ => _) => {
  const memoizedDigest = memoize(digestProps, isDeepEqual);
  return (ChildComponent) => {
    const Wrapper = props => (
      <ChildComponent
        {...{
          ...props,
          ...memoizedDigest(props),
        }}
      />
    );

    Wrapper.displayName = `withProps(${ChildComponent.displayName || ChildComponent.name || 'ChildComponent'})`;

    hoistStatics(Wrapper, ChildComponent);

    return Wrapper;
  };
};


export const snitch = (InnerComponent) => {
  const Wrapper = (props) => {
    console.log('props', props);
    return <InnerComponent { ...props } /> 
  };



  Wrapper.displayName = InnerComponent.displayName;
  Wrapper.WrappedComponent = InnerComponent;
  hoistStatics(Wrapper, InnerComponent);

  return Wrapper;
};

