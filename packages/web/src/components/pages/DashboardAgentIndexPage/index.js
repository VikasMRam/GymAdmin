import React from 'react';
import { object, func } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/common/components/themes';
import DashboardPageTemplate from 'sly/web/components/templates/DashboardPageTemplate';
import DashboardAgentsIndexSectionContainer from 'sly/web/containers/dashboard/agents/DashboardAgentsIndexSectionContainer';
import { Datatable } from 'sly/web/services/datatable';
import { PLATFORM_ADMIN_ROLE } from 'sly/common/constants/roles';
import Role from 'sly/web/components/common/Role';
import { Heading } from 'sly/common/components/atoms';
import IconButton from 'sly/common/components/molecules/IconButton';
import pad from 'sly/web/components/helpers/pad';

const Wrapper = styled.div`
  border-bottom: ${size('border', 'regular')} solid ${palette('slate', 'stroke')};
  padding: ${size('spacing.large')};
  padding-bottom: 0;
  white-space: nowrap;
  /*
   overflow-x: auto;
   overflow-y: hidden;
  */
  background: ${palette('white.base')};
  text-transform: uppercase;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    border: ${size('border', 'regular')} solid ${palette('slate', 'stroke')};
    border-top-left-radius: ${size('border.xxLarge')};
    border-top-right-radius: ${size('border.xxLarge')};
  }
`;

const TwoColumn = pad(styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: capitalize;
  ${Heading} {
    margin-bottom: 0;
  }
`);

const DashboardAgentIndexPage = ({ sectionFilters, filters, onAddAgent}) => {
  return (
    <DashboardPageTemplate activeMenuItem="Agents">
      <Wrapper>
        <TwoColumn>
          <Heading level="subtitle">Agents</Heading>
          <Role is={PLATFORM_ADMIN_ROLE}>
            <IconButton icon="plus" onClick={onAddAgent} hideTextInMobile>
              Add Agent
            </IconButton>
          </Role>
        </TwoColumn>
      </Wrapper>
      <Datatable
        id="agents"
        sectionFilters={sectionFilters}
        filters={filters}
      >
        {datatable => (
          <DashboardAgentsIndexSectionContainer datatable={datatable} />
        )}
      </Datatable>

    </DashboardPageTemplate>);
};

DashboardAgentIndexPage.propTypes = {
  sectionFilters: object,
  filters: object,
  onAddAgent: func,
};

export default DashboardAgentIndexPage;
