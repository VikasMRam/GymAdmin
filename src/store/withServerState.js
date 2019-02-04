import React, { Component } from 'react';
import { fetchState } from 'react-router-server';
import { connect } from 'react-redux';
import { func, bool, string, shape } from 'prop-types';
import { isEqual, omit } from 'lodash';
import { parse as parseSearch } from 'query-string';

import { isBrowser, isServer } from 'sly/config';
import { isFSA } from 'sly/store/actions';

const dispatchActions = (dispatch, errorHandler, actions) => {
  // get a map of all the resource names to promise
  const promises = Object.entries(actions).reduce((cumul, [resource, action]) => {
    if (!isFSA(action)) {
      throw new Error(`trying to use ${action} as an action`);
    }
    cumul[resource] = dispatch(action);
    return cumul;
  }, {});

  // pass that to the promise handler
  const handledPromises = errorHandler(promises);

  if (typeof handledPromises !== 'object') {
    throw new Error('handleErrors didn\'t return an object with promises');
  }

  // if we don't get all the promises handled we throw an error
  Object.keys(actions).forEach((key) => {
    if (!handledPromises[key] || Promise.resolve(handledPromises[key]) !== handledPromises[key]) {
      throw new Error(`${key} promise was unhandled`);
    }
  });

  const resources = Object.keys(handledPromises);
  return Promise.all(Object.values(handledPromises))
    .then((results) => {
      return resources.reduce((cumul, resource, i) => {
        cumul[resource] = results[i];
        return cumul;
      }, {});
    })
    .catch(console.error);
};

const serverStateDecorator = fetchState(
  state => ({
    hasServerState: !!Object.keys(state).length,
    ...state,
  }),
  ({ done }) => ({
    setServerState: data => done(data),
    cleanServerState: () => done(),
  }),
);

export default function withServerState(
  mapPropsToActions = Promise.resolve,
  handleErrors = _ => _,
  ignoreSearch = [],
) {
  const mapDispatchToProps = (dispatch, props) => ({
    fetchData: () => dispatchActions(dispatch, handleErrors, mapPropsToActions(props)),
  });

  return ChildComponent => serverStateDecorator(connect(
    null,
    mapDispatchToProps,
  )(class ServerStateComponent extends Component {
    static propTypes = {
      match: shape({
        url: string.isRequired,
      }),
      location: shape({
        search: string.isRequired,
      }),
      fetchData: func.isRequired,
      setServerState: func.isRequired,
      hasServerState: bool.isRequired,
      cleanServerState: func.isRequired,
    };

    componentWillMount() {
      const {
        fetchData,
        setServerState,
        hasServerState,
        cleanServerState,
      } = this.props;

      if (!hasServerState) {
        if (isServer) {
          fetchData(this.props)
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
        const prev = omit(parseSearch(location.search), ignoreSearch);
        const next = omit(parseSearch(nextProps.location.search), ignoreSearch);
        if (!isEqual(prev, next)) {
          nextProps.fetchData(nextProps);
        }
      }
    }

    render() {
      const {
        fetchData,
        setServerState,
        hasServerState,
        cleanServerState,
        ...rest
      } = this.props;

      return <ChildComponent {...rest} />;
    }
  }));
}

