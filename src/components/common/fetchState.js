import React, { Component } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

import { isServer } from 'sly/config';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';
}
/* eslint no-underscore-dangle: 0 */
const fetchState = (mapStateToProps, mapActionsToProps) => (WrappedComponent) => {
  class Wrapper extends Component {
    static contextTypes = {
      reactRouterServerAsyncRenderer: () => null,
      reactRouterServerServerState: () => null,
      reactRouterServerFetchStateParentIndex: () => null,
    };

    static childContextTypes = {
      reactRouterServerFetchStateParentIndex: () => null,
    };

    static displayName = `fetchState(${getDisplayName(WrappedComponent)})`;

    static WrappedComponent = WrappedComponent;

    constructor() {
      super();
      this.state = {};
    }

    getChildContext() {
      return {
        reactRouterServerFetchStateParentIndex: this.index,
      };
    }

    componentWillMount() {
      this._componentIsMounted = true;
      const {
        reactRouterServerAsyncRenderer: asyncRenderer,
        reactRouterServerServerState: serverState,
        reactRouterServerFetchStateParentIndex: parentIndex,
      } = this.context;

      if (asyncRenderer) {
        this.index = asyncRenderer.getFetchStateIndex(parentIndex);
        if (!asyncRenderer.hasFetchStateResult(this.index)) {
          asyncRenderer.startFetchState();
        } else {
          this.setState({ ...asyncRenderer.getFetchStateResult(this.index) });
        }
      } else if (serverState) {
        this.index = serverState.getFetchStateIndex(parentIndex);
        const state = serverState.getState(this.index);
        if (state) {
          if (this._componentIsMounted) {
            this.setState({ ...state });
          }
        }
      }
    }

    componentWillUnmount() {
      this._componentIsMounted = false;
    }

    index;

    actions = () => ({
      done: this.handleDone,
    });

    handleDone = (data) => {
      if (isServer) {
        const { reactRouterServerAsyncRenderer: asyncRenderer } = this.context;
        if (asyncRenderer) {
          if (!asyncRenderer.hasFetchStateResult(this.index)) {
            asyncRenderer.finishFetchState(this.index, data);
          }
        }
      } else if (this._componentIsMounted) {
        this.setState({ ...data });
      }
    };

    render() {
      let nextProps = { ...this.props };
      if (mapStateToProps) nextProps = { ...nextProps, ...mapStateToProps(this.state) };
      if (mapActionsToProps) nextProps = { ...nextProps, ...mapActionsToProps(this.actions()) };
      return <WrappedComponent {...nextProps} />;
    }
  }

  hoistNonReactStatic(Wrapper, WrappedComponent);

  return Wrapper;
};

export const withDone = fetchState(null, ({ done }) => ({ done }));

export default fetchState;
