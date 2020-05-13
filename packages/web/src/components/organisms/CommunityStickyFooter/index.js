import React from 'react';
import styled from 'styled-components';
import { bool, string } from 'prop-types';

import { size, palette, key } from 'sly/web/components/themes';
import CommunityActions from 'sly/web/components/molecules/CommunityActions';

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${palette('white', 'base')};
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  z-index: ${key('zIndexes.stickySections')};
  padding: ${size('spacing.large')};
  box-shadow: 0 -${size('border.xxLarge')} ${size('spacing.regular')}
    ${palette('slate', 'stroke')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: none;
  }
`;

const CommunityStickyFooter = ({ isAlreadyPricingRequested, locTrack }) => (
  <Wrapper>
    <CommunityActions isAlreadyPricingRequested={isAlreadyPricingRequested} locTrack={locTrack}/>
  </Wrapper>
);
CommunityStickyFooter.typeHydrationId = 'CommunityStickyFooter';
CommunityStickyFooter.propTypes = {
  isAlreadyPricingRequested: bool,
  locTrack: string,
};

export default CommunityStickyFooter;
