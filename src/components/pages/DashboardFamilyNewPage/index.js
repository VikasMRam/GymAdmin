import React, { Fragment, Component } from 'react';

import { object, string, shape, func } from 'prop-types';

import { Box } from 'sly/components/atoms';

import DashboardTwoColumnTemplate from 'sly/components/templates/DashboardTwoColumnTemplate';
import DashboardAdminFamilyDetailsFormContainer from 'sly/containers/DashboardAdminFamilyDetailsFormContainer';


export default class DashboardFamilyNewPage extends Component {
  static propTypes = {
    meta: object,
    postCreateClient: func.isRequired,
    notifyError: func,
    notifyInfo: func,
  };

  render() {
    const {
      meta, postCreateClient, notifyInfo, notifyError,
    } = this.props;

    const initialFormData = { referralSource: 'Direct Call' };
    return (
      <Fragment>
        <DashboardTwoColumnTemplate>
          <Box><DashboardAdminFamilyDetailsFormContainer notifyInfo={notifyInfo} notifyError={notifyError} postCreateClient={postCreateClient} initialFormData={initialFormData} {...meta} /></Box>
          <div />
        </DashboardTwoColumnTemplate>
      </Fragment>
    );
  }
}
