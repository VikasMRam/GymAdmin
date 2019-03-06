import React from 'react';

export const withProps = (digestProps = _ => _) => {
  return (ChildComponent) => {
    return props => (
      <ChildComponent
        {...{
          ...props,
          ...digestProps(props),
        }}
      />
    );
  };
};
