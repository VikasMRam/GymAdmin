import React, { Component } from 'react';
import { fetchState } from 'react-router-server';
import { connect } from 'react-redux';
import { func, bool, string, shape } from 'prop-types';
import { isEqual, omit } from 'lodash';
import { parse as parseSearch } from 'query-string';

import { isBrowser, isServer } from 'sly/config';

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

export default function withServerState({
  fetchData = Promise.resolve,
  handleError = _ => _,
  ignoreSearch = [],
}) {
  const mapDispatchToProps = (dispatch, props) => ({
    fetchData: (nextProps = props) => fetchData(dispatch, nextProps),
    handleError,
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

      if (!hasServerState) {
        if (isServer) {
          fetchData(this.props)
            .catch(handleError)
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
      return <ChildComponent {...this.props } />;
    }
  }));
};

