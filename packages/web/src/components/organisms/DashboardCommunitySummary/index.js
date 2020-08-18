import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';
import { generatePath } from 'react-router';

import communityPropType from 'sly/common/propTypes/community';
import pad from 'sly/web/components/helpers/pad';
import { size } from 'sly/common/components/themes';
import { Block, Label, Link } from 'sly/common/components/atoms';
import { formatAddress } from 'sly/web/services/helpers/community';
import { SummarySection } from 'sly/web/components/templates/DashboardWithSummaryTemplate';
import { DASHBOARD_COMMUNITIES_DETAIL_PATH, PROFILE } from 'sly/web/constants/dashboardAppPaths';

const ColumWrapper = pad(styled.div`
  @media screen and (min-width: ${size('breakpoint.mobile')}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: ${size('tabletLayout.gutter')};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: block;
    grid-column-gap: ${size('layout.gutter')};
  }
`, 'large');

export default class DashboardCommunitySummary extends React.Component {
  static propTypes = {
    community: communityPropType,
    className: string,
  };

  render() {
    const { community, className } = this.props;
    const { id, propInfo: info } = community;

    const pathFor = (tab, field) => `${generatePath(DASHBOARD_COMMUNITIES_DETAIL_PATH, { id, tab })}#${field}`;
    const linkTo = (name, tab, field) => <Link to={pathFor(tab, field)}>Set {name}...</Link>;

    const address = formatAddress(community.address) || linkTo();
    const email = info.ownerEmail || info.websiteEmail;
    // contact email address and capacity information
    return (
      <SummarySection heading="Summary" className={className}>
        <ColumWrapper>
          <Label palette="grey">Address</Label>
          <Block size="caption">
            {address || linkTo(
              'address',
              PROFILE,
              'address.line1',
            )}
          </Block>
        </ColumWrapper>
        <ColumWrapper>
          <Label palette="grey">License number</Label>
          <Block size="caption">
            { info.licenseNumber || linkTo(
              'license number',
              PROFILE,
              'propInfo.licenseNumber',
            )}
          </Block>
        </ColumWrapper>
        <ColumWrapper>
          <Label palette="grey">Front desk phone</Label>
          <Block size="caption">
            { info.communityPhone || linkTo(
              'phone',
              PROFILE,
              'propInfo.communityPhone',
            )}
          </Block>
        </ColumWrapper>
        <ColumWrapper>
          <Label palette="grey">Email</Label>
          <Block size="caption">
            { email || linkTo(
              'email',
              PROFILE,
              'propInfo.ownerEmail',
            )}
          </Block>
        </ColumWrapper>
        <ColumWrapper>
          <Label palette="grey">Capacity</Label>
          <Block size="caption">
            { info.communitySize || linkTo(
              'community size',
              PROFILE,
              'propInfo.communitySize',
            )}
          </Block>
        </ColumWrapper>
      </SummarySection>
    );
  }
}
