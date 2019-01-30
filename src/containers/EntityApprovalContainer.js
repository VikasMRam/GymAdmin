import React, { Component } from 'react';
import { connect } from 'react-redux';
import { object, func } from 'prop-types';

import { resourceUpdateRequest, resourceDetailReadRequest } from 'sly/store/resource/actions';
import { ensureAuthenticated } from 'sly/store/authenticated/actions';
import EntityApprovalPage from 'sly/components/pages/EntityApprovalPage/index';
import { titleize } from 'sly/services/helpers/strings';

class EntityApprovalContainer extends Component {
  static propTypes = {
    match: object.isRequired,
    approveEntity: func.isRequired,
    fetchUserMe: func.isRequired,
    ensureAuthenticated: func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      message: 'Loading...',
    };
  }

  componentDidMount() {
    const {
      match, approveEntity, fetchUserMe, ensureAuthenticated,
    } = this.props;
    const { params } = match;
    const { entitySlug, entity } = params;
    const { message } = this.state;
    if (message === 'Loading...') {
      const callApprove = () => approveEntity(entity, entitySlug).then(() => {
        this.setState({ message: 'Success' });
      }).catch((err) => {
        if (err.response) {
          const { response } = err;
          const { status } = response;
          if (status === 405) {
            this.setState({ message: `${titleize(entity)} Already Approved` });
          } else if (status === 403) {
            this.setState({ message: 'User Not Admin' });
          } else {
            this.setState({ message: 'Failure' });
          }
        } else {
          this.setState({ message: 'Unknown Error' });
          console.trace(err);
        }
      });
      fetchUserMe()
        .then(callApprove).catch(() => {
          ensureAuthenticated(() => {}).then(callApprove).catch((err) => {
            if (err.message) {
              this.setState({ message: err.message });
            } else {
              this.setState({ message: 'Unknown Error' });
              console.trace(err);
            }
          });
        });
    }
  }

  render() {
    const { match } = this.props;
    const { params } = match;
    const { entity } = params;
    const { message } = this.state;
    return <EntityApprovalPage heading={`${titleize(entity)} Approval Page`} message={`Status: ${message}`} />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserMe: () => dispatch(resourceDetailReadRequest('user', 'me')),
    approveEntity: (entity, entitySlug) => dispatch(resourceUpdateRequest(entity, `${entitySlug}`, { approve: true })),
    ensureAuthenticated: action => dispatch(ensureAuthenticated(action)),
  };
};

export default connect(null, mapDispatchToProps)(EntityApprovalContainer);
