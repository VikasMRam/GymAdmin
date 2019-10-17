import React from 'react';
import styled from 'styled-components';
import { object } from 'prop-types';

import pad from 'sly/components/helpers/pad';
import { Table } from 'sly/components/atoms';
import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';

const TableSectionWrapper = styled.div`
  overflow: auto;
`;

const TableWrapper = pad(styled.div, 'large');

const DashboardCallsIndexPage = ({ tableContents }) => (
  <DashboardPageTemplate activeMenuItem="My Families">
    <>
      <TableSectionWrapper>
        <TableWrapper>
          <Table {...tableContents} />
        </TableWrapper>
      </TableSectionWrapper>
    </>
  </DashboardPageTemplate>
);

DashboardCallsIndexPage.propTypes = {
  tableContents: object,
};

DashboardCallsIndexPage.defaultProps = {
  tableContents: [],
};

export default DashboardCallsIndexPage;
