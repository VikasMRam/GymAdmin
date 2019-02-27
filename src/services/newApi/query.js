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
    class Wrapper extends React.Component {
      static displayName = `query(${getDisplayName(InnerComponent)}, ${propName})`;

      static propTypes = {
        api: object,
        request: object,
        status: object,
      };

      static loadData = (dispatch, props) => dispatch(dispatcher(props.api[apiCall], props));

      // Wrapper.loadData = async (dispatch, props) => {
      //   if (typeof InnerComponent.loadData === 'function') {
      //     await InnerComponent.loadData();
      //   }
      //   return dispatch(dispatcher(apiCall, props));
      // };

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

    return withApi(connect(mapStateToProps)(Wrapper));
  };
}
