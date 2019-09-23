import React, { Fragment } from 'react';
import styled from 'styled-components';
import { string, number, bool, func } from 'prop-types';

import { size, palette } from 'sly/components/themes';
import { Heading, Badge, Icon, Block, Span } from 'sly/components/atoms';
import cursor from 'sly/components/helpers/cursor';
import Stage from 'sly/components/molecules/Stage/index';

const Wrapper = styled.div`
  border: ${size('border.regular')} solid ${palette('grey', 'filler')};
  border-radius: ${size('border.xxLarge')};
`;

const TopWrapper = styled.div`
  padding: ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: flex;
    padding: ${size('spacing.xLarge')};
  }
`;

const BottomWrapper = styled.div`
  border-top: ${size('border.regular')} solid ${palette('grey', 'filler')};
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

const MobileAgentNameHeading = styled(Heading)`

`;

const MobileSlyscoreSection = styled.div`
  margin-bottom: ${size('spacing.regular')};
`;

const StyledBadge = styled(Badge)`
  border-radius: ${size('spacing.small')};
  margin-bottom: ${size('spacing.small')};
  padding-top: ${size('spacing.small')};
  white-space: nowrap;
`;

const SlyScoreBadge = styled(StyledBadge)`
  margin-right: ${size('spacing.regular')};
`;
const StyledIcon = styled(Icon)`
  margin-right: ${size('spacing.small')};
`;

const IconBadgeSpan = styled(Span)`
  white-space: nowrap;
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
    padding: 4px 12px;
    background-color: ${palette('grey', 'stroke')};
    border: ${size('border.regular')} solid ${palette('grey', 'filler')};
    border-radius: ${size('border.xxLarge')};
    margin-right: ${size('spacing.large')};
  }
`;

const BottomActionBlock = cursor(styled(Block)`
  text-align: center;
`);

const DashboardAdminReferralAgentTile = ({
  className, onClick, name, slyScore, isRecommended, businessName, workPhone, cellPhone, leadCount, bottomActionText, bottomActionOnClick, stage,
}) => {
  return (
    <Wrapper className={className} onClick={onClick}>
      <TopWrapper>
        <BigScreenSlyScorebadge><Block weight="bold">{slyScore}</Block><Block weight="bold" palette="grey" size="tiny">SLY</Block></BigScreenSlyScorebadge>
        <SmallScreenSection>
          <MobileAgentNameHeading size="body">{name}</MobileAgentNameHeading>
          <MobileSlyscoreSection>
            <SlyScoreBadge palette="grey" variation="stroke"><IconBadgeSpan size="tiny">{slyScore} SLYSCORE</IconBadgeSpan></SlyScoreBadge>
            {isRecommended && <StyledBadge palette="green"><StyledIcon icon="checkmark-circle" palette="white" size="small" /><IconBadgeSpan palette="white" size="tiny">RECOMMENDED</IconBadgeSpan></StyledBadge>}
          </MobileSlyscoreSection>
        </SmallScreenSection>
        <DetailsTable>
          <BigScreenSection>
            <MobileAgentNameHeading size="body">{name}</MobileAgentNameHeading>
          </BigScreenSection>
          <BigScreenSection>
            {isRecommended && <StyledBadge palette="green"><StyledIcon icon="checkmark-circle" palette="white" size="small" /><IconBadgeSpan palette="white" size="tiny">RECOMMENDED</IconBadgeSpan></StyledBadge>}
          </BigScreenSection>
          {businessName && (
            <Fragment>
              <Span size="caption" palette="grey" variation="dark" >Business name</Span>
              <Span size="caption">{businessName}</Span>
            </Fragment>
          )}
          {workPhone && (
            <Fragment>
              <Span size="caption" palette="grey" variation="dark">Work phone</Span>
              <Span size="caption">{workPhone}</Span>
            </Fragment>
          )}
          {cellPhone && (
            <Fragment>
              <Span size="caption" palette="grey" variation="dark">Cell phone</Span>
              <Span size="caption">{cellPhone}</Span>
            </Fragment>
          )}
          {(leadCount !== undefined && leadCount !== null) && (
            <Fragment>
              <Span size="caption" palette="grey" variation="dark">Lead count</Span>
              <Span size="caption">{leadCount}</Span>
            </Fragment>
          )}
        </DetailsTable>
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
    </Wrapper>
  );
};

DashboardAdminReferralAgentTile.propTypes = {
  className: string,
  onClick: func,
  name: string.isRequired,
  slyScore: number.isRequired,
  isRecommended: bool.isRequired,
  businessName: string,
  workPhone: string,
  cellPhone: string,
  leadCount: number,
  bottomActionText: string,
  bottomActionOnClick: func,
  stage: string,
};

DashboardAdminReferralAgentTile.defaultProps = {
  isRecommended: false,
};

export default DashboardAdminReferralAgentTile;
