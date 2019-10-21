import React from 'react';
import styled from 'styled-components';
import { string, bool, func } from 'prop-types';

import { size, palette } from 'sly/components/themes';
import { Heading, Badge, Block, Span, Box } from 'sly/components/atoms';
import cursor from 'sly/components/helpers/cursor';
import IconBadge from 'sly/components/molecules/IconBadge';
import Stage from 'sly/components/molecules/Stage';
import { adminAgentPropType } from 'sly/propTypes/agent';
import pad from 'sly/components/helpers/pad';
import { getReferralSentTimeText } from 'sly/services/helpers/communityReferral';

const TopWrapper = styled.div`
  padding: ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: flex;
    padding: ${size('spacing.xLarge')};
  }
`;

const BottomWrapper = styled.div`
  border-top: ${size('border.regular')} solid ${palette('grey', 'stroke')};
  padding: calc(${size('spacing', 'regular')} + ${size('spacing', 'small')}) ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: calc(${size('spacing', 'regular')} + ${size('spacing', 'small')}) ${size('spacing.xLarge')};
  }
`;

const SmallScreenSection = styled.div`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: none;
  }
`;

const BigScreenSection = styled.div`
  display: none;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: block;
  }
`;

const MobileSlyscoreSection = pad(styled.div`
  display: flex;
`, 'regular');

const SlyScoreBadge = styled(Badge)`
  margin-right: ${size('spacing.regular')};
`;

const DetailsTable = styled.div`
  display: grid;
  grid-template-columns: max-content auto;
  grid-column-gap: ${size('spacing.large')};
  grid-row-gap: ${size('spacing.regular')};
`;

const BigScreenSlyScorebadge = styled.div`
  display: none;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: block;
    height: fit-content;
    padding: ${size('spacing.small')} calc(${size('spacing', 'regular')} + ${size('spacing', 'small')}) ;
    background-color: ${palette('grey', 'stroke')};
    border: ${size('border.regular')} solid ${palette('grey', 'filler')};
    border-radius: ${size('border.xxLarge')};
    margin-right: ${size('spacing.large')};
  }
`;

const BottomActionBlock = cursor(styled(Block)`
  text-align: center;
`);
BottomActionBlock.displayName = 'BottomActionBlock';

const ReferralSentAtWrapper = styled.div`
  display: none;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: block;
    margin-left: auto;
  }
`;

function transformAgent(agent) {
  let workPhone = null;
  let cellPhone = null;
  let slyScoreValue = null;
  let name = null;
  let leadCount = null;
  const { name: businessName, info, contacts } = agent;
  if (info) {
    const { slyScore, displayName, last5DayLeadCount } = info;
    if (slyScore) {
      slyScoreValue = slyScore;
    }
    if (displayName) {
      name = displayName;
    }
    if (last5DayLeadCount !== undefined && last5DayLeadCount !== null) {
      leadCount = last5DayLeadCount;
    }
  }
  if (contacts && contacts.length > 0) {
    const [contact] = contacts;
    ({ workPhone } = contact);
    cellPhone = contact.mobilePhone;
  }
  const agentProps = {
    name,
    slyScore: slyScoreValue,
    businessName,
    workPhone,
    cellPhone,
    leadCount,
  };
  return agentProps;
}

const DashboardAdminReferralAgentTile = ({
  className, onClick, agent, isRecommended, bottomActionText, bottomActionOnClick, stage, referralSentAt,
}) => {
  const {
    name, slyScore, businessName, workPhone, cellPhone, leadCount,
  } = transformAgent(agent);
  const slyScoreText = `${slyScore} SLYSCORE`;
  return (
    <Box className={className} onClick={onClick} noPadding>
      <TopWrapper>
        <BigScreenSlyScorebadge><Block weight="bold">{slyScore}</Block><Block weight="bold" palette="grey" size="tiny">SLY</Block></BigScreenSlyScorebadge>
        <SmallScreenSection>
          <Heading size="body">{name}</Heading>
          <MobileSlyscoreSection>
            <SlyScoreBadge palette="grey" variation="stroke" borderRadius="small" >{slyScoreText}</SlyScoreBadge>
            {isRecommended && <IconBadge badgePalette="green" palette="white" icon="checkmark-circle" text="RECOMMENDED" />}
          </MobileSlyscoreSection>
        </SmallScreenSection>
        <DetailsTable>
          <BigScreenSection>
            <Heading size="body">{name}</Heading>
          </BigScreenSection>
          <BigScreenSection>
            {isRecommended && <IconBadge badgePalette="green" palette="white" icon="checkmark-circle" text="RECOMMENDED" />}
          </BigScreenSection>
          {businessName && (
            <>
              <Span size="caption" palette="grey" variation="dark" >Business name</Span>
              <Span size="caption">{businessName}</Span>
            </>
          )}
          {workPhone && (
            <>
              <Span size="caption" palette="grey" variation="dark">Work phone</Span>
              <Span size="caption">{workPhone}</Span>
            </>
          )}
          {cellPhone && (
            <>
              <Span size="caption" palette="grey" variation="dark">Cell phone</Span>
              <Span size="caption">{cellPhone}</Span>
            </>
          )}
          {(leadCount !== undefined && leadCount !== null) && (
            <>
              <Span size="caption" palette="grey" variation="dark">Lead count</Span>
              <Span size="caption">{leadCount}</Span>
            </>
          )}
        </DetailsTable>
        {referralSentAt && <ReferralSentAtWrapper><Span palette="grey" variation="dark" size="tiny">Sent on {getReferralSentTimeText(referralSentAt)}</Span></ReferralSentAtWrapper>}
      </TopWrapper>
      {bottomActionText && bottomActionOnClick && (
        <BottomWrapper>
          <BottomActionBlock onClick={bottomActionOnClick} palette="primary">{bottomActionText}</BottomActionBlock>
        </BottomWrapper>
      )}
      {stage && (
        <BottomWrapper>
          <Stage stage={stage} />
        </BottomWrapper>
      )}
    </Box>
  );
};

DashboardAdminReferralAgentTile.propTypes = {
  className: string,
  onClick: func,
  agent: adminAgentPropType.isRequired,
  isRecommended: bool,
  bottomActionText: string,
  bottomActionOnClick: func,
  stage: string,
  referralSentAt: string,
};

export default DashboardAdminReferralAgentTile;
