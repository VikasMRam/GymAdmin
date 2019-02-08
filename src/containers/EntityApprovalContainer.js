import React, { Component } from 'react';
import { connect } from 'react-redux';
import { object, func } from 'prop-types';

import { resourceUpdateRequest} from 'sly/store/resource/actions';
import { ensureAuthenticated } from 'sly/store/authenticated/actions';
import EntityApprovalPage from 'sly/components/pages/EntityApprovalPage/index';
import { titleize } from 'sly/services/helpers/strings';
import { logError } from 'sly/services/helpers/logging';

class EntityApprovalContainer extends Component {
  static propTypes = {
    match: object.isRequired,
    approveEntity: func.isRequired,
    fetchUserMe: func.isRequired,
    ensureAuthenticated: func.isRequired,
  };

  state = { message: 'Loading...' };

  componentDidMount() {
    const { match, approveEntity } = this.props;

    const { params } = match;
    const { entitySlug, entity } = params;

    approveEntity(entity, entitySlug)
      .then(() => {
        this.setState({ message: 'Success' });
      })
      .catch((err) => {
        logError(err);
        const { response } = err;
        const { status } = response;
        if (status === 405) {
          this.setState({ message: `${titleize(entity)} Already Approved` });
        } else if (status === 403) {
          this.setState({ message: 'User Not Admin' });
        } else {
          this.setState({ message: 'Failure' });
        }
      });
  }

  render() {
    const { match } = this.props;
    const { params } = match;
    const { entity } = params;
    const { message } = this.state;
    return (
      <EntityApprovalPage
        heading={`${titleize(entity)} Approval Page`}
        message={`Status: ${message}`}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  approveEntity: (entity, entitySlug) => dispatch(ensureAuthenticated(resourceUpdateRequest(entity, `${entitySlug}`, { approve: true }))),
});

export default connect(null, mapDispatchToProps)(EntityApprovalContainer);
