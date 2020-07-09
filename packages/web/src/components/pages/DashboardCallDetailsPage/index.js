import React, { Component } from 'react';
import styled from 'styled-components';
import { object, string, shape, func } from 'prop-types';
import { generatePath } from 'react-router';

import voiceCallPropType from 'sly/web/propTypes/calls';
import { palette, size } from 'sly/web/components/themes';
import { Box } from 'sly/web/components/atoms';
import DashboardTwoColumnTemplate from 'sly/web/components/templates/DashboardTwoColumnTemplate';
import DashboardCallCommunitiesContainer from 'sly/web/containers/dashboard/DashboardCallCommunitiesContainer';
import AddFamilyFormContainer from 'sly/web/containers/dashboard/AddFamilyFormContainer';
import {
  ADMIN_DASHBOARD_CALL_DETAILS_PATH,
  COMMUNITIES,
} from 'sly/web/constants/dashboardAppPaths';

const TabWrapper = styled.div`
  padding: ${size('spacing.large')};
  background-color: ${palette('grey', 'background')};
  margin-bottom: ${size('dashboard.actionFooterBottomMargin')};

  > * {
    background-color: ${palette('white', 'base')};
  }
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: ${size('spacing.xLarge')};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    background-color: ${palette('white', 'base')};
    padding: 0;
    margin-bottom: 0;
  }
`;
const formatPhoneAsName = (phoneNumber = '') => {
  return phoneNumber.replace(/^\+1/, '');
};

export default class DashboardCallDetailsPage extends Component {
  static propTypes = {
    meta: object,
    voiceCall: voiceCallPropType.isRequired,
    query: shape({
      phone: string,
      name: string,
      zip: string,
    }),
    handleCommunitySearch: func.isRequired,
    postCreateClient: func,
    notifyError: func,
    notifyInfo: func,
  };

  state = {
    currentTab: COMMUNITIES,
  };

  changeTab = (tabName) => {
    this.setState({
      currentTab: tabName,
    });
  };
  onCancel = () => {

  };

  render() {
    const {
      voiceCall, query, handleCommunitySearch, postCreateClient, notifyInfo, notifyError,
    } = this.props;

    const { currentTab } =  this.state;

    if (!voiceCall) {
      return (
        <DashboardTwoColumnTemplate activeMenuItem="Families">
          Loading...
        </DashboardTwoColumnTemplate>
      );
    }
    const { id, fromNumber } = voiceCall;
    const initialFormData = { name: formatPhoneAsName(fromNumber), phone: formatPhoneAsName(fromNumber), source: 'Direct Call' };
    const searchPath = generatePath(ADMIN_DASHBOARD_CALL_DETAILS_PATH, { id, tab: COMMUNITIES });

    return (
      <>
        <DashboardTwoColumnTemplate>
          <Box>
            <AddFamilyFormContainer
              onCancel={this.onCancel}
              notifyInfo={notifyInfo}
              onSuccess={postCreateClient}
              initialValues={initialFormData}
            />
          </Box>
          <div>
            <TabWrapper >
              { currentTab === COMMUNITIES && (
                <DashboardCallCommunitiesContainer notifyInfo={notifyInfo} notifyError={notifyError} voiceCall={voiceCall} handleCommunitySearch={handleCommunitySearch} />
                )
              }
            </TabWrapper>
          </div>

        </DashboardTwoColumnTemplate>
      </>
    );
  }
}
/*
communities, isAdminUser, childrenClientCommunityIdsMap, handleCommunitySearch, setSelectedCommunity, onSubmit, handleLocationSearch,
 */
