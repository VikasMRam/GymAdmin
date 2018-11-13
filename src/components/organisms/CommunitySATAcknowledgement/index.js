import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';
import Heading from 'sly/components/atoms/Heading/index';
import { Block } from 'sly/components/atoms/index';
import CommunitySATAppointmentTile from 'sly/components/molecules/CommunitySATAppointmentTile/index';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.col6')};
    padding: ${size('spacing.xxLarge')};
    border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
    border-radius: ${size('spacing.small')};
    box-shadow:
      0
      ${size('spacing.regular')}
      ${size('spacing.large')}
      ${palette('slate', 'filler')}80;
  }
`;

const StyledHeading = styled(Heading)`
  text-align: center;
  margin-bottom: ${size('spacing.large')};
`;

const StyledBlock = styled(Block)`
  text-align: center;
  margin-bottom: ${size('spacing.xLarge')};
`;

const CommunitySATAppointmentTileWrapper = styled.div`
  margin: 0 auto;
  margin-bottom: ${size('spacing.xLarge')};
`;

const CommunitySATAcknowledgement = ({
  communityName, communityImageUrl, appointmentText,
}) => (
  <Wrapper>
    <StyledHeading>Tour Request Sent!</StyledHeading>
    <StyledBlock>Your advisor will check if this community is available at this time. They will get back to you shortly by phone or email.</StyledBlock>
    <CommunitySATAppointmentTileWrapper>
      <CommunitySATAppointmentTile communityName={communityName} communityImageUrl={communityImageUrl} appointmentText={appointmentText} />
    </CommunitySATAppointmentTileWrapper>
  </Wrapper>
);

CommunitySATAcknowledgement.propTypes = {
  communityName: string.isRequired,
  communityImageUrl: string.isRequired,
  appointmentText: string.isRequired,
};

export default CommunitySATAcknowledgement;
