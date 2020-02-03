import React from 'react';

import communityPropType from 'sly/propTypes/community';
import pad from 'sly/components/helpers/pad';
import styled from 'styled-components';
import { size } from 'sly/components/themes';
import { Block, Label } from 'sly/components/atoms';
import Box from 'sly/components/atoms/Box';

const ColumWrapper = pad(styled.div`
  @media screen and (min-width: ${size('breakpoint.mobile')}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: ${size('tabletLayout.gutter')};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    grid-column-gap: ${size('layout.gutter')};
  }
`, 'large');

export default class DashboardCommunitySummary extends React.Component {
  static propTypes = {
    community: communityPropType,
  };

  render() {
    const { community } = this.props;
    return (
      <Box>
        <ColumWrapper>
          <Label palette="grey">Community name</Label>
          <Block size="caption">{community.name}</Block>
        </ColumWrapper>
      </Box>
    );
  }
}
