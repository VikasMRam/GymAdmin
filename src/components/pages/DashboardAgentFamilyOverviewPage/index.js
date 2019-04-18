import React, { Fragment } from 'react';
import styled from 'styled-components';
import { arrayOf, object, string } from 'prop-types';

import MultipleChoice from 'sly/components/molecules/MultipleChoice';
import { size, palette } from 'sly/components/themes';
import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import TableHeaderButtons from 'sly/components/molecules/TableHeaderButtons';
import Block from 'sly/components/atoms/Block';
import TableRowCard from 'sly/components/molecules/TableRowCard';
import Pagination from 'sly/components/molecules/Pagination';
import Tabs from 'sly/components/molecules/Tabs';
import Table from 'sly/components/organisms/Table';
import { FAMILY_DASHBOARD_FAMILIES_PATH } from 'sly/constants/dashboardAppPaths';

const SmallScreenSection = styled.div`
  display: block;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: none;
  }
`;

const BigScreenSection = styled.div`
  display: none;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: block;
    background-color: ${palette('white.base')};
  }
`;
const ButtonTabsWrapper = styled.div`
  padding: ${size('spacing.large')};
  border-bottom: ${size('border.regular')} solid ${palette('grey', 'filler')};
`;

const ButtonTabs = styled(MultipleChoice)`
  
`;

const TableRowCardsWrapper = styled.div`
  padding: ${size('spacing.large')};
  background-color: ${palette('grey.background')};
  border-top: ${size('border.regular')} 0 solid ${palette('grey', 'filler')};
  border-bottom: ${size('border.regular')} solid ${palette('grey', 'filler')};
`;

const FamiliesCountStatusBlock = styled(Block)`
  margin-bottom: ${size('spacing.large')};
  margin-left: ${size('spacing.large')};
`;

const TableRowCardWrapper = styled.div`
  margin-bottom: ${size('spacing.large')};
  background-color: ${palette('white.base')};
`;

const TableSectionWrapper = styled.div`
  overflow: auto;
`;

const TableWrapper = styled.div`
  margin-bottom: ${size('spacing.large')};
`;

const BigScreenPaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const tabsOptions = [
  { value: 'Prospects', label: 'Prospects' },
  { value: 'Connected', label: 'Connected' },
  { value: 'Closed', label: 'Closed' },
];

const tableHeaderButtons = <TableHeaderButtons />;

const EmptyTextWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: ${size('spacing.xxxLarge')} ${size('spacing.xxLarge')};
  height: 100vh;
  text-align: center;
`;

const SmallScreenView = ({
  mobileContents, paginationParams, paginationString, activeTab, tableEmptyText,
}) => {
  const emptyTextComponent = <EmptyTextWrapper><Block palette="grey">{tableEmptyText}</Block></EmptyTextWrapper>;
  return (
    <SmallScreenSection>
      <ButtonTabsWrapper>
        <ButtonTabs type="singlechoice" orientation="horizontal" buttonKind="tab" options={tabsOptions} value={activeTab} />
      </ButtonTabsWrapper>
      {tableHeaderButtons}
      <TableRowCardsWrapper>
        {mobileContents.length > 0 && (
          <Fragment>
            <FamiliesCountStatusBlock size="caption">{paginationString}</FamiliesCountStatusBlock>
            {mobileContents.map(content => <TableRowCardWrapper key={content.id}><TableRowCard {...content} /></TableRowCardWrapper>)}
            <Pagination {...paginationParams} />
          </Fragment>
        )}
        {mobileContents.length === 0 && emptyTextComponent}
      </TableRowCardsWrapper>
    </SmallScreenSection>
  );
};

SmallScreenView.propTypes = {
  mobileContents: arrayOf(object),
  paginationParams: object,
  paginationString: string,
  activeTab: string,
  tableEmptyText: string,
};

const BigScreenView = ({ tableContents, paginationParams, paginationString }) => (
  <Fragment>
    {tableHeaderButtons}
    <TableSectionWrapper>
      <TableWrapper>
        <Table {...tableContents} />
      </TableWrapper>
      <BigScreenPaginationWrapper>
        <Pagination {...paginationParams} />
      </BigScreenPaginationWrapper>
      <FamiliesCountStatusBlock size="caption">{paginationString}</FamiliesCountStatusBlock>
    </TableSectionWrapper>
  </Fragment>
);

BigScreenView.propTypes = {
  tableContents: object,
  paginationParams: object,
  paginationString: string,
};

const DashboardAgentFamilyOverviewPage = ({
  mobileContents, tableContents, pagination, paginationString, activeTab,
}) => {
  const { current, total } = pagination;
  const paginationParams = {
    current,
    total,
    range: 1,
    basePath: FAMILY_DASHBOARD_FAMILIES_PATH,
    pageParam: 'page-number',
  };
  const bigScreenView = (<BigScreenView tableContents={tableContents} paginationParams={paginationParams} paginationString={paginationString} />);
  const { tableEmptyText } = tableContents;
  return (
    <DashboardPageTemplate activeMenuItem="My Families">
      <SmallScreenView
        mobileContents={mobileContents}
        paginationParams={paginationParams}
        paginationString={paginationString}
        activeTab={activeTab}
        tableEmptyText={tableEmptyText}
      />
      <BigScreenSection>
        <Tabs activeTab={activeTab}>
          <div label="Prospects" to={FAMILY_DASHBOARD_FAMILIES_PATH}>
            {bigScreenView}
          </div>
          <div label="Connected" to={`${FAMILY_DASHBOARD_FAMILIES_PATH}?type=Connected`}>
            {bigScreenView}
          </div>
          <div label="Closed" to={`${FAMILY_DASHBOARD_FAMILIES_PATH}?type=Closed`}>
            {bigScreenView}
          </div>
        </Tabs>
      </BigScreenSection>
    </DashboardPageTemplate>
  );
};

DashboardAgentFamilyOverviewPage.propTypes = {
  mobileContents: arrayOf(object),
  tableContents: object,
  pagination: object,
  paginationString: string,
  activeTab: string,
};

DashboardAgentFamilyOverviewPage.defaultProps = {
  mobileContents: [],
};

export default DashboardAgentFamilyOverviewPage;
