import React from 'react';
import styled from 'styled-components';
import { string, bool } from 'prop-types';

import pad from 'sly/components/helpers/pad';
import cursor from 'sly/components/helpers/cursor';
import { size } from 'sly/components/themes';
import clientPropType from 'sly/propTypes/client';
import { Box, Heading, Label, Block, Link, Hr } from 'sly/components/atoms';
import Role from 'sly/components/common/Role';
import { AGENT_ND_ROLE, PLATFORM_ADMIN_ROLE, PROVIDER_OD_ROLE } from 'sly/constants/roles';
import { clickEventHandler } from 'sly/services/helpers/eventHandlers';
import { FAMILY_STAGE_NEW } from 'sly/constants/familyDetails';
import CollapsibleBlock from 'sly/components/molecules/CollapsibleBlock';
import { phoneFormatter } from 'sly/services/helpers/phone';

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
const SlyIntro = pad(CollapsibleBlock, 'xLarge');
SlyIntro.displayName = 'SlyIntro';
const SeeMore = cursor(Block);
SeeMore.displayName = 'SeeMore';

const FamilySummary = ({
  client, isAgentUser, isOfDifferentOrg, snap, to, className, noHeading,
}) => (
  <Box snap={snap} className={className} palette={isOfDifferentOrg ? 'warning' : undefined} variation={isOfDifferentOrg ? 'dark' : undefined}>
    {!noHeading && <PaddedHeading size="body">Summary</PaddedHeading>}
    <OuterColumWrapper>
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
            {phoneFormatter(client.clientInfo.phoneNumber, true)}
          </StyledLink>
        </ColumWrapper>
      }
      {client.stage !== FAMILY_STAGE_NEW && client.clientInfo && client.clientInfo.email &&
        <ColumWrapper>
          <Label palette="grey">Email</Label>
          <StyledLink href={`mailto:${client.clientInfo.email}`} onClick={clickEventHandler('fdetails-summary', 'email')} target="_blank" >Click To Send Email</StyledLink>
        </ColumWrapper>
      }
      {client.clientInfo && client.clientInfo.referralSource &&
      <ColumWrapper>
        <Label palette="grey">Source</Label>
        <Block size="caption">{client.clientInfo.referralSource}</Block>
      </ColumWrapper>
      }
      {!isAgentUser && client.uuidAux && client.uuidAux.uuidInfo && client.uuidAux.uuidInfo.financialInfo.medicaid &&
      <ColumWrapper>
        <Label palette="danger">Medicaid</Label>
        <Block size="caption">Chose Qualifies on Wizard</Block>
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
      {client.uuidAux && client.uuidAux.uuidInfo && client.uuidAux.uuidInfo.locationInfo &&
        <ColumWrapper>
          <Label palette="grey">Preferred location</Label>
          <Block size="caption">{client.uuidAux.uuidInfo.locationInfo.city ? [client.uuidAux.uuidInfo.locationInfo.city, client.uuidAux.uuidInfo.locationInfo.state].filter(v => v).join(', ') : 'None'}</Block>
        </ColumWrapper>
      }
      {client.uuidAux && client.uuidAux.uuidInfo && client.uuidAux.uuidInfo.housingInfo.moveTimeline &&
        <ColumWrapper>
          <Label palette="grey">Time to move</Label>
          <Block size="caption">{client.uuidAux.uuidInfo.housingInfo.moveTimeline}</Block>
        </ColumWrapper>
      }
      {client.clientInfo && client.clientInfo.slyMessage &&
        <SlyIntro minHeight="tiny">
          <Label palette="grey">Seniorly introduction</Label>
          <Block size="caption">{client.clientInfo.slyMessage}</Block>
        </SlyIntro>
      }
      {/* eslint-disable-next-line no-bitwise */}
      <Role is={PLATFORM_ADMIN_ROLE|AGENT_ND_ROLE}>
        {client.clientInfo && client.clientInfo.slyAgentMessage &&
          <SlyIntro minHeight="tiny">
            <Label palette="grey">Message</Label>
            <Block size="caption">{client.clientInfo.slyAgentMessage}</Block>
          </SlyIntro>
          }
      </Role>
      {/* eslint-disable-next-line no-bitwise */}
      <Role is={PLATFORM_ADMIN_ROLE|PROVIDER_OD_ROLE}>
        {client.clientInfo && client.clientInfo.slyCommunityMessage &&
          <SlyIntro minHeight="tiny">
            <Label palette="grey">Message</Label>
            <Block size="caption">{client.clientInfo.slyCommunityMessage}</Block>
          </SlyIntro>
        }
      </Role>
    </OuterColumWrapper>
    {(client.admin || client.organization) &&
      <Hr />
    }
    {client.admin &&
    <ColumWrapper>
      <Label palette="grey">Assigned to</Label>
      <Block size="caption">{client.admin.name}</Block>
    </ColumWrapper>
    }
    {client.organization &&
    <ColumWrapper>
      <Label palette="grey">Business name</Label>
      <Block size="caption">{client.organization.name}</Block>
    </ColumWrapper>
    }
    <StyledLink to={to} onClick={clickEventHandler('fdetails-summary', 'seeMoreFamilyDetails')} >See more family details</StyledLink>
  </Box>
);

FamilySummary.propTypes = {
  client: clientPropType,
  isAgentUser: bool,
  isOfDifferentOrg: bool,
  to: string.isRequired,
  snap: string,
  className: string,
  noHeading: bool,
};

FamilySummary.defaultProps = {
  noHeading: false,
};

export default FamilySummary;
