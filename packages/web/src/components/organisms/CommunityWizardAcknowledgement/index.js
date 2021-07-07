import React from 'react';
import { string, bool, func, array, object } from 'prop-types';
import styled, { css } from 'styled-components';

import { size } from 'sly/common/components/themes';
import pad from 'sly/web/components/helpers/pad';
import fullWidth from 'sly/web/components/helpers/fullWidth';
import mobileOnly from 'sly/web/components/helpers/mobileOnly';
import { Block, Button, Heading, Hr } from 'sly/common/components/atoms';
import IconItem from 'sly/web/components/molecules/IconItem';
import HowSlyWorksVideo from 'sly/web/components/organisms/HowSlyWorksVideo';
import SimilarCommunities from 'sly/web/components/organisms/SimilarCommunities';
import { textAlign } from 'sly/web/components/helpers/text';

const TopWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const Wrapper = pad(styled.article`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    align-self: center;
    max-width: ${size('layout.col6')};
  }
`);

const StyledHeading = pad(textAlign(Heading));

const StyledBlock = textAlign(pad(Block));

const StyledButton = fullWidth(styled(Button)`
  margin-left: auto;
  margin-right: auto;
`);
StyledButton.displayName = 'StyledButton';

const IconsWrapper = pad(mobileOnly(styled.div`
  display: grid;
  grid-gap: ${size('spacing.regular')};
`, null, css`
  // todo uncomment this after modal size clarification
  // grid-template-columns: 1fr 1fr 1fr;
  grid-gap: ${size('spacing.large')};
  margin-bottom: ${size('spacing.xxLarge')};
`));

const PaddedHowSlyWorksVideo = pad(HowSlyWorksVideo);

const CommunityWizardAcknowledgement = ({
  className,
  heading,
  subheading,
  buttonTo,
  buttonText,
  isVideoPlaying,
  onVideoPause,
  onVideoPlay,
  onVideoThumbnailClick,
  similarCommunities,
}) => (
  <TopWrapper className={className}>
    <Wrapper>
      {heading && <StyledHeading>{heading}</StyledHeading>}
      {subheading && <StyledBlock size="subtitle" palette="grey">{subheading}</StyledBlock>}
      <StyledButton href={buttonTo}>{buttonText}</StyledButton>
    </Wrapper>
    <Hr pad="xxxLarge" />
    <StyledHeading>Seniorly is designed for you.</StyledHeading>
    <StyledBlock size="subtitle" palette="grey">Get the tools and support you need to find the right community.</StyledBlock>
    <IconsWrapper>
      <IconItem borderless={false} icon="account">A personal expert</IconItem>
      <IconItem borderless={false} icon="search">Find communities</IconItem>
      <IconItem borderless={false} icon="book">Online resources</IconItem>
    </IconsWrapper>
    <PaddedHowSlyWorksVideo isPlaying={isVideoPlaying} onPause={onVideoPause} onPlay={onVideoPlay} onThumbnailClick={onVideoThumbnailClick} />
    <Hr pad="xxxLarge" />
    <StyledHeading>You might like these communities.</StyledHeading>
    <SimilarCommunities communityStyle={{ imageSize: 'little', layout: 'row', showDescription: false }} communities={similarCommunities?.similar} />
  </TopWrapper>
);

CommunityWizardAcknowledgement.propTypes = {
  similarCommunities: object,
  buttonTo: string.isRequired,
  buttonText: string,
  heading: string,
  subheading: string,
  className: string,
  isVideoPlaying: bool,
  onVideoPause: func,
  onVideoPlay: func,
  onVideoThumbnailClick: func,
};

CommunityWizardAcknowledgement.defaultProps = {
  buttonText: 'Take me to my dashboard',
};

export default CommunityWizardAcknowledgement;
