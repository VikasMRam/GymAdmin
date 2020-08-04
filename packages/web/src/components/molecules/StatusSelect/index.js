import React, { Component } from 'react';
import styled from 'styled-components';
import { func, object, string } from 'prop-types';
import * as immutable from 'object-path-immutable';
import pick from 'lodash/pick';

import userPropType from 'sly/common/propTypes/user';
import clientPropType from 'sly/common/propTypes/client';
import { size } from 'sly/common/components/themes';
import { AGENT_ND_ROLE, PLATFORM_ADMIN_ROLE } from 'sly/common/constants/roles';
import Field from 'sly/common/components/molecules/Field';
import {
  FAMILY_STATUS_ACTIVE,
  FAMILY_STATUS_ARCHIVED,
  //  FAMILY_STATUS_HOT,
  FAMILY_STATUS_DELETED,
  FAMILY_STATUS_LONG_TERM,
  FAMILY_STATUS_ON_PAUSE,
} from 'sly/web/constants/familyDetails';
import SlyEvent from 'sly/web/services/helpers/events';
import { query } from 'sly/web/services/api';
import ConfirmReasonFormContainer from 'sly/web/containers/ConfirmReasonFormContainer';
import ConfirmationDialog from 'sly/web/components/molecules/ConfirmationDialog';

const options = [
  { label: 'Active',    icon: 'active',     palette: 'green',  value: FAMILY_STATUS_ACTIVE, role: AGENT_ND_ROLE  },
  // { label: 'Hot',       icon: 'hot',        palette: 'yellow', value: FAMILY_STATUS_HOT },
  { label: 'Long Term', icon: 'hourglass',  palette: 'magenta', value: FAMILY_STATUS_LONG_TERM, role: PLATFORM_ADMIN_ROLE },
  { label: 'On Pause',  icon: 'pause',      palette: 'danger', value: FAMILY_STATUS_ON_PAUSE, role: AGENT_ND_ROLE },
  { label: 'Archived',  icon: 'archived',   palette: 'slate',  value: FAMILY_STATUS_ARCHIVED, role: PLATFORM_ADMIN_ROLE  },
  { label: 'Deleted',   icon: 'trash-fill', palette: 'grey',   value: FAMILY_STATUS_DELETED, role: PLATFORM_ADMIN_ROLE },
];

const reasonKeys = {
  'Long Term': 'longTermReason',
  'On Pause': 'onHoldReason',
};

const StyledField = styled(Field)`
  text-transform: uppercase;
  & .react-select__single-value, & .react-select__option {
    font-weight: ${size('weight.bold')};
  }
  & .react-select__menu {
    right: 0;
  }
`;

@query('updateClient', 'updateClient')

export default class StatusSelect extends Component {
  static propTypes = {
    updateClient: func.isRequired,
    client: clientPropType,
    rawClient: object,
    refetchClient: func.isRequired,
    showModal: func,
    hideModal: func,
    notifyInfo: func,
    user: userPropType,
    status: string,
    onStatusChange: func,
    onCancel: func,
  };

  state = {
    status: this.props.client.status,
  };

  componentDidUpdate({ status }) {
    const { status: newStatus } = this.props;
    if (status && newStatus && status !== newStatus) {
      this.onChange({ value: newStatus });
    }
  }

  onChange = ({ value }) => {
    const { notifyInfo, hideModal, refetchClient, onStatusChange } = this.props;

    this.setState({ status: value }, () => this.confirm(value)
      .then(data => this.submitUserStatus(value, data || {}))
      .then(() => {
        SlyEvent.getInstance().sendEvent({
          category: 'fdetails',
          action: 'set-family-status',
          label: 'submit',
          value,
        });
        notifyInfo(`Family successfully set to "${value}"`);
      })
      .then(hideModal)
      .then(refetchClient)
      .then(onStatusChange));
  };

  getDateProps = () => ({
    name: 'date',
    type: 'date',
    size: 'small',
    required: true,
    label: 'Expected resume date',
  });

  optionsForUser = () => {
    const { user } = this.props;
    const { roleID } = user;
    /* eslint-disable-next-line no-bitwise */
    return options.filter(o => o.role & roleID);
  };

  confirm = (toStatus) => {
    const { showModal, hideModal, client, onCancel: onCancelProp } = this.props;

    const onCancel = () => this.setState({ status: client.status }, () => {
      hideModal();
      onCancelProp();
    });
    let pauseInitialValues = {};
    if (client.status === FAMILY_STATUS_ON_PAUSE) {
      pauseInitialValues = {
        date: new Date(client.clientInfo.resumeDate),
        reason: client.clientInfo.onHoldReason,
      };
    }

    return new Promise((resolve) => {
      switch (toStatus) {
        case FAMILY_STATUS_LONG_TERM: return showModal((
          <ConfirmReasonFormContainer
            onAgree={resolve}
            onCancel={onCancel}
            title={`Place ${client.clientInfo.name} on ${toStatus}`}
            label="Long-term reason"
          />
        ), onCancel, 'noPadding', false);
        case FAMILY_STATUS_ON_PAUSE: return showModal((
          <ConfirmReasonFormContainer
            onAgree={resolve}
            onCancel={onCancel}
            title={`Place ${client.clientInfo.name} on ${toStatus}`}
            label="Pause reason"
            extraFieldProps={this.getDateProps()}
            initialValues={pauseInitialValues}
          />
        ), onCancel, 'noPadding', false);
        default: return showModal((
          <ConfirmationDialog
            heading={`Set ${client.clientInfo.name} to "${toStatus}"`}
            description={`Are you sure that you want to set ${client.clientInfo.name} to "${toStatus}"?`}
            onConfirmClick={() => resolve()}
            onCancelClick={onCancel}
          />
        ), onCancel);
      }
    });
  };

  submitUserStatus = (clientStatus, { reason, date }) => {
    const { updateClient, rawClient, client: clientObj } = this.props;
    const { tags } = clientObj;

    const client = immutable.wrap(pick(rawClient, ['id', 'type', 'attributes.clientInfo', 'relationships']));
    client.set('attributes.status', clientStatus);

    if (reason) {
      client.set(`attributes.clientInfo.${reasonKeys[clientStatus]}`, reason);
    }

    if (date) {
      client.set('attributes.clientInfo.resumeDate', date);
    }
    if (tags) {
      client.set('relationships.tags.data', tags.map(({ id, name }) => ({ type: 'Tag', id, attributes: { name } })));
    }

    return updateClient({ id: rawClient.id }, client.value());
  };

  render() {
    const { ...props } = this.props;
    return (
      <StyledField
        type="choice"
        name="status"
        value={this.state.status}
        size="tiny"
        options={this.optionsForUser()}
        onChange={this.onChange}
        {...props}
      />
    );
  }
}
