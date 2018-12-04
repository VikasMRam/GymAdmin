import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';

import { size, palette } from 'sly/components/themes';
import { Image, Heading, Block } from 'sly/components/atoms/index';

const Wrapper = styled.div`
  width: ${size('mobileLayout.col4')};
  position: relative;
`;

const StyledImage = styled(Image)`
  opacity: 0.9;
  background-color: ${palette('slate', 'base')};

  > img {
    border-radius: ${size('spacing.small')};
  }
`;

const TextOverlay = styled.div`
  position: absolute;
  bottom: ${size('spacing.large')};
  left: ${size('spacing.large')};
`;

const CommunityName = styled(Heading)`
  color: ${palette('white', 0)};
`;

const AppointmentText = styled(Block)`
  color: ${palette('white', 0)};
`;

const CommunitySATAppointmentTile = ({ communityName, communityImageUrl, appointmentText }) => {
  return (
    <Wrapper>
      <StyledImage aspectRatio="3:2" src={communityImageUrl} />
      <TextOverlay>
        <CommunityName size="subtitle">{communityName}</CommunityName>
        <AppointmentText>{appointmentText}</AppointmentText>
      </TextOverlay>
    </Wrapper>
  );
};

CommunitySATAppointmentTile.propTypes = {
  communityName: string.isRequired,
  communityImageUrl: string.isRequired,
  appointmentText: string.isRequired,
};

export default CommunitySATAppointmentTile;
