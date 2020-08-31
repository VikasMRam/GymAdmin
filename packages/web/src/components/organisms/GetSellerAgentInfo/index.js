import React from 'react';
import { string, func, bool } from 'prop-types';
import styled from 'styled-components';

import { community as communityPropType } from 'sly/common/propTypes/community';
import { assetPath } from 'sly/web/components/themes';
import { ResponsiveImage, Button, Heading, Box } from 'sly/web/components/atoms';
import pad from 'sly/web/components/helpers/pad';
import { size } from 'sly/common/components/themes';
import fullWidth from 'sly/web/components/helpers/fullWidth';
import AskAgentQuestionButtonContainer from 'sly/web/containers/AskAgentQuestionButtonContainer';

const StyledRequestInfo = fullWidth(AskAgentQuestionButtonContainer);
const StyledButton = fullWidth(Button);

const PaddedHeading = pad(Heading, 'large');

const StyledResponsiveImage = styled(ResponsiveImage)`
  vertical-align: middle;
  margin-left: ${size('spacing.regular')};
  margin-right: ${size('spacing.regular')};
`;

const MarginedDiv = styled.div`
  margin-bottom: ${size('spacing.xLarge')};
`;

const onClickEvent = id => ({ action: 'click-seller-agent', category: 'SidebarCTA', label: id });

export const ZillowComp = ({ buttonTo, onClick,  communityId }) => (
  <>
    <MarginedDiv>
      Our partner <StyledResponsiveImage src={assetPath('vectors/zillow.svg')} /> will make an instant offer.
    </MarginedDiv>
    <StyledButton target="_blank" to={buttonTo} onClick={onClick} event={onClickEvent(communityId)}> Learn More</StyledButton>
  </>
);

const GetSellerAgentInfo = ({ title, subtitle, isZillowAd, community, buttonTo, onClick }) => (
  <Box>
    <PaddedHeading level="title" size="subtitle">{title}</PaddedHeading>
    {isZillowAd && <ZillowComp communityId={community.id} buttonTo={buttonTo} onClick={onClick} /> }
    {!isZillowAd && <MarginedDiv>{subtitle}</MarginedDiv> }
    {!isZillowAd && <StyledRequestInfo type="aa-sidebar" onClick={onClick} ctaText="Request Info" event={onClickEvent(community.id)} ackCTA community={community} />
    }

  </Box>
);

GetSellerAgentInfo.propTypes = {
  community: communityPropType,
  buttonTo: string,
  onClick: func,
  title: string,
  subtitle: string,
  isZillowAd: bool,
};

export default GetSellerAgentInfo;
