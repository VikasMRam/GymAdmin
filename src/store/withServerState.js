import React, { Component } from 'react';
import { fetchState } from 'react-router-server';
import { connect } from 'react-redux';
import { func, bool, string, shape, object } from 'prop-types';
import { isEqual, omit } from 'lodash';
import { parse as parseSearch } from 'query-string';

import { isBrowser, isServer } from 'sly/config';
import { isFSA, isResourceReadRequest } from 'sly/store/actions';

const dispatchActions = (dispatch, handleResponses, actions) => {
  // get a map of all the resource names to promise
  const responses = Object.entries(actions).reduce((cumul, [resource, action]) => {
    if (!isFSA(action) && !isResourceReadRequest(action)) {
      throw new Error(`trying to use ${action} as a resource read action`);
    }
    const promise = dispatch(action);
    cumul.promises[resource] = promise;
    cumul.handlers[resource] = (fullfilled, rejected) => {
      cumul.promises[resource] = cumul.promises[resource].then(fullfilled, rejected);
      return cumul.promises[resource];
    };
    return cumul;
  }, { handlers: {}, promises: [] });

  if (typeof handleResponses === 'function') {
    // pass that to the promise handleResponses
    handleResponses(responses.handlers);
  }

  const promises = Object.values(responses.promises);
  return Promise.all(promises)
    .then((values) => {
      // rezip the responses
      return Object.keys(responses.promises)
        .reduce((cumul, key, i) => {
          cumul[key] = values[i];
          return cumul;
        }, {});
    });
};

const serverStateDecorator = fetchState(
  state => ({
    hasServerState: !!Object.keys(state).length,
    serverState: state,
  }),
  ({ done }) => ({
    setServerState: data => done(data),
    cleanServerState: () => done(),
  }),
);

export default function withServerState(
  mapPropsToActions = () => {},
  handleResponses = _ => _,
  ignoreSearch = [],
) {
  const getResponseHandler = ({ router }, props) => {
    const { staticContext, history } = router;
    const redirect = (uri, status = 302) => {
      if (staticContext) {
        staticContext.status = status;
      }
      history.replace(uri);
    };
    return promises => handleResponses(promises, props, redirect);
  };

  const mapDispatchToProps = (dispatch, props) => ({
    fetchData: (context, nextProps = props) => dispatchActions(dispatch, getResponseHandler(context, nextProps), mapPropsToActions(nextProps)),
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

    componentWillMount() {
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

    componentWillUpdate(nextProps) {
      const { match, location, fetchData } = this.props;
      if (match.url !== nextProps.match.url) {
        fetchData(this.context, nextProps);
      } else {
        const prev = omit(parseSearch(location.search), ignoreSearch);
        const next = omit(parseSearch(nextProps.location.search), ignoreSearch);
        if (!isEqual(prev, next)) {
          fetchData(this.context, nextProps);
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
