import React from 'react';

import communityPropType from 'sly/propTypes/community';
import pad from 'sly/components/helpers/pad';
import styled from 'styled-components';
import { size } from 'sly/components/themes';
import { Block, Label } from 'sly/components/atoms';
import { formatAddress } from 'sly/services/helpers/community';

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
  };

  render() {
    const { community } = this.props;
    const { propInfo: info } = community;

    const address = formatAddress(community);
    const email = info.ownerEmail || info.websiteEmail;
    // contact email address and capacity information
    return (
      <>
        <ColumWrapper>
          <Label palette="grey">Community name</Label>
          <Block size="caption">{community.name}</Block>
        </ColumWrapper>
        <ColumWrapper>
          <Label palette="grey">Address</Label>
          <Block size="caption">{address}</Block>
        </ColumWrapper>
        <ColumWrapper>
          <Label palette="grey">License Number</Label>
          <Block size="caption">{info.licenseNumber}</Block>
        </ColumWrapper>
        <ColumWrapper>
          <Label palette="grey">Front Desk Number</Label>
          <Block size="caption">{info.communityPhone}</Block>
        </ColumWrapper>
        <ColumWrapper>
          <Label palette="grey">Email</Label>
          <Block size="caption">{email}</Block>
        </ColumWrapper>
        <ColumWrapper>
          <Label palette="grey">Capacity</Label>
          <Block size="caption">{info.communitySize}</Block>
        </ColumWrapper>
      </>
    );
  }
}
