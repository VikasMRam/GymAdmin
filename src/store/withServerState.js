import React, { Component } from 'react';
import { fetchState } from 'react-router-server';
import { connect } from 'react-redux';
import { isBrowser, isServer } from 'sly/config';
import { func, bool } from 'prop-types';

class ServerStateComponent extends Component {
  static propTypes = {
    fetchData: func.isRequired,
    handleError: func.isRequired,
    setServerState: func.isRequired,
    hasServerState: bool.isRequired,
    cleanServerState: func.isRequired,
  };

  componentWillMount() {
    const {
      fetchData,
      handleError,
      setServerState,
      hasServerState,
      cleanServerState,
    } = this.props;

    if(!hasServerState) {
      if (isServer) {
        fetchData()
          .catch(handleError)
          .then(setServerState)
          .catch(setServerState);
      } else {
        fetchData();
      }
    } else if (isBrowser) {
      cleanServerState();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { fetchData } = this.props;
    if (this.props.match !== nextProps.match) {
      fetchData(nextProps);
    }
  }

  render() {
    const { ChildComponent, ...props } = this.props;
    return <ChildComponent {...props } />;
  }
}

const serverStateDecorator = fetchState(
  state => {
    return {
      hasServerState: !!Object.keys(state).length,
      ...state,
    };
  },
  ({ done }) => ({
    setServerState: data => done(data),
    cleanServerState: () => done(),
  }),
);

const noop = () => ({});
const passthrouh = _=>_;
const promiseNoop = Promise.resolve;

export default function withServerState({
  fetchData=promiseNoop,
  handleError=passthrouh,
  mapStateToProps=null,
  mapDispatchToProps=noop
}) {
  return (ChildComponent) => {
    const getMapDispatchToProps = (dispatch, props) => {
      return typeof mapDispatchToProps === 'function'
        ? mapDispatchToProps(dispatch, props)
        : Object.keys(mapDispatchToProps)
          .reduce((cumul, key) => {
            cumul[key] = (...args) => dispatch(mapDispatchToProps[key](...args)); 
            return cumul;
          }, {});
    };

    const childMapDispatchToProps = (dispatch, props) => ({
      ...getMapDispatchToProps(dispatch, props),
      fetchData: (nextProps=props) => fetchData(dispatch, nextProps),
      handleError,
      ChildComponent,
    });

    const connector = connect(
      mapStateToProps,
      childMapDispatchToProps,
    );

    return serverStateDecorator(
      connector(ServerStateComponent)
    );
  };
};

