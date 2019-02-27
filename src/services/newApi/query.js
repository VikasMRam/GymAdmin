import React from 'react';
import { connect } from 'react-redux';
import { object } from 'prop-types';
import omit from 'object.omit';

import { withApi, getRequestInfo } from 'sly/services/newApi';

const defaultDispatcher = call => call();

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName
      || WrappedComponent.name
      || 'Component';
}

export default function query(propName, apiCall, dispatcher = defaultDispatcher) {
  return (InnerComponent) => {
    const mapStateToProps = (state, props) => {
      const argumentsAbsorber = (...args) => args;

      return {
        request: getRequestInfo(
          state,
          props.api[apiCall],
          dispatcher(argumentsAbsorber, props),
        ),
      };
    };

    class Wrapper extends React.Component {
      static displayName = `query(${getDisplayName(InnerComponent)}, ${propName})`;

      static propTypes = {
        api: object,
        request: object,
        status: object,
      };

      static loadData = (store, props) => {
        const promises = [];

        if (typeof InnerComponent.loadData === 'function') {
          promises.push(InnerComponent.loadData(store, props));
        }

        const { dispatch, getState } = store;
        const { request } = mapStateToProps(getState(), props);
        if (!request.isLoading && !request.hasStarted) {
          promises.push(dispatch(dispatcher(props.api[apiCall], {
            request,
            ...props,
          })));
        }

        return Promise.all(promises);
      };

      componentDidMount() {
        const { request } = this.props;
        if (!request.isLoading && !request.hasStarted) {
          this.fetch();
        }
      }

      componentWillReceiveProps(nextProps) {
        if (!nextProps.request.isLoading && !nextProps.request.hasStarted) {
          this.fetch(nextProps);
        }
      }

      fetch = (props = this.props) => {
        const { dispatch, api } = props;
        return dispatch(dispatcher(api[apiCall], props));
      };

      render() {
        const props = {
          ...omit(this.props, ['request']),
          [propName]: this.props.request.result,
          status: {
            ...this.props.status,
            [propName]: {
              ...omit(this.props.request, ['result']),
              refetch: this.fetch,
            },
          },
        };

        return <InnerComponent {...props} />;
      }
    }

    return withApi(connect(mapStateToProps)(Wrapper));
  };
}
