import React, { Component } from 'react';
import styled from 'styled-components';
import immutable from 'object-path-immutable';
import pick from 'lodash/pick';
import { func, string, object } from 'prop-types';
import produce from 'immer';

import StatusSelect from 'sly/components/molecules/StatusSelect';
import clientPropType from 'sly/propTypes/client';
import { FAMILY_STATUS_ACTIVE, FAMILY_STATUS_ON_PAUSE } from 'sly/constants/familyDetails';
import PlaceFamilyOnPauseFormContainer from 'sly/containers/PlaceFamilyOnPauseFormContainer';
import SlyEvent from 'sly/services/helpers/events';
import { prefetch, query } from 'sly/services/newApi';

const options = [
  { label: 'Active',    icon: 'active',     palette: 'green',  value: 'Active' },
  { label: 'Hot',       icon: 'hot',        palette: 'yellow', value: 'Active' },
  { label: 'Long Term', icon: 'hourglass',  palette: 'purple', value: 'Long Term' },
  { label: 'On Pause',  icon: 'pause',      palette: 'danger', value: 'On Pause' },
  { label: 'Archived',  icon: 'archived',   palette: 'slate',  value: 'Archived' },
  { label: 'Deleted',   icon: 'trash-fill', palette: 'grey',   value: 'Deleted' },
];

@prefetch('client', 'getClient', (req, { clientId }) => req({
  id: clientId,
}))

@query('updateClient', 'updateClient')

export default class StatusSelectContainer extends Component {
  static propTypes = {
    updateClient: func.isRequired,
    clientId: string.isRequired,
    client: clientPropType,
    status: object,
  };

  submitUserStatus = (clientStatus) => {
    const { updateClient, status: prefetchStatus, clientId } = this.props;
    return updateClient({ id: clientId }, produce(prefetchStatus.client.result, (draft) => {
      draft.status = clientStatus;
    }));
  };

  onUnPause = (notifyInfo, notifyError) => {
    const { setStatusToActive } = this;

    return setStatusToActive()
      .then(() => {
        SlyEvent.getInstance().sendEvent({
          category: 'fdetails',
          action: 'unpause-family',
          label: 'submit',
          value: '',
        });
        notifyInfo('Family successfully unpaused');
      })
      .catch((r) => {
        // TODO: Need to set a proper way to handle server side errors
        const { body } = r;
        const errorMessage = body.errors.map(e => e.title).join('. ');
        console.error(errorMessage);
        notifyError('Failed to unpause. Please try again.');
        SlyEvent.getInstance().sendEvent({
          category: 'fdetails',
          action: 'unpause-family',
          label: 'error',
          value: '',
        });
      });
  };

  setStatusToActive = () => {
    const { updateClient, client, status } = this.props;
    const { id } = client;
    const { result: rawClient } = status.client;
    const newClient = immutable(pick(rawClient, ['id', 'type', 'attributes.status']))
      .set('attributes.status', FAMILY_STATUS_ACTIVE)
      .value();

    return updateClient({ id }, newClient);
  };

  handlePauseClick = () => {
    const {
      showModal, hideModal, notifyError, client, rawClient, notifyInfo, onUnPause,
    } = this.props;
    const { status } = client;
    const isPaused = status === FAMILY_STATUS_ON_PAUSE;

    if (isPaused) {
      onUnPause();
    } else {
      showModal(<PlaceFamilyOnPauseFormContainer
        onSuccess={hideModal}
        onCancel={hideModal}
        notifyError={notifyError}
        notifyInfo={notifyInfo}
        client={client}
        rawClient={rawClient}
      />, null, 'noPadding', false);
    }
    SlyEvent.getInstance().sendEvent({
      category: 'fdetails',
      action: 'launch',
      label: (isPaused ? 'true' : 'false'),
      value: '',
    });
  };

  onChange = ({ value }) => {
    this.submitUserStatus(value);
  };

  render() {
    const { client, ...props } = this.props;
    return (
      <StatusSelect
        type="choice"
        value={client.status}
        size="tiny"
        options={options}
        onChange={this.onChange}
        {...props}
      />
    );
  }
}
