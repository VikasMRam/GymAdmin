import React, { Component } from 'react';
import { __RouterContext } from 'react-router';
import { fetchState } from 'react-router-server';
import { connect } from 'react-redux';
import { func, bool, string, shape, object } from 'prop-types';
import { isEqual, omit } from 'lodash';
import { parse as parseSearch } from 'query-string';

import { isBrowser, isServer } from 'sly/config';
import { isFSA, isResourceReadRequest } from 'sly/store/actions';

const dispatchActions = (dispatch, handleResponses, actions) => {
  // get a map of all the resource names to promise
  console.log('dispatchActions', actions);
  const responses = Object.entries(actions).reduce((cumul, [resource, action]) => {
    if (!isFSA(action) && !isResourceReadRequest(action)) {
      throw new Error(`trying to use ${action} as a resource read action`);
    }
    const promise = dispatch(action);
    cumul.promises[resource] = promise;
    cumul.handlers[resource] = (fullfilled, rejected) => {
      cumul.promises[resource] = cumul.promises[resource].then(fullfilled, rejected);
    };
    return cumul;
  }, { handlers: {}, promises: [] });

  // pass that to the promise handleResponses
  handleResponses(responses.handlers);

  if (typeof handledPromises !== 'object') {
    throw new Error('handleResponses didn\'t return an object with promises');
  }

  return Promise.all(Object.values(responses.promises))
    .catch(console.error)
    .then(Promise.resolve(responses.promises));
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
  handleResponses = _ => _,
  ignoreSearch = [],
) {
  const getResponseHandler = ({ router }) => {
    const { staticContext, history } = router;
    const redirect = (uri, status = 302) => {
      if (staticContext) {
        staticContext.status = status;
      }
      history.replace(uri);
    };
    return promises => handleResponses(promises, redirect);
  };

  const mapDispatchToProps = (dispatch, props) => ({
    fetchData: context => dispatchActions(dispatch, getResponseHandler(context), mapPropsToActions(props)),
  });

  return ChildComponent => serverStateDecorator(connect(
    null,
    mapDispatchToProps,
  )(class ServerStateComponent extends Component {
    static contextTypes = {
      router: shape({
        history: object.isRequired,
        route: object.isRequired,
        staticContext: object,
      }),
    };

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

    componentDidMount() {
      const {
        fetchData,
        setServerState,
        hasServerState,
        cleanServerState,
      } = this.props;

      if (!hasServerState) {
        if (isServer) {
          fetchData(this.context)
            .then(setServerState)
            .catch(setServerState);
        } else {
          fetchData(this.context);
        }
      } else if (isBrowser) {
        cleanServerState();
      }
    }

    componentDidUpdate(prevProps) {
      const { match, location, fetchData } = this.props;
      if (prevProps.match.url !== match.url) {
        fetchData(this.context);
      } else {
        const prev = omit(parseSearch(prevProps.location.search), ignoreSearch);
        const next = omit(parseSearch(location.search), ignoreSearch);
        if (!isEqual(prev, next)) {
          fetchData(this.context);
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

