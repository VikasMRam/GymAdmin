import React from 'react';
import styled from 'styled-components';
import { func } from 'prop-types';

import { size } from 'sly/components/themes';
import pad from 'sly/components/helpers/pad';
import fullWidth from 'sly/components/helpers/fullWidth';
import { Button, Heading } from 'sly/components/atoms';
import Modal, { HeaderWithClose } from 'sly/components/atoms/NewModal';
import ListItem from 'sly/components/molecules/ListItem';
import HowSlyWorksVideoContainer from 'sly/containers/HowSlyWorksVideoContainer';

const PaddedHowSlyWorksVideo = pad(HowSlyWorksVideoContainer);

const StyledButton = fullWidth(Button);

const PaddedHeading = pad(Heading, 'large');

const Points = pad(styled.div``);

const Body = styled.div`
  padding: ${size('spacing.xxLarge')};
  padding-top: 0;
`;

export default function HowItWorksPopup({ onMatchClick, onClose }) {
  return (
    <Modal onClose={onClose}>
      <HeaderWithClose onClose={onClose} />
      <Body>
        <PaddedHowSlyWorksVideo eventLabel="howItWorksPopup" />
        <PaddedHeading size="subtitle">Get help from one of our local experts now</PaddedHeading>
        <Points>
          <ListItem icon="tick" iconPalette="green">100% free</ListItem>
          <ListItem icon="tick" iconPalette="green">Get pricing, availability and more</ListItem>
          <ListItem icon="tick" iconPalette="green">Have tours scheduled for your</ListItem>
        </Points>
        <StyledButton onClick={onMatchClick}>Match me with my expert</StyledButton>
      </Body>
    </Modal>
  );
}

HowItWorksPopup.propTypes = {
  onMatchClick: func,
  onClose: func,
};
