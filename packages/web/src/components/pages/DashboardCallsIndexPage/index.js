import React from 'react';
import styled from 'styled-components';
import { object } from 'prop-types';

import pad from 'sly/web/components/helpers/pad';
import { Table, THead, TBody, Tr } from 'sly/web/components/atoms';
import Th from 'sly/web/components/molecules/Th';
import VoiceRowCard from 'sly/web/components/organisms/VoiceRowCard';
import DashboardPageTemplate from 'sly/web/components/templates/DashboardPageTemplate';

const TableSectionWrapper = styled.div`
  overflow: auto;
`;

const DashboardCallsIndexPage = ({ tableContents }) => {
  const { headings, contents, tableEmptyText } = tableContents;
  return (
    <DashboardPageTemplate activeMenuItem="Calls">
      <TableSectionWrapper>
        <Table>
          <THead>
            <Tr>
              {headings
                .map(({ text }) => <Th key={text}>{text}</Th>)
              }
            </Tr>
          </THead>
          <TBody>
            {contents.map(voiceCall => (
              <VoiceRowCard key={voiceCall.toNumber} voiceCall={voiceCall} />
            ))}
            {contents.length === 0 && <Tr>{tableEmptyText}</Tr>
            }
          </TBody>
        </Table>
      </TableSectionWrapper>
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
