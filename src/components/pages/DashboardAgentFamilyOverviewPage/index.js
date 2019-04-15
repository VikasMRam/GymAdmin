import React from 'react';
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
  { value: 'prospects', label: 'Prospects' },
  { value: 'connected', label: 'Connected' },
  { value: 'closed', label: 'Closed' },
];

const DashboardAgentFamilyOverviewPage = ({
  mobileContents, tableContents, pagination, paginationString,
}) => {
  const { current, total } = pagination;
  const paginationParams = {
    current,
    total,
    range: 1,
    basePath: FAMILY_DASHBOARD_FAMILIES_PATH,
    pageParam: 'page-number',
  };

  const tableHeaderButtons = <TableHeaderButtons />;
  return (
    <DashboardPageTemplate activeMenuItem="My Families">
      <SmallScreenSection>
        <ButtonTabsWrapper>
          <ButtonTabs type="singlechoice" orientation="horizontal" buttonKind="tab" options={tabsOptions} value="prospects" />
        </ButtonTabsWrapper>
        {tableHeaderButtons}
        <TableRowCardsWrapper>
          <FamiliesCountStatusBlock size="caption">{paginationString}</FamiliesCountStatusBlock>
          {mobileContents.map(content => <TableRowCardWrapper key={content.id}><TableRowCard {...content} /></TableRowCardWrapper>)}
          <Pagination {...paginationParams} />
        </TableRowCardsWrapper>
      </SmallScreenSection>
      <BigScreenSection>
        <Tabs>
          <div label="Prospects">
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
          </div>
          <div label="Connected">
            After while, <em>Crocodile</em>!
          </div>
          <div label="Closed">
            Nothing to see here, this tab is <em>extinct</em>!
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
};

DashboardAgentFamilyOverviewPage.defaultProps = {
  mobileContents: [],
};

export default DashboardAgentFamilyOverviewPage;
