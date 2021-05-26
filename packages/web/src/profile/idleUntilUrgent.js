import React from 'react';

export function idleUntilUrgent(WrappedComponent, ComponentId) {
  class IdleUntilUrgent extends React.Component {
    constructor(props) {
      super(props);
      this.renderChild = false;
      this.firstRender = true;
      this.callbackId = null;
    }

    shouldComponentUpdate(nextProps, nextState) {
      return (
        this.props !== nextProps || (nextState && nextState.renderChild)
      );
    }

    // to prevent calling setState on an unmounted component
    // and avoid memory leaks
    componentWillUnmount() {
      this.callbackId && cancelIdleCallback(this.callbackId);
    }

        enqueueIdleRender = () => {
          if (typeof requestIdleCallback !== 'undefined') {
            // https://caniuse.com/#search=requestIdleCallback
            this.callbackId = requestIdleCallback(() => {
              const root = document.getElementById(ComponentId);
              this.setState({
                renderChild: true,
              });
            });
          } else {
            setTimeout(() => {
              const root = document.getElementById(ComponentId);
              this.setState({
                renderChild: true,
              });
            });
          }
        };

        urgentRender = () => {
          this.setState({
            renderChild: true,
          });
        };

        render = () => {
          if (typeof window !== 'undefined' && this.firstRender) {
            this.firstRender = false;
            this.enqueueIdleRender();
            return (
              <div
                dangerouslySetInnerHTML={{ __html: '' }}
                suppressHydrationWarning
                onClick={this.urgentRender}
              />
            );
          }
          // Cancel the already scheduled render, if any
          this.callbackId && cancelIdleCallback(this.callbackId);
          return <WrappedComponent {...this.props} />;
        };
  }
  const wrappedComponentName =
        WrappedComponent.displayName || WrappedComponent.name || 'Component';
  IdleUntilUrgent.displayName = `IdleUntilUrgent (${wrappedComponentName})`;
  return IdleUntilUrgent;
}
