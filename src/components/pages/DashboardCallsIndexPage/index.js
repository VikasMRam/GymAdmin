import React, { Fragment } from 'react';
import styled from 'styled-components';
import { object } from 'prop-types';

import { size } from 'sly/components/themes';
import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import Table from 'sly/components/organisms/Table';


const TableSectionWrapper = styled.div`
  overflow: auto;
`;

const TableWrapper = styled.div`
  margin-bottom: ${size('spacing.large')};
`;

const DashboardCallsIndexPage = ({ tableContents }) => {
  return (
    <DashboardPageTemplate activeMenuItem="My Families">
      <Fragment>
        <TableSectionWrapper>
          <TableWrapper>
            <Table {...tableContents} />
          </TableWrapper>
        </TableSectionWrapper>
      </Fragment>
    </DashboardPageTemplate>
  );
};

DashboardCallsIndexPage.propTypes = {
  tableContents: object,
};

DashboardCallsIndexPage.defaultProps = {
  tableContents: [],
};

export default DashboardCallsIndexPage;
