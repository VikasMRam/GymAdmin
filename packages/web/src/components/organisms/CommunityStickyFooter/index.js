import React from 'react';
import styled from 'styled-components';
import { bool, string } from 'prop-types';

import { community as communityPropType } from 'sly/common/propTypes/community';
import { key } from 'sly/common/components/themes';
import CommunityActions from 'sly/web/components/molecules/CommunityActions';
import AskAgentQuestionButtonContainer from 'sly/web/containers/AskAgentQuestionButtonContainer';
import CommunityPricing from 'sly/web/components/molecules/CommunityPricing';
import { assetPath } from 'sly/web/components/themes';
import { Block, color, space, Image, border, sx$laptop, Button } from 'sly/common/system';

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${color('white.base')};
  border-top: ${border('s')} ${color('slate.lighter-90')};
  z-index: ${key('zIndexes.stickySections')};
  padding: ${space('m')};
  box-shadow: 0 -${space('xxs')} ${space('xs')} ${color('slate.lighter-90')};
  ${sx$laptop({
    display: 'none',
  })}
`;
const InnerWrapper = styled.div`
  display: block;
  margin: auto;
`;
const StyledAskAgentButton = styled(AskAgentQuestionButtonContainer)`
  width: 100%;
  margin-top: ${space('xxs')};
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: ${space('xxs')};
`;

const StyledResponsiveImage = styled(Image)`
  vertical-align: middle;
  margin-left: ${space('xs')};
  margin-right: ${space('xs')};
`;

const CommunityStickyFooter = ({ community, isAlreadyPricingRequested, locTrack, isActiveAdult, isZillowAd, ...props }) => {
  const { id, startingRate, rates, propInfo } = community;
  const { maxRate } = propInfo;
  if (isActiveAdult) {
    return (
      <Wrapper>
        <InnerWrapper>
          <strong>Is selling your home part of your senior living plan?</strong>
          <div>We can connect you with the top selling agents.</div>
          <StyledAskAgentButton ackCTA  community={community} type="aa-footer" ctaText="Request Info" />
        </InnerWrapper>
      </Wrapper>);
  } else if (isZillowAd) {
    return (
      <Wrapper>
        <InnerWrapper>
          <div><strong>Selling a home to pay the cost of senior living?</strong></div>
          Our partner <StyledResponsiveImage src={assetPath('vectors/zillow.svg')} /> will make an instant offer.
          <StyledButton {...props} communityId={community.id} >Learn More</StyledButton>
        </InnerWrapper>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      {startingRate > 0 && <CommunityPricing isFooter font="title-xs-azo" id={id} tipId="stickyFooter" estimated={rates !== 'Provided'} max={maxRate} price={startingRate} tooltipPos="top" />}
      <Block my="auto" ml="auto"><CommunityActions isAlreadyPricingRequested={isAlreadyPricingRequested} locTrack={locTrack} {...props} /></Block>
    </Wrapper>
  );
};

CommunityStickyFooter.typeHydrationId = 'CommunityStickyFooter';
CommunityStickyFooter.propTypes = {
  community: communityPropType,
  isAlreadyPricingRequested: bool,
  locTrack: string,
  isActiveAdult: bool,
  isZillowAd: bool,
};

export default CommunityStickyFooter;
