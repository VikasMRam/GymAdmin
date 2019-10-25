import React from 'react';
import styled from 'styled-components';
import { object, bool } from 'prop-types';

import { size, palette, key } from 'sly/components/themes';
import CommunityActions from 'sly/components/molecules/CommunityActions';

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

const CommunityStickyFooter = ({
  community, isAlreadyPricingRequested,
}) => (
  <Wrapper>
    <CommunityActions
      community={community}
      isAlreadyPricingRequested={isAlreadyPricingRequested}
    />
  </Wrapper>
);

CommunityStickyFooter.propTypes = {
  community: object.isRequired,
  isAlreadyPricingRequested: bool,
};

export default CommunityStickyFooter;
