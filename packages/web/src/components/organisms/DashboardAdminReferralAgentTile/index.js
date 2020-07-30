import React from 'react';
import styled from 'styled-components';
import { string, bool, func } from 'prop-types';

import { AGENT_STATUS_NAME_MAP } from 'sly/web/constants/agents';
import { size, palette } from 'sly/common/components/themes';
import cursor from 'sly/web/components/helpers/cursor';
import { adminAgentPropType } from 'sly/common/propTypes/agent';
import pad from 'sly/web/components/helpers/pad';
import { getReferralSentTimeText } from 'sly/web/services/helpers/communityReferral';
import { copyToClipboard } from 'sly/web/services/helpers/utils';
import { Heading, Badge, Block, Span, Box, Button, Link } from 'sly/web/components/atoms';
import IconBadge from 'sly/web/components/molecules/IconBadge';
import Stage from 'sly/web/components/molecules/Stage';

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
    border-radius: ${size('spacing.small')};
    margin-right: ${size('spacing.large')};
  }
`;
const FloatingSection = styled.div`
  padding: ${size('spacing.large')};
  padding-top: 0;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-left: auto;
    padding: ${size('spacing.xLarge')};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    padding-top: ${size('spacing.large')};
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
  let isOnVacation = false;
  let an = null;
  const { name: businessName, info = {}, status } = agent;

  const { email, slyScore, displayName, last24hrLeadCount, adminNotes, vacationStart, vacationEnd } = info;
  if (slyScore) {
    slyScoreValue = slyScore;
  }
  if (displayName) {
    name = displayName;
  }

  if (last24hrLeadCount !== undefined && last24hrLeadCount !== null) {
    leadCount = last24hrLeadCount;
  }
  if (adminNotes) {
    an = adminNotes;
  }
  ({ cellPhone, workPhone } = info);

  if (name === null) {
    name = agent.name || 'Agent Lead';
  }
  try {
    const n = new Date();
    const eDate = Date.parse(vacationEnd);
    const sDate = Date.parse(vacationStart);
    isOnVacation = (sDate < n) && (eDate > n);
  } catch (e) {
    isOnVacation = false;
  }

  return {
    name,
    slyScore: slyScoreValue,
    businessName,
    workPhone,
    cellPhone,
    leadCount,
    adminNotes: an,
    status,
    email,
    isOnVacation,
  };
}

const getHeading = (path, name) => {
  if (path) {
    return (
      <Link size="caption" to={path} target="_blank">
        <Heading palette="primary" size="body">{name}</Heading>
      </Link>
    );
  }
  return (
    <Heading size="body">{name}</Heading>
  );
};
/* eslint-disable jsx-a11y/anchor-is-valid */
const DashboardAdminReferralAgentTile = ({
  className, onClick, agent, isRecommended, bottomActionText, bottomActionOnClick, stage, referralSentAt, actionText, actionClick, path,
}) => {
  const {
    name, slyScore, businessName, workPhone, cellPhone, leadCount, adminNotes, status, email, isOnVacation,
  } = transformAgent(agent);
  const slyScoreText = `${slyScore} SLYSCORE`;
  return (
    <Box className={className} onClick={onClick} noPadding>
      <TopWrapper>
        <BigScreenSlyScorebadge><Block weight="bold">{slyScore}</Block><Block weight="bold" palette="grey" size="tiny">SLY</Block></BigScreenSlyScorebadge>
        <SmallScreenSection>
          {getHeading(path, name)}
          <MobileSlyscoreSection>
            <SlyScoreBadge palette="grey" variation="stroke" borderRadius="small" >{slyScoreText}</SlyScoreBadge>
            {isRecommended && <IconBadge badgePalette="green" palette="white" icon="checkmark-circle" text="RECOMMENDED" />}
            {isOnVacation && <IconBadge badgePalette="magenta" palette="white" icon="pause" text="ON VACATION" />}
          </MobileSlyscoreSection>
        </SmallScreenSection>
        <DetailsTable>
          <BigScreenSection>
            {getHeading(path, name)}
          </BigScreenSection>
          <BigScreenSection>
            {isRecommended && <IconBadge badgePalette="green" palette="white" icon="checkmark-circle" text="RECOMMENDED" />}
            {isOnVacation && <IconBadge badgePalette="magenta" palette="white" icon="pause" text="ON VACATION" />}
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
              <Link palette="primary" size="caption" transparent onClick={() => { copyToClipboard(workPhone); }} >{workPhone}</Link>
            </>
          )}
          {cellPhone && (
            <>
              <Span size="caption" palette="grey" variation="dark">Cell phone</Span>
              <Link palette="primary" size="caption" transparent onClick={() => { copyToClipboard(cellPhone); }} >{cellPhone}</Link>
            </>
          )}
          {email && (
            <>
              <Span size="caption" palette="grey" variation="dark">Email</Span>
              <Link palette="primary" size="caption" transparent href={`mailto:${email}`}>{email}</Link>
            </>
          )}
          {(status === 0 || status) && (
            <>
              <Span size="caption" palette="grey" variation="dark">Status</Span>
              <Span size="caption">{AGENT_STATUS_NAME_MAP[status]}</Span>
            </>
          )}
          {(leadCount !== undefined && leadCount !== null) && (
            <>
              <Span size="caption" palette="grey" variation="dark">Lead count</Span>
              <Span size="caption">{leadCount}</Span>
            </>
          )}
          {adminNotes && (
            <>
              <Span size="caption" palette="grey" variation="dark">Admin Notes</Span>
              <Span size="caption">{adminNotes}</Span>
            </>
          )}
        </DetailsTable>
        {actionText && actionClick && (
          <FloatingSection>
            <Button palette="primary" size="caption" ghost onClick={actionClick}>{actionText}</Button>
          </FloatingSection>
        )}
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
  actionText: string,
  actionClick: func,
  bottomActionText: string,
  bottomActionOnClick: func,
  stage: string,
  referralSentAt: string,
  path: string,
};

export default DashboardAdminReferralAgentTile;
