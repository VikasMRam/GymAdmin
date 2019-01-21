import React, { Component } from 'react';
import { fetchState } from 'react-router-server';
import { connect } from 'react-redux';
import { func, bool, object, array, any } from 'prop-types';
import { isEqual, omit } from 'lodash';
import { parse as parseSearch } from 'query-string';

import { isBrowser, isServer } from 'sly/config';
import { resourceDetailReadRequest } from 'sly/store/resource/actions';

const ensureArray = ary => Array.isArray(ary) ? ary : [ary];

class ServerStateComponent extends Component {
  static propTypes = {
    fetchData: func.isRequired,
    handleError: func.isRequired,
    setServerState: func.isRequired,
    hasServerState: bool.isRequired,
    cleanServerState: func.isRequired,
    history: object,
    dispatch: func,
    match: object,
    location: object,
    ignoreSearch: array,
    ChildComponent: any,
  };

  componentWillMount() {
    const {
      fetchData,
      handleError,
      setServerState,
      hasServerState,
      cleanServerState,
      history,
      dispatch,
    } = this.props;

    global.rhistory = history;

    if (!hasServerState) {
      if (isServer) {
        Promise.all([
          dispatch(resourceDetailReadRequest('user', 'me'))
            // handles 401 from user/me (guest users)
            .catch((e) => {
              if (e.response && e.response.status && e.response.status !== 401) {
                console.error(`SSR GET user/me error - ${e.toString()}`);
              }
            }),
          fetchData(this.props)
            .catch(handleError),
        ])
          .then(setServerState)
          .catch(setServerState);
      } else {
        fetchData(this.props);
      }
    } else if (isBrowser) {
      cleanServerState();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { match, location } = this.props;

    if (match.url !== nextProps.match.url) {
      nextProps.fetchData(nextProps);
    } else {
      const { ignoreSearch = [] } = nextProps;
      const ignore = ensureArray(ignoreSearch);
      const prev = omit(parseSearch(location.search), ignore);
      const next = omit(parseSearch(nextProps.location.search), ignore);
      if (!isEqual(prev, next)) {
        nextProps.fetchData(nextProps);
      }
    }
  }

  render() {
    const { ChildComponent, ...props } = this.props;
    return <ChildComponent {...props} />;
  }
}

const serverStateDecorator = fetchState(
  (state) => {
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
const passthrouh = _ => _;
const promiseNoop = Promise.resolve;

export default function withServerState({
  fetchData = promiseNoop,
  handleError = passthrouh,
  mapStateToProps = (_, props) => props,
  mapDispatchToProps = noop,
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
      dispatch,
      fetchData: (nextProps = props) => fetchData(dispatch, nextProps),
      handleError,
    });

    const connector = connect(
      (state, ownProps) => ({
        ...mapStateToProps(state, ownProps),
        ChildComponent,
      }),
      childMapDispatchToProps,
    );

    return serverStateDecorator(connector(ServerStateComponent));
  };
}
