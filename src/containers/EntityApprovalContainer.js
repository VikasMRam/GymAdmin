import React, { Component } from 'react';
import { connect } from 'react-redux';
import { object, func } from 'prop-types';

import EntityApprovalPage from 'sly/components/pages/EntityApprovalPage/index';
import { titleize } from 'sly/services/helpers/strings';
import { logError } from 'sly/services/helpers/logging';
import withAuth from 'sly/services/newApi/withAuth';
import api from 'sly/services/newApi/apiInstance';

const getApiFor = (entity) => {
  switch (entity) {
    case 'content': return api.updateContent;
    case 'rating': return api.updateRating;
    default: return null;
  }
};

const mapDispatchToProps = (dispatch, { ensureAuthenticated }) => ({
  approveEntity: (entity, id) => ensureAuthenticated(
    `Sign up to approve ${entity}`,
    getApiFor(entity)({ id }, { approve: true }),
  ),
});

@withAuth
@connect(null, mapDispatchToProps)

export default class EntityApprovalContainer extends Component {
  static propTypes = {
    match: object.isRequired,
    approveEntity: func.isRequired,
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
        const { status } = err;
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

