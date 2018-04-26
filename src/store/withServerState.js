import React, { Component } from 'react';
import { fetchState } from 'react-router-server';
import { connect } from 'react-redux';
import { isBrowser, isServer } from 'sly/config';

class ServerStateComponent extends Component {
  componentWillMount() {
    const {
      fetchData, setServerState, hasServerState, cleanServerState
    } = this.props;

    if(!hasServerState) {
      if (isServer) {
        fetchData()
          .then(setServerState)
          .catch(err => {
              if (err.response && err.response.status === 404) {
                setServerState({
                  error: 'Unkown community',
                });
              } else {
                setServerState(err);
              }
            });
      } else {
        fetchData();
      }
    } else if (isBrowser) {
      cleanServerState();
    }
  }

  componentWillReceiveProps({ match }) {
    if (this.props.match !== match) {
      fetchData();
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

const withServerState = ({ 
  fetchData, 
  mapStateToProps, 
  mapDispatchToProps=noop 
}) => {
  if (typeof fetchData !== 'function') {
    throw new Error('you need to provide a fetchData function');
  }

  return (ChildComponent) => {
    const mapDispatchWithFetch = (dispatch, props) => ({
      ...mapDispatchToProps(dispatch, props),
      fetchData: () => fetchData(dispatch, props),
      ChildComponent,
    });
    return serverStateDecorator(connect(
      mapStateToProps, mapDispatchWithFetch,
    )(ServerStateComponent));
  };
};

export default withServerState;

