import React from 'react';
import styled from 'styled-components';
import { bool, string } from 'prop-types';

import { community as communityPropType } from 'sly/common/propTypes/community';
import { size, palette, key } from 'sly/common/components/themes';
import CommunityActions from 'sly/web/components/molecules/CommunityActions';
import AskAgentQuestionButtonContainer from 'sly/web/containers/AskAgentQuestionButtonContainer';
import CommunityPricing from 'sly/web/components/molecules/CommunityPricing';

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
const InnerWrapper = styled.div`
  display: block;
`;
const StyledAskAgentButton = styled(AskAgentQuestionButtonContainer)`
  width: 100%;
  margin-top: ${size('spacing.small')};
`;

const CommunityStickyFooter = ({ community, isAlreadyPricingRequested, locTrack, isActiveAdult, ...props }) => {
  const { id, startingRate, rates } = community;
  if (isActiveAdult) {
    return (<Wrapper>
      <InnerWrapper>
      <strong>Is selling your home part of your senior living plan?</strong>
        <div>We can connect you with the top selling agents.</div>
      <StyledAskAgentButton type="aa-footer">Request Info</StyledAskAgentButton>
      </InnerWrapper>
    </Wrapper>)
  } else {
    return (
      <Wrapper>
        {startingRate > 0 && <CommunityPricing size="subtitle" id={id} estimated={rates !== 'Provided'} price={startingRate} tooltipPos="top" />}
        <CommunityActions isAlreadyPricingRequested={isAlreadyPricingRequested} locTrack={locTrack} {...props} />
      </Wrapper>
    );
  }

};

CommunityStickyFooter.typeHydrationId = 'CommunityStickyFooter';
CommunityStickyFooter.propTypes = {
  community: communityPropType,
  isAlreadyPricingRequested: bool,
  locTrack: string,
  isActiveAdult: bool,
};

export default CommunityStickyFooter;
