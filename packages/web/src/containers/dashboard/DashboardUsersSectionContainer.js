import React, { Component } from 'react';
import { arrayOf, object, func, string } from 'prop-types';
import { withRouter } from 'react-router';

import UsersSection from 'sly/web/components/organisms/profileManagement/UsersSection';
import { prefetch, withUser, query } from 'sly/web/services/api';
import userPropType from 'sly/common/propTypes/user';
import { withRedirectTo } from 'sly/common/services/redirectTo';
import { withDatatable } from 'sly/web/services/datatable';
import withModal from 'sly/web/controllers/withModal';
import withNotification from 'sly/web/controllers/withNotification';
import ConfirmationDialog from 'sly/web/components/molecules/ConfirmationDialog';

const getPaginationData = ({ result, meta }) => {
  if (!result) return {};

  const count = result.length;
  const current = meta['page-number'];
  const size = meta['page-size'];
  const start = (current * size) + 1;
  const end = (current * size) + count;
  const paginationRangeString = count > 0 ? `${start}-${end} of` : '';
  const filteredCount = meta.filtered_count;
  const text = `Showing ${paginationRangeString} ${filteredCount} Users`;
  const show = filteredCount > size;

  return ({
    current,
    size,
    total: meta.filtered_count / meta['page-size'],
    totalCount: meta.total_count,
    filteredCount,
    text,
    show,
  });
};

@withDatatable('users')
@withRouter
@withUser
@withRedirectTo
@withModal
@withNotification
@query('deleteUser', 'deleteUser')
@prefetch('users', 'getUsers', (req, { datatable }) => req(datatable.query))

export default class DashboardUsersSectionContainer extends Component {
  static propTypes = {
    users: arrayOf(userPropType),
    status: object,
    datatable: object,
    match: object.isRequired,
    location: object.isRequired,
    redirectTo: func.isRequired,
    entityType: string.isRequired,
    entityId: string,
    entityName: string,
    showModal: func.isRequired,
    hideModal: func.isRequired,
    notifyInfo: func.isRequired,
    notifyError: func.isRequired,
    deleteUser: func.isRequired,
  };


  refetchUsers = () => {
    const { status } = this.props;
    status.users.refetch();
  }

  deleteUser = (user) => {
    const { showModal, hideModal, notifyInfo, notifyError } = this.props;

    const doDelete = () => {
      const { deleteUser } = this.props;


      const payload = { id: user.id };
      return deleteUser(payload)
        .then(this.refetchUsers)
        .then(hideModal)
        .then(() => {
          notifyInfo(`User ${user.name} removed correctly`);
        })
        .catch(() => {
          notifyError(`User ${user.name} could not be removed`);
        });
    };

    return showModal((
      <ConfirmationDialog
        heading={`Remove ${user.name}`}
        description={`Are you sure that you want to remove ${user.name}? This cannot be undone.`}
        onConfirmClick={doDelete}
        onCancelClick={hideModal}
      />
    ), hideModal);
  };

  render() {
    const { users, status, redirectTo, match, location, datatable,  entityId, entityType, entityName, ...props } = this.props;

    const { error, meta, hasFinished, result: usersRaw } = status.users;

    if (error) {
      throw new Error(JSON.stringify(error));
    }

    return (
      <UsersSection
        {...props}
        isPageLoading={!hasFinished || !datatable.hasFinished}
        datatable={datatable}
        users={users}
        usersRaw={usersRaw}
        pagination={getPaginationData(status.users)}
        activeTab={match.params.taskType}
        meta={meta || {}}
        refetchUsers={this.refetchUsers}
        match={match}
        redirectTo={redirectTo}
        entityId={entityId}
        entityType={entityType}
        entityName={entityName}
        deleteUser={this.deleteUser}
      />
    );
  }
}
