import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { arrayOf, shape, object, string, bool, func } from 'prop-types';
import { generatePath } from 'react-router';

import { size, palette } from 'sly/components/themes';
import mobileOnly from 'sly/components/helpers/mobileOnly';
import pad from 'sly/components/helpers/pad';
import SlyEvent from 'sly/services/helpers/events';
import TableHeaderButtons from 'sly/components/molecules/TableHeaderButtons';
import { Box, Table, THead, TBody, Tr, Heading } from 'sly/components/atoms';
import Pagination from 'sly/components/molecules/Pagination';
import Tabs from 'sly/components/molecules/Tabs';
import Tab from 'sly/components/molecules/Tab';
import clientPropType, { meta as clientMetaPropType } from 'sly/propTypes/client';
import { AGENT_DASHBOARD_FAMILIES_PATH, PROSPECTING, CONNECTED, CLOSED } from 'sly/constants/dashboardAppPaths';
import Th from 'sly/components/molecules/Th';
import IconButton from 'sly/components/molecules/IconButton';
import ClientRowCard from 'sly/components/organisms/ClientRowCard';
import Role from 'sly/components/common/Role';
import AddFamilyFormContainer from 'sly/containers/dashboard/AddFamilyFormContainer';
import { PLATFORM_ADMIN_ROLE } from 'sly/constants/roles';
import { stripPageNumber } from 'sly/services/helpers/appPaths';

const AGENT_FAMILY_OVERVIEW_TABLE_HEADINGS = [
  { text: 'Contact Name' },
  { text: 'Resident Name' },
  { text: 'Stage' },
  { text: 'Latest Activity' },
  { text: 'Date Added' },
];

const Section = styled.section`
  background-color: ${palette('grey.background')};
  padding: ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: 0;
    background-color: ${palette('white.base')};
    border: ${size('border.regular')} solid ${palette('slate.stroke')};
    border-top: 0;
    border-bottom: 0;
  }
`;

const StyledTable = styled(Table)`
  border-right: 0;
  border-left: 0;
`;

const CenteredPagination = styled(Pagination)`
  padding: ${size('spacing.large')};
  justify-content: center;
`;

const StyledPagination = styled(mobileOnly(CenteredPagination, css`
  position: sticky;
`))`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    border-bottom: ${size('border.regular')} solid ${palette('slate.stroke')};
  }
`;

const FamiliesCountStatusBlock = pad(styled(Box)`
  border-radius: 0;
  padding-left: ${size('spacing.regular')};
  padding-left: ${size('spacing.large')};
  background-color: ${palette('white.base')};
`, 'large');

const TwoColumn = pad(styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: capitalize;
  ${Heading} {
    margin-bottom: 0;
  }
`);
const TabMap = {
  Prospects: PROSPECTING,
  Connected: CONNECTED,
  Closed: CLOSED,
};

const onTabClick = (label) => {
  const event = {
    category: 'AgentDashboardFamilyOverviewTab',
    action: 'click',
    label,
  };
  SlyEvent.getInstance().sendEvent(event);
};


const getBasePath = (clientType, location) => {
  const path = generatePath(AGENT_DASHBOARD_FAMILIES_PATH, { clientType });
  return location && location.search ? `${path}${stripPageNumber(location.search)}` : path;
};

export default class DashboardAgentFamilyOverviewSection extends Component {
  static propTypes = {
    datatable: object,
    clients: arrayOf(clientPropType),
    meta: clientMetaPropType,
    pagination: object,
    paginationString: string,
    activeTab: string,
    showPagination: bool,
    searchTextValue: string,
    onSearchTextKeyUp: func,
    isPageLoading: bool,
    showModal: func.isRequired,
    hideModal: func.isRequired,
    notifyInfo: func.isRequired,
    onAddFamilySuccess: func,
    location: object,
  };

  static defaultProps = {
    mobileContents: [],
  };

  handleAddFamilyClick = () => {
    const {
      showModal,
      hideModal,
      notifyInfo,
      meta,
      onAddFamilySuccess,
    } = this.props;
    const {
      lookingFor,
      timeToMove,
    } = meta;
    const event = {
      category: 'AgentDashboardFamilies',
      action: 'click',
      label: 'addFamily',
    };
    SlyEvent.getInstance().sendEvent(event);
    showModal((
      <AddFamilyFormContainer
        notifyInfo={notifyInfo}
        lookingFor={lookingFor}
        timeToMove={timeToMove}
        onCancel={hideModal}
        onSuccess={onAddFamilySuccess}
      />
    ), null, 'noPadding', false);
  };

  render() {
    const {
      clients,
      pagination,
      activeTab,
      isPageLoading,
      datatable,
      meta,
      location,
    } = this.props;
    const modelConfig = { name: 'Client', defaultSearchField: 'name' };
    const beforeTabHeader = (
      <TwoColumn>
        <Heading level="subtitle">My Families</Heading>
        <Role className="addFamily" is={PLATFORM_ADMIN_ROLE}>
          <IconButton icon="user-add" onClick={this.handleAddFamilyClick} hideTextInMobile>
            Add family
          </IconButton>
        </Role>
      </TwoColumn>
    );

    return (
      <>
        <Tabs activeTab={activeTab} beforeHeader={beforeTabHeader} tabsOnly>
          {Object.entries(TabMap)
            .map(([name, key]) => (
              <Tab
                id={key}
                key={key}
                to={getBasePath(key, location)}
                onClick={() => onTabClick(name)}
              >
                {`${name} (${pagination[`${key}Count`] || '0'})`}
              </Tab>
            ))}
        </Tabs>
        <TableHeaderButtons
          datatable={datatable}
          meta={meta}
          modelConfig={modelConfig}
        />

        <Section>
          {!isPageLoading && (
            <>
              <StyledTable>
                <THead>
                  <Tr>
                    {AGENT_FAMILY_OVERVIEW_TABLE_HEADINGS
                      .map(({ text }) => <Th key={text}>{text}</Th>)
                    }
                  </Tr>
                </THead>
                <TBody>
                  {clients.map(client => (
                    <ClientRowCard key={client.id} client={client} />
                  ))}
                </TBody>
              </StyledTable>
              {pagination.show && (
                <StyledPagination
                  current={pagination.current}
                  total={pagination.total}
                  range={1}
                  basePath={datatable.basePath}
                  pageParam="page-number"
                />
              )}
            </>
          )}
          {isPageLoading && 'Loading...'}
        </Section>

        {!isPageLoading && (
          <FamiliesCountStatusBlock padding="regular" size="caption" snap="top">
            {pagination.text}
          </FamiliesCountStatusBlock>
        )}
      </>
    );
  }
}
