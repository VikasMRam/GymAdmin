import React, { Component } from 'react';
import styled from 'styled-components';
import { object, string, shape, func } from 'prop-types';
import voiceCallPropType from 'sly/propTypes/calls';
import { palette, size } from 'sly/components/themes';
import { Hr, Box } from 'sly/components/atoms';
import Tabs from 'sly/components/molecules/Tabs';
import Tab from 'sly/components/molecules/Tab';
import DashboardTwoColumnTemplate from 'sly/components/templates/DashboardTwoColumnTemplate';
import DashboardAdminFamilyDetailsFormContainer from 'sly/containers/DashboardAdminFamilyDetailsFormContainer';
import DashboardAdminSearchContainer from 'sly/containers/DashboardAdminSearchContainer';
import {
  ADMIN_DASHBOARD_CALL_DETAILS_PATH,
  COMMUNITIES,
  ACTIVITY,
  SUMMARY,
} from 'sly/constants/dashboardAppPaths';
import { generatePath } from 'react-router';
import { clickEventHandler } from 'sly/services/helpers/eventHandlers';

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

  render() {
    const {
      voiceCall, query, meta, handleCommunitySearch, postCreateClient, notifyInfo, notifyError,
    } = this.props;

    const { currentTab } =  this.state;

    if (!voiceCall) {
      return (
        <DashboardTwoColumnTemplate activeMenuItem="My Families">
          Loading...
        </DashboardTwoColumnTemplate>
      );
    }
    const { id } = voiceCall;

    const searchPath = generatePath(ADMIN_DASHBOARD_CALL_DETAILS_PATH, { id, tab: COMMUNITIES });
    const activityPath = generatePath(ADMIN_DASHBOARD_CALL_DETAILS_PATH, { id, tab: ACTIVITY });
    const initialFormData = { name: voiceCall.toNumber, phoneNumber: voiceCall.fromNumber, referralSource: 'Direct Call' };
    return (
      <>
        <DashboardTwoColumnTemplate>
          <Box><DashboardAdminFamilyDetailsFormContainer notifyInfo={notifyInfo} notifyError={notifyError} postCreateClient={postCreateClient} initialFormData={initialFormData} {...meta} /></Box>
          <div>
            <Tabs activeTab={currentTab}>
              <Tab id="AdminSearch" to={searchPath} onClick={() => { this.changeTab(COMMUNITIES); return clickEventHandler('calldetails-tab', 'Communities'); }}>
                Communities
              </Tab>
              <Tab id="Activity" to={activityPath} onClick={() => { this.changeTab(ACTIVITY); return clickEventHandler('calldetails-tab', 'Activity'); }}>
                Activity
              </Tab>
            </Tabs>
            <TabWrapper >
              { currentTab === COMMUNITIES && (
                <DashboardAdminSearchContainer notifyInfo={notifyInfo} notifyError={notifyError} query={query} handleCommunitySearch={handleCommunitySearch} />
                )
              }
              { currentTab === ACTIVITY && (
                <div>TODO ACTIVITY</div>
              )
              }
            </TabWrapper>
          </div>

        </DashboardTwoColumnTemplate>
      </>
    );
  }
}
