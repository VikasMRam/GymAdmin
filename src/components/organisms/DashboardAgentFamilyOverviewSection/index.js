import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import { arrayOf, shape, object, string, bool, func } from 'prop-types';
import { generatePath } from 'react-router';

import { size, palette } from 'sly/components/themes';
import mobileOnly from 'sly/components/helpers/mobileOnly';
import pad from 'sly/components/helpers/pad';
import SlyEvent from 'sly/services/helpers/events';
import TableHeaderButtons from 'sly/components/molecules/TableHeaderButtons';
import { Box, Table, THead, TBody, Tr } from 'sly/components/atoms';
import Pagination from 'sly/components/molecules/Pagination';
import Tabs from 'sly/components/molecules/Tabs';
import Tab from 'sly/components/molecules/Tab';
import clientPropType from 'sly/propTypes/client';
import {
  ACTIVITY,
  AGENT_DASHBOARD_FAMILIES_PATH,
  AGENT_DASHBOARD_FAMILIES_NEW_PATH,
  SUMMARY,
  PROSPECTING, CONNECTED, CLOSED,
} from 'sly/constants/dashboardAppPaths';
import Th from 'sly/components/molecules/Th';
import ClientRowCard from 'sly/components/organisms/ClientRowCard';

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

const getBasePath = clientType => generatePath(AGENT_DASHBOARD_FAMILIES_PATH, { clientType });

const DashboardAgentFamilyOverviewSection = ({
  clients,
  pagination,
  activeTab,
  onSearchTextKeyUp,
  isPageLoading,
  basePath,
  breakpoint,
  datatable,
}) => {
  return (
    <Fragment>
      <Tabs activeTab={activeTab} tabsOnly>
        {Object.entries(TabMap).map(([name, key]) => (
          <Tab
            id={key}
            to={getBasePath(key)}
            onClick={() => onTabClick(name)}
          >
            {`${name} (${pagination[`${key}Count`] || '0'})`}
          </Tab>
        ))}
      </Tabs>

      <TableHeaderButtons
        datatable={datatable}
        onSearchTextKeyUp={onSearchTextKeyUp}
        modelName="Client"
      />

      <Section>
        {!isPageLoading && (
          <Fragment>
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
                  <ClientRowCard key={client.id} client={client} breakpoint={breakpoint} />
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
          </Fragment>
        )}
        {isPageLoading && 'Loading...'}
      </Section>

      {!isPageLoading && (
        <FamiliesCountStatusBlock padding="regular" size="caption" snap="top">
          {pagination.text}
        </FamiliesCountStatusBlock>
      )}
    </Fragment>
  );
};

DashboardAgentFamilyOverviewSection.propTypes = {
  datatable: object,
  clients: arrayOf(clientPropType),
  pagination: object,
  breakpoint: object,
  paginationString: string,
  activeTab: string,
  showPagination: bool,
  searchTextValue: string,
  onSearchTextKeyUp: func,
  isPageLoading: bool,
  basePath: string,
};

DashboardAgentFamilyOverviewSection.defaultProps = {
  mobileContents: [],
};

export default DashboardAgentFamilyOverviewSection;
