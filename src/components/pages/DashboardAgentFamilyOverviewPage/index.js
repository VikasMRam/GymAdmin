import React from 'react';
import styled from 'styled-components';
import { arrayOf, object } from 'prop-types';

import MultipleChoice from 'sly/components/molecules/MultipleChoice';
import { size, palette } from 'sly/components/themes';
import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import TableHeaderButtons from 'sly/components/molecules/TableHeaderButtons';
import Block from 'sly/components/atoms/Block';
import TableRowCard from 'sly/components/molecules/TableRowCard';
import Pagination from 'sly/components/molecules/Pagination';
import Tabs from 'sly/components/molecules/Tabs';
import Table from 'sly/components/organisms/Table';


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
  }
`;
const ButtonTabsWrapper = styled.div`
  padding: ${size('spacing.large')};
`;

const ButtonTabs = styled(MultipleChoice)`
  
`;

const TableRowCardsWrapper = styled.div`
  padding: ${size('spacing.large')};
  background-color: ${palette('grey.background')};
`;

const FamiliesCountStatusBlock = styled(Block)`
  margin-bottom: ${size('spacing.large')};
  margin-left: ${size('spacing.large')};
`;

const TableRowCardWrapper = styled.div`
  margin-bottom: ${size('spacing.large')};
  background-color: ${palette('white.base')};
`;

const MobileTableHeaderButtons = styled(TableHeaderButtons)`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: none;
  }
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

const firstFive = {
  current: 0,
  total: 5,
  range: 1,
  // onChange: action('change'),
  basePath: '/',
  pageParam: 'page-number',
};

const DashboardAgentFamilyOverviewPage = ({ mobileContents, tableContents }) => (
  <DashboardPageTemplate activeMenuItem="My Families">
    <SmallScreenSection>
      <ButtonTabsWrapper>
        <ButtonTabs type="singlechoice" orientation="horizontal" buttonKind="tab" options={tabsOptions} value="prospects" />
      </ButtonTabsWrapper>
      <MobileTableHeaderButtons />
      <TableRowCardsWrapper>
        <FamiliesCountStatusBlock size="caption">Showing 1-8 of 200 families</FamiliesCountStatusBlock>
        {mobileContents.map(content => <TableRowCardWrapper key={content.id}><TableRowCard {...content} /></TableRowCardWrapper>)}
        <Pagination {...firstFive} current={0} />
      </TableRowCardsWrapper>
    </SmallScreenSection>
    <BigScreenSection>
      <Tabs>
        <div label="Prospects">
          <TableHeaderButtons />
          <TableSectionWrapper>
            <TableWrapper>
              <Table {...tableContents} />
            </TableWrapper>
            <BigScreenPaginationWrapper>
              <Pagination {...firstFive} current={0} />
            </BigScreenPaginationWrapper>
            <FamiliesCountStatusBlock size="caption">Showing 1-8 of 200 families</FamiliesCountStatusBlock>
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

DashboardAgentFamilyOverviewPage.propTypes = {
  mobileContents: arrayOf(object),
  tableContents: object,
};

DashboardAgentFamilyOverviewPage.defaultProps = {
  mobileContents: [],
};

export default DashboardAgentFamilyOverviewPage;
