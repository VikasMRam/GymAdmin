import React from 'react';
import { object, func } from 'prop-types';
import styled, { css } from 'styled-components';

import { size, palette } from 'sly/web/components/themes';
import DashboardPageTemplate from 'sly/web/components/templates/DashboardPageTemplate';
import DashboardCommunityIndexSectionContainer from 'sly/web/containers/DashboardCommunityIndexSectionContainer';
import { Datatable } from 'sly/web/services/datatable';
import { PLATFORM_ADMIN_ROLE, PROVIDER_OD_ROLE } from 'sly/web/constants/roles';
import Role from 'sly/web/components/common/Role';
import IconButton from 'sly/web/components/molecules/IconButton';
import { Heading, Hr } from 'sly/web/components/atoms';
import pad from 'sly/web/components/helpers/pad';

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

const DashboardCommunityIndexPage = ({ sectionFilters, filters, onAddCommunity}) => {
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
          <DashboardCommunityIndexSectionContainer datatable={datatable} />
        )}
      </Datatable>

    </DashboardPageTemplate>);
};

DashboardCommunityIndexPage.propTypes = {
  sectionFilters: object,
  filters: object,
  onAddCommunity: func,
};

export default DashboardCommunityIndexPage;
