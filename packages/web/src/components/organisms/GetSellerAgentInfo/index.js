import React from 'react';
import { string, func, bool, } from 'prop-types';
import styled from 'styled-components';

import { community as communityPropType } from 'sly/common/propTypes/community';
import { ResponsiveImage } from 'sly/web/components/atoms';
import pad from 'sly/web/components/helpers/pad';
import { size, palette } from 'sly/common/components/themes';
import fullWidth from 'sly/web/components/helpers/fullWidth';
import { Button, Heading, Box } from 'sly/web/components/atoms';
import AskAgentQuestionButtonContainer from 'sly/web/containers/AskAgentQuestionButtonContainer';

const StyledRequestInfo = fullWidth(AskAgentQuestionButtonContainer);
const StyledButton = fullWidth(Button);

const PaddedHeading = pad(Heading, 'large');

const StyledResponsiveImage = styled(ResponsiveImage)`
  vertical-align: middle;
  margin-left: ${size('spacing.regular')};
  margin-right: ${size('spacing.regular')};
`;

const onClickEvent = id => ({ action: 'click-seller-agent', category: 'SidebarCTA', label: id });

const ZillowComp = ( { buttonTo, onClick, communityId }) => (
  <>
    <div>
      Our partner <StyledResponsiveImage src={assetPath('vectors/zillow.svg')} /> will make an instant offer.
    </div>
    <StyledButton to={buttonTo} onClick={onClick} event={onClickEvent(communityId)}> Learn More</StyledButton>;
  </>
);

const GetSellerAgentInfo = ({ title, subtitle, isZillowAd, community: { id }, buttonTo, onClick }) => (
  <Box>
    <PaddedHeading level="title" size="subtitle">{title}</PaddedHeading>
    {isZillowAd && <ZillowComp communityId={id} to={buttonTo} onClick={onClick}/> }
    {!isZillowAd && <div>{subtitle}</div> }
    {!isZillowAd && <StyledRequestInfo to={buttonTo} onClick={onClick} event={onClickEvent(id)} ackCTA={true}>
      Request Info
    </StyledRequestInfo>
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
