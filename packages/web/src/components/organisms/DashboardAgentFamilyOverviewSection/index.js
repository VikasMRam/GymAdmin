import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { arrayOf, object, string, bool, func } from 'prop-types';
import { generatePath } from 'react-router';

import { size, palette } from 'sly/common/components/themes';
import mobileOnly from 'sly/web/components/helpers/mobileOnly';
import pad from 'sly/web/components/helpers/pad';
import SlyEvent from 'sly/web/services/helpers/events';
import TableHeaderButtons from 'sly/web/components/molecules/TableHeaderButtons';
import { Box, Table, THead, TBody, Tr, Heading } from 'sly/web/components/atoms';
import Pagination from 'sly/web/components/molecules/Pagination';
import Tabs from 'sly/web/components/molecules/Tabs';
import Tab from 'sly/web/components/molecules/Tab';
import clientPropType, { meta as clientMetaPropType } from 'sly/common/propTypes/client';
import { AGENT_DASHBOARD_FAMILIES_PATH, NEWFAMILIES, PROSPECTING, CONNECTED, CLOSED, WON } from 'sly/web/constants/dashboardAppPaths';
import Th from 'sly/web/components/molecules/Th';
import IconButton from 'sly/common/components/molecules/IconButton';
import ClientRowCard from 'sly/web/components/organisms/ClientRowCard';
import Role from 'sly/web/components/common/Role';
import AddFamilyFormContainer from 'sly/web/containers/dashboard/AddFamilyFormContainer';
import { PLATFORM_ADMIN_ROLE, AGENT_ADMIN_ROLE } from 'sly/common/constants/roles';
import { stripPageNumber } from 'sly/web/services/helpers/appPaths';

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

const TwoColumn = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: capitalize;
  ${Heading} {
    margin-bottom: 0;
  }
`;

TwoColumn.defaultProps = {
  background: 'white',
  padding: 'large',
};

const TabMap = {
  New: NEWFAMILIES,
  Prospects: PROSPECTING,
  Connected: CONNECTED,
  Closed: CLOSED,
  Won: WON,
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

    return (
      <>
        <TwoColumn>
          <Heading size="subtitle" pad="0">Families</Heading>
          <Role className="addFamily" is={PLATFORM_ADMIN_ROLE | AGENT_ADMIN_ROLE}>
            <IconButton icon="user-add" onClick={this.handleAddFamilyClick} hideTextInMobile>
              Add family
            </IconButton>
          </Role>
        </TwoColumn>

        <Tabs activeTab={activeTab} snap="top">
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
              <StyledTable sticky>
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
