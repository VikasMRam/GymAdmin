import React from 'react';
import styled from 'styled-components';
import { func, bool } from 'prop-types';

import { size, palette, key } from 'sly/components/themes';
import CommunityActions from 'sly/components/molecules/CommunityActions';

const FullWrapper = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: ${palette('white', 'base')};
  width: 100%;
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  z-index: ${key('zIndexes.stickySections')};
  padding: ${size('spacing.large')};
  box-shadow: 0 -${size('border.xxLarge')} ${size('spacing.regular')}
    ${palette('slate', 'stroke')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: none;
  }
`;

const CommunityStickyFooter = ({
  onBookATourClick, onGCPClick, onAQClick, isAlreadyTourScheduled, isAlreadyPricingRequested,
}) => (
  <FullWrapper>
    <CommunityActions
      onBookATourClick={onBookATourClick}
      onGCPClick={onGCPClick}
      onAQClick={onAQClick}
      isAlreadyTourScheduled={isAlreadyTourScheduled}
      isAlreadyPricingRequested={isAlreadyPricingRequested}
    />
  </FullWrapper>
);

CommunityStickyFooter.propTypes = {
  onBookATourClick: func,
  onGCPClick: func,
  onAQClick: func,
  isAlreadyTourScheduled: bool,
  isAlreadyPricingRequested: bool,
};

export default CommunityStickyFooter;
