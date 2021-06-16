import React, { Component } from 'react';
import { connect } from 'react-redux';
import { object, func } from 'prop-types';

import { ensureAuthenticated } from 'sly/web/store/authenticated/actions';
import EntityApprovalPage from 'sly/web/components/pages/EntityApprovalPage/index';
import { titleize } from 'sly/web/services/helpers/strings';
import { logError } from 'sly/web/services/helpers/logging';
import withAuth from 'sly/web/services/api/withAuth';

const getApiFor = (entity, { updateContent, updateRating }) => {
  switch (entity) {
    case 'content': return updateContent;
    case 'rating': return updateRating;
    default: return null;
  }
};

const mapDispatchToProps = {
  ensureAuthenticated,
};

@withAuth
@query('updateContent')
@query('updateRating')
@query('approveEntity')
@connect(null, mapDispatchToProps)

export default class EntityApprovalContainer extends Component {
  static propTypes = {
    match: object.isRequired,
    approveEntity: func.isRequired,
    ensureAuthenticated: func.isRequired,
  };

  state = { message: 'Loading...' };

  componentDidMount() {
    const { match, approveEntity, ...props } = this.props;

    const { params } = match;
    const { entitySlug, entity } = params;

    ensureAuthenticated(
      `Sign up to approve ${entity}`,
      () => getApiFor(entity, props)({ id }, { approve: true }),
    )
      .then(() => approveEntity(entity, entitySlug))
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

