import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { arrayOf, object, bool, func } from 'prop-types';

import { size, palette } from 'sly/common/components/themes';
import mobileOnly from 'sly/web/components/helpers/mobileOnly';
import SlyEvent from 'sly/web/services/helpers/events';
import communityPropType from 'sly/common/propTypes/community';
import { Box, Table, THead, TBody, Tr, Td, Block } from 'sly/web/components/atoms';
import TableHeaderButtons from 'sly/web/components/molecules/TableHeaderButtons';
import Pagination from 'sly/web/components/molecules/Pagination';
import Th from 'sly/web/components/molecules/Th';
import CommunityRowCard from 'sly/web/components/organisms/CommunityRowCard';
import { textAlign } from 'sly/web/components/helpers/text';
import { Loading, Section, SectionHeader } from 'sly/web/dashboard/DashboardWithSummaryTemplate';
import DashboardPageTemplate from 'sly/web/components/templates/DashboardPageTemplate';
import Role from 'sly/web/components/common/Role';
import { PLATFORM_ADMIN_ROLE, PROVIDER_OD_ROLE } from 'sly/common/constants/roles';
import IconButton from 'sly/common/components/molecules/IconButton';

const TABLE_HEADINGS = [
  { text: 'Name' },
  { text: 'Address' },
  { text: 'Status' },
];

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

const NoResultMessage = styled(textAlign(Block))`
  padding-top: ${size('spacing.xxxLarge')};
  padding-bottom: ${size('spacing.xxxLarge')};
`;

export default class DashboardListingIndexPage extends Component {
  static propTypes = {
    datatable: object,
    listings: arrayOf(communityPropType),
    pagination: object,
    isPageLoading: bool,
    onAddListing: func,
    meta: object,
  };

  handleCommunityClick = (listing) => {
    const event = {
      category: 'AdminDashboardListing',
      action: 'click',
      label: 'viewCommunity',
      value: listing.id,
    };
    SlyEvent.getInstance().sendEvent(event);
  };

  render() {
    console.log(this.props);
    const {
      listings, pagination, isPageLoading, onAddListing, meta, datatable,
    } = this.props;
    const noResultMessage = 'Click Add Community on the top right corner to add a new community';
    const modelConfig = { name: 'Community', defaultSearchField: 'name' };

    const actions = (
      <Role is={PLATFORM_ADMIN_ROLE | PROVIDER_OD_ROLE}>
        <IconButton icon="plus" onClick={onAddListing} hideTextInMobile>
          Add Listing
        </IconButton>
      </Role>
    );

    if (isPageLoading) {
      return (
        <DashboardPageTemplate activeMenuItem="Communities">
          <Section snap="none">
            <SectionHeader actions={actions}>
              Listings
            </SectionHeader>

            <TableHeaderButtons
              datatable={datatable}
              modelConfig={modelConfig}
              meta={meta}
            />

            <Block weight="medium" size="body" textAlign="center" padding="30px">
              Loading...
            </Block>
          </Section>
        </DashboardPageTemplate>
      );
    }

    return (
      <DashboardPageTemplate activeMenuItem="Communities">
        <Section snap="none">
          <SectionHeader actions={actions}>
            Listings
          </SectionHeader>

          <TableHeaderButtons
            datatable={datatable}
            modelConfig={modelConfig}
            meta={meta}
          />

          <StyledTable>
            <THead>
              <Tr>
                {TABLE_HEADINGS.map(({ text }) => <Th key={text}>{text}</Th>)}
              </Tr>
            </THead>
            <TBody>
              {listings.map(community => (
                <CommunityRowCard key={community.id} community={community} onCommunityClick={() => this.handleCommunityClick(community)} />
              ))}
              {listings.length === 0 &&
                <Tr>
                  <Td colSpan={TABLE_HEADINGS.length}>
                    <NoResultMessage>{noResultMessage}</NoResultMessage>
                  </Td>
                </Tr>
              }
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

          {listings.length > 0 &&
            <Box padding="regular" size="caption" snap="top">
              {pagination.text}
            </Box>
          }
        </Section>
      </DashboardPageTemplate>
    );
  }
}
