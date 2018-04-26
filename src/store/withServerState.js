import React, { Component } from 'react';
import { fetchState } from 'react-router-server';
import { connect } from 'react-redux';
import { isBrowser, isServer } from 'sly/config';

const noop = () => ({});

const withServerState = ({ mapStateToProps, mapDispatchToProps=noop, fetchData }) => {
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

  return (ChildComponent) => {
    class ServerStateComponent extends Component {
      componentWillMount() {
        const {
          fetchData, communitySlug, setServerState, hasServerState, cleanServerState
        } = this.props;

        if(!hasServerState) {
          if (isServer) {
            fetchData()
              .then(setServerState)
            // .catch(err => {
            //     if (err.response && err.response.status === 404) {
            //       setServerState({
            //         error: 'Unkown community',
            //       });
            //     } else {
            //       setServerState(err);
            //     }
            //   });
          } else {
            fetchData(communitySlug);
          }
        } else if (isBrowser) {
          cleanServerState();
        }
      }

      componentWillReceiveProps(nextProps) {
        const { fetchData, communitySlug } = this.props;
        if (communitySlug !== nextProps.communitySlug) {
          fetchData(nextProps.communitySlug);
        }
      }

      render() {
        const { children, ...props } = this.props;
        return <ChildComponent {...props } />;      
      }
    }

    const mapDispatchWithFetch = (dispatch, props) => ({
      ...mapDispatchToProps(dispatch, props),
      fetchData: () => fetchData(dispatch, props),
    });
    return serverStateDecorator(connect(
      mapStateToProps, mapDispatchWithFetch,
    )(ServerStateComponent));
  };
};

export default withServerState;

