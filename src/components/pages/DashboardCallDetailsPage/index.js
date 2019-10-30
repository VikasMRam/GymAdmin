import React, { Component } from 'react';
import styled from 'styled-components';
import { object, string, shape, func } from 'prop-types';
import voiceCallPropType from 'sly/propTypes/calls';
import { palette, size } from 'sly/components/themes';
import { Hr, Box } from 'sly/components/atoms';
import Tabs from 'sly/components/molecules/Tabs';
import Tab from 'sly/components/molecules/Tab';
import DashboardTwoColumnTemplate from 'sly/components/templates/DashboardTwoColumnTemplate';
import DashboardCallCommunitiesContainer from 'sly/containers/dashboard/DashboardCallCommunitiesContainer';
import AddFamilyFormContainer from 'sly/containers/dashboard/AddFamilyFormContainer';
import {
  ADMIN_DASHBOARD_CALL_DETAILS_PATH,
  COMMUNITIES,
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
  onCancel = () => {

  };

  render() {
    const {
      voiceCall, query, handleCommunitySearch, postCreateClient, notifyInfo, notifyError,
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
    const initialFormData = { name: voiceCall.fromNumber, phone: voiceCall.fromNumber, source: 'Direct Call' };
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
            {/*<Tabs activeTab={currentTab}>*/}
              {/*<Tab id="AdminSearch" to={searchPath} onClick={() => { this.changeTab(COMMUNITIES); return clickEventHandler('calldetails-tab', 'Communities'); }}>*/}
                {/*Communities*/}
              {/*</Tab>*/}
            {/*</Tabs>*/}
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
