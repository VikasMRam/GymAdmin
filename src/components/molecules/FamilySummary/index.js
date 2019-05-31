import React from 'react';
import styled from 'styled-components';
import { string, bool } from 'prop-types';
import NumberFormat from 'react-number-format';

import pad from 'sly/components/helpers/pad';
import cursor from 'sly/components/helpers/cursor';
import { size } from 'sly/components/themes';
import clientPropType from 'sly/propTypes/client';
import { Box, Heading, Label, Block, Link } from 'sly/components/atoms';
import { clickEventHandler } from 'sly/services/helpers/eventHandlers';
import { FAMILY_STAGE_NEW } from 'sly/constants/familyDetails';

const ColumWrapper = pad(styled.div`
  @media screen and (min-width: ${size('breakpoint.mobile')}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: ${size('tabletLayout.gutter')};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    grid-column-gap: ${size('layout.gutter')};
  }
`, 'large');
ColumWrapper.displayName = 'ColumWrapper';

const OuterColumWrapper = styled.div`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: block;
  }
`;

const StyledLink = styled(Link)`
  font-size: ${size('text.caption')};
  font-weight: ${size('weight.medium')};
`;

const PaddedHeading = pad(Heading, 'large');
const SlyIntro = pad(styled.div``, 'xLarge');
SlyIntro.displayName = 'SlyIntro';
const SeeMore = cursor(Block);
SeeMore.displayName = 'SeeMore';

const FamilySummary = ({
  client, snap, to, className, noHeading,
}) => (
  <Box snap={snap} className={className}>
    {!noHeading && <PaddedHeading size="body">Summary</PaddedHeading>}
    <OuterColumWrapper>
      {client.clientInfo && client.clientInfo.name &&
        <ColumWrapper>
          <Label palette="grey">Contact name</Label>
          <Block size="caption">{client.clientInfo.name}</Block>
        </ColumWrapper>
      }
      {client.uuidAux && client.uuidAux.uuidInfo && client.uuidAux.uuidInfo.residentInfo.fullName &&
        <ColumWrapper>
          <Label palette="grey">Resident name</Label>
          <Block size="caption">{client.uuidAux.uuidInfo.residentInfo.fullName}</Block>
        </ColumWrapper>
      }
      {client.stage !== FAMILY_STAGE_NEW && client.clientInfo && client.clientInfo.phoneNumber &&
        <ColumWrapper>
          <Label palette="grey">Phone number</Label>
          <StyledLink href={`tel:+1${client.clientInfo.phoneNumber}`} onClick={clickEventHandler('fdetails-summary', 'phone')} target="_blank">
            <NumberFormat
              value={client.clientInfo.phoneNumber}
              format="###-###-####"
              displayType="text"
            />
          </StyledLink>
        </ColumWrapper>
      }
      {client.stage !== FAMILY_STAGE_NEW && client.clientInfo && client.clientInfo.email &&
        <ColumWrapper>
          <Label palette="grey">Email</Label>
          <StyledLink href={`mailto:${client.clientInfo.email}`} onClick={clickEventHandler('fdetails-summary', 'email')} target="_blank" >Click To Send Email</StyledLink>
        </ColumWrapper>
      }
      {client.uuidAux && client.uuidAux.uuidInfo && client.uuidAux.uuidInfo.housingInfo.lookingFor &&
        <ColumWrapper>
          <Label palette="grey">Looking for</Label>
          <Block size="caption">{client.uuidAux.uuidInfo.housingInfo.lookingFor}</Block>
        </ColumWrapper>
      }
      {client.uuidAux && client.uuidAux.uuidInfo && client.uuidAux.uuidInfo.residentInfo.gender &&
        <ColumWrapper>
          <Label palette="grey">Gender</Label>
          <Block size="caption">{client.uuidAux.uuidInfo.residentInfo.gender}</Block>
        </ColumWrapper>
      }
      {client.uuidAux && client.uuidAux.uuidInfo && client.uuidAux.uuidInfo.locationInfo.city &&
        <ColumWrapper>
          <Label palette="grey">Preferred location</Label>
          <Block size="caption">{client.uuidAux.uuidInfo.locationInfo.city}</Block>
        </ColumWrapper>
      }
      {client.uuidAux && client.uuidAux.uuidInfo && client.uuidAux.uuidInfo.housingInfo.moveTimeline &&
        <ColumWrapper>
          <Label palette="grey">Time to move</Label>
          <Block size="caption">{client.uuidAux.uuidInfo.housingInfo.moveTimeline}</Block>
        </ColumWrapper>
      }
    </OuterColumWrapper>
    {client.clientInfo && client.clientInfo.slyMessage &&
      <SlyIntro>
        <Label palette="grey">Seniorly introduction</Label>
        <Block size="caption">{client.clientInfo.slyMessage}</Block>
      </SlyIntro>
    }
    <StyledLink to={to} onClick={clickEventHandler('fdetails-summary', 'seeMoreFamilyDetails')} >See more family details</StyledLink>
  </Box>
);

FamilySummary.propTypes = {
  client: clientPropType,
  to: string.isRequired,
  snap: string,
  className: string,
  noHeading: bool,
};

FamilySummary.defaultProps = {
  noHeading: false,
};

export default FamilySummary;
