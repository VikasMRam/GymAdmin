import React, { Fragment, Component } from 'react';
import { string, object } from 'prop-types';
import { generatePath } from 'react-router';

import { AGENT_DASHBOARD_FAMILIES_DETAILS_PATH } from 'constants/dashboardAppPaths.js';
import NotificationController from 'sly/controllers/NotificationController';

import DashboardFamilyNewPage from 'sly/components/pages/DashboardFamilyNewPage';


export default class DashboardFamiliesNewPageContainer extends Component {
  handleNewClientSubmit = (data) => {
    const { history } = this.props;
    const clientPath = generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id: data.id });
    history.push(clientPath);
  };

  render() {
    const meta = {
      referralSource: ['Direct Call', 'Online'], lookingFor: ['Father', 'Mother'], gender: ['Female', 'Male'], timeToMove: ['Now', '1+ Months', '3+ Months'], monthlyBudget: ['Under $2000', '$2k-$3k', '$3k-$4k', '$4k+'],
    };

    return (
      <NotificationController>
        { ({
             notifyInfo,
             notifyError,
           }) => (
             <DashboardFamilyNewPage notifyInfo={notifyInfo} notifyError={notifyError} postCreateClient={this.handleNewClientSubmit} meta={meta} />
        )}
      </NotificationController>
    );
  }
}
