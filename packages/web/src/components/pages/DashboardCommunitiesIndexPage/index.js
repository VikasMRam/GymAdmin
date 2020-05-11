import React from 'react';
import { object, func } from 'prop-types';
import styled, { css } from 'styled-components';

import { size, palette } from 'sly/components/themes';
import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import DashboardCommunitiesIndexSectionContainer from 'sly/containers/DashboardCommunitiesIndexSectionContainer';
import { Datatable } from 'sly/services/datatable';
import { PLATFORM_ADMIN_ROLE, PROVIDER_OD_ROLE } from 'sly/constants/roles';
import Role from 'sly/components/common/Role';
import IconButton from 'sly/components/molecules/IconButton';
import { Heading, Hr } from 'sly/components/atoms';
import pad from 'sly/components/helpers/pad';

const Wrapper = styled.div`
  border-bottom: ${size('border', 'regular')} solid ${palette('slate', 'stroke')};
  padding: ${size('spacing.large')};
  padding-bottom: 0;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
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

const DashboardCommunitiesIndexPage = ({ sectionFilters, filters, onAddCommunity}) => {



  return (
    <DashboardPageTemplate activeMenuItem="Communities">
      <Wrapper>
        <TwoColumn>
          <Heading level="subtitle">Communities</Heading>
          <Role is={PLATFORM_ADMIN_ROLE | PROVIDER_OD_ROLE}>
            <IconButton icon="plus" onClick={onAddCommunity} hideTextInMobile>
              Add Community
            </IconButton>
          </Role>
        </TwoColumn>
      </Wrapper>
      <Datatable
        id="communities"
        sectionFilters={sectionFilters}
        filters={filters}
      >
        {datatable => (
          <DashboardCommunitiesIndexSectionContainer datatable={datatable} />
        )}
      </Datatable>

    </DashboardPageTemplate>);
};

DashboardCommunitiesIndexPage.propTypes = {
  sectionFilters: object,
  filters: object,
  onAddCommunity: func,
};

export default DashboardCommunitiesIndexPage;
