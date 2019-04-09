import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';

import pad from 'sly/components/helpers/pad';
import cursor from 'sly/components/helpers/cursor';
import { size } from 'sly/components/themes';
import clientPropType from 'sly/propTypes/client';
import { Box, Heading, Label, Block, Link } from 'sly/components/atoms';

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
const SeeMore = cursor(Block);
SeeMore.displayName = 'SeeMore';

const FamilySummary = ({ user, href }) => (
  <Box>
    <PaddedHeading size="body">Summary</PaddedHeading>
    <OuterColumWrapper>
      {user.name &&
        <ColumWrapper>
          <Label palette="grey">Contact name</Label>
          <Block size="caption">{user.name}</Block>
        </ColumWrapper>
      }
      {user.uuidAux && user.uuidAux.uuidInfo.residentInfo.fullName &&
        <ColumWrapper>
          <Label palette="grey">Resident name</Label>
          <Block size="caption">{user.uuidAux.uuidInfo.residentInfo.fullName}</Block>
        </ColumWrapper>
      }
      {user.uuidAux && user.uuidAux.uuidInfo.housingInfo.lookingFor &&
        <ColumWrapper>
          <Label palette="grey">Looking for</Label>
          <Block size="caption">{user.uuidAux.uuidInfo.housingInfo.lookingFor}</Block>
        </ColumWrapper>
      }
      {user.uuidAux && user.uuidAux.uuidInfo.residentInfo.gender &&
        <ColumWrapper>
          <Label palette="grey">Gender</Label>
          <Block size="caption">{user.uuidAux.uuidInfo.residentInfo.gender}</Block>
        </ColumWrapper>
      }
      {user.uuidAux && user.uuidAux.uuidInfo.locationInfo.city &&
        <ColumWrapper>
          <Label palette="grey">Preferred location</Label>
          <Block size="caption">{user.uuidAux.uuidInfo.locationInfo.city}</Block>
        </ColumWrapper>
      }
      {user.uuidAux && user.uuidAux.uuidInfo.housingInfo.moveTimeline &&
        <ColumWrapper>
          <Label palette="grey">Time to move</Label>
          <Block size="caption">{user.uuidAux.uuidInfo.housingInfo.moveTimeline}</Block>
        </ColumWrapper>
      }
    </OuterColumWrapper>
    <SlyIntro>
      <Label palette="grey">Seniorly introduction</Label>
      <Block size="caption">intro info here</Block>
    </SlyIntro>
    <StyledLink href={href}>See more family details</StyledLink>
  </Box>
);

FamilySummary.propTypes = {
  user: clientPropType,
  href: string.isRequired,
};

export default FamilySummary;
