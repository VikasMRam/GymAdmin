import React, { Component } from 'react';
import styled from 'styled-components';
import { func, string, object } from 'prop-types';
import produce from 'immer';

import clientPropType from 'sly/propTypes/client';
import { size } from 'sly/components/themes';
import Field from 'sly/components/molecules/Field';
import {
  FAMILY_STATUS_ACTIVE,
  FAMILY_STATUS_ARCHIVED,
  FAMILY_STATUS_HOT,
  FAMILY_STATUS_DELETED,
  FAMILY_STATUS_LONG_TERM,
  FAMILY_STATUS_ON_PAUSE,
} from 'sly/constants/familyDetails';

import SlyEvent from 'sly/services/helpers/events';
import { prefetch, query } from 'sly/services/newApi';
import ConfirmReasonFormContainer from 'sly/containers/ConfirmReasonFormContainer';
import ConfirmationDialog from 'sly/components/molecules/ConfirmationDialog';

const options = [
  { label: 'Active',    icon: 'active',     palette: 'green',  value: FAMILY_STATUS_ACTIVE },
  // { label: 'Hot',       icon: 'hot',        palette: 'yellow', value: FAMILY_STATUS_HOT },
  { label: 'Long Term', icon: 'hourglass',  palette: 'purple', value: FAMILY_STATUS_LONG_TERM },
  { label: 'On Pause',  icon: 'pause',      palette: 'danger', value: FAMILY_STATUS_ON_PAUSE },
  { label: 'Archived',  icon: 'archived',   palette: 'slate',  value: FAMILY_STATUS_ARCHIVED },
  { label: 'Deleted',   icon: 'trash-fill', palette: 'grey',   value: FAMILY_STATUS_DELETED },
];

const StyledField = styled(Field)`
  text-transform: uppercase;
  & .react-select__single-value, & .react-select__option {
    font-weight: ${size('weight.bold')};
  }
  
  & .react-select__single-value > :nth-child(2) {
    display: none; 
  }
`;

@prefetch('client', 'getClient', (req, { clientId }) => req({
  id: clientId,
}))

@query('updateClient', 'updateClient')

export default class StatusSelect extends Component {
  static propTypes = {
    updateClient: func.isRequired,
    clientId: string.isRequired,
    client: clientPropType,
    status: object,
    showModal: func,
    hideModal: func,
    notifyInfo: func,
  };

  state = {
    status: this.props.client.status,
  };

  onChange = ({ value }) => {
    const { notifyInfo, hideModal } = this.props;

    this.setState({ status: value }, () => this.confirm(value)
      .then(reason => this.submitUserStatus(value, reason))
      .then(() => {
        SlyEvent.getInstance().sendEvent({
          category: 'fdetails',
          action: 'set-family-status',
          label: 'submit',
          value,
        });
        notifyInfo(`Family successfully set to "${value}"`);
      })
      .then(hideModal));
  };

  confirm = (toStatus) => {
    const { showModal, hideModal, client } = this.props;

    const onCancel = () => this.setState({ status: client.status }, hideModal);

    return new Promise((resolve) => {
      switch (toStatus) {
        case FAMILY_STATUS_ON_PAUSE: return showModal((
          <ConfirmReasonFormContainer
            onAgree={({ reason }) => resolve(reason)}
            onCancel={onCancel}
            title={`Place ${client.name} on Pause`}
            message="Please write a reason why you are putting this family on Pause..."
          />
        ));
        default: return showModal((
          <ConfirmationDialog
            heading={`${client.name} to "${toStatus}"?`}
            description={`Are you sure that you want to set ${client.name} to "${toStatus}"?`}
            onConfirmClick={() => resolve()}
            onCancelClick={onCancel}
          />
        ));
      }
    });
  };

  submitUserStatus = (clientStatus, onHoldReason) => {
    const { updateClient, status: prefetchStatus, clientId } = this.props;
    return updateClient({ id: clientId }, produce(prefetchStatus.client.result, (draft) => {
      draft.attributes.status = clientStatus;
      if (onHoldReason) {
        draft.attributes.clientInfo.onHoldReason = onHoldReason;
      }
    }));
  };

  render() {
    const { ...props } = this.props;
    return (
      <StyledField
        type="choice"
        value={this.state.status}
        size="tiny"
        options={options}
        onChange={this.onChange}
        {...props}
      />
    );
  }
}
