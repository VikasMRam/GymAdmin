import React, { Component } from 'react';
import { connect } from 'react-redux';
import { object, func, bool } from 'prop-types';

import { resourceUpdateRequest } from 'sly/store/resource/actions';
import { isResourceDetailRequestComplete, isResourceUpdateRequestComplete, isResourceDetailRequestDone } from 'sly/store/selectors';

class EntityApprovalContainer extends Component {
  static propTypes = {
    match: object.isRequired,
    approveEntity: func.isRequired,
    userFetchComplete: bool.isRequired,
    userFetchDone: bool.isRequired,
    entityUpdateComplete: bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      message: 'Loading...',
    };
  }

  render() {
    const {
      match, approveEntity, userFetchComplete, userFetchDone, entityUpdateComplete,
    } = this.props;
    const { params } = match;
    const { entitySlug, entity } = params;

    if (userFetchComplete) {
      if (!userFetchDone) {
        // Could not make history push to rail's signin
        window.location.href = '/signin';
      } else if (!entityUpdateComplete) {
        approveEntity(entity, entitySlug).then(() => {
          this.setState({ message: 'Success' });
        }).catch((err) => {
          // console.log(err.response);
          const { response } = err;
          const { status } = response;
          if (status === 405) {
            this.setState({ message: `${entity} Already Approved` });
          } else if (status === 403) {
            this.setState({ message: 'User Not Admin' });
          } else {
            this.setState({ message: 'Failure' });
          }
        });
      }
    }

    const { message } = this.state;
    return <div>{message}</div>;
  }
}

const mapStateToProps = (state, { match }) => {
  const { params } = match;
  const { entity } = params;
  return {
    userFetchComplete: isResourceDetailRequestComplete(state, 'user'),
    userFetchDone: isResourceDetailRequestDone(state, 'user'),
    entityUpdateComplete: isResourceUpdateRequestComplete(state, entity),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    approveEntity: (entity, entitySlug) => dispatch(resourceUpdateRequest(entity, `${entitySlug}/`, { approve: true })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EntityApprovalContainer);
