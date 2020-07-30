import React from 'react';
import styled from 'styled-components';
import { func } from 'prop-types';

import { size } from 'sly/common/components/themes';
import pad from 'sly/web/components/helpers/pad';
import fullWidth from 'sly/web/components/helpers/fullWidth';
import { Button, Heading, Block, Link } from 'sly/web/components/atoms';
import Modal, { HeaderWithClose } from 'sly/web/components/atoms/NewModal';
import ListItem from 'sly/web/components/molecules/ListItem';
import HowSlyWorksVideoContainer from 'sly/web/containers/HowSlyWorksVideoContainer';
import { textAlign } from 'sly/web/components/helpers/text';

const PaddedHowSlyWorksVideo = pad(HowSlyWorksVideoContainer);
PaddedHowSlyWorksVideo.displayName = 'PaddedHowSlyWorksVideo';

const StyledButton = pad(fullWidth(Button), 'large');
StyledButton.displayName = 'StyledButton';

const PaddedHeading = pad(Heading, 'large');
PaddedHeading.displayName = 'PaddedHeading';

const Points = pad(styled.div``);

const CallUs = textAlign(Block);

const Body = styled.div`
  padding: ${size('spacing.xxLarge')};
  padding-top: 0;
`;

export default function HowItWorksPopup({ onMatchClick, onClose, onPhoneClick }) {
  return (
    <Modal onClose={onClose}>
      <HeaderWithClose onClose={onClose} />
      <Body>
        <PaddedHowSlyWorksVideo eventLabel="howItWorksPopup" />
        <PaddedHeading size="subtitle">We are here to help you now</PaddedHeading>
        <Points>
          <ListItem icon="tick" iconPalette="green">100% free</ListItem>
          <ListItem icon="tick" iconPalette="green">Personalized, local expertise</ListItem>
          <ListItem icon="tick" iconPalette="green">Get pricing, availability and more</ListItem>
          <ListItem icon="tick" iconPalette="green">Have tours set up for you</ListItem>
        </Points>
        <StyledButton onClick={onMatchClick}>Get Help Now</StyledButton>
        <CallUs>or call our team at <Link href="tel:+18558664515" onClick={onPhoneClick}>(855) 866-4515</Link></CallUs>
      </Body>
    </Modal>
  );
}

HowItWorksPopup.propTypes = {
  onMatchClick: func,
  onClose: func,
  onPhoneClick: func,
};
