import React from 'react';
import styled from 'styled-components';
import { func } from 'prop-types';

import { size } from 'sly/components/themes';
import agentPropType from 'sly/propTypes/agent';
import { getAgentUrl } from 'sly/services/helpers/url';
import { Icon, Block, Image, Link } from 'sly/components/atoms';
import { phoneFormatter } from 'sly/services/helpers/phone';

const SubHeadingSection = styled.div`
  display: flex;
  margin-bottom: ${size('spacing.xLarge')};
  cursor: pointer;
`;

const AdvisorHelpBlock = styled(Block)`
  margin-right: ${size('spacing.small')};
`;

const AgentInfoSection = styled.div`
  text-align: center;
`;

const AgentImageWrapper = styled.div`
  width: ${size('mobileLayout.col2')};
  img {
    border-radius: 50%;
  }
  display: block;
  margin: 0 auto;
  margin-bottom: ${size('spacing.regular')};
`;

const AgentName = styled(Block)`
  margin-bottom: ${size('spacing.large')};
`;

const PhoneLink = styled(Link)`
  display: block;
  margin-bottom: ${size('spacing.large')};
`;

const AgentReviewSection = styled.div`
  margin: 0 auto;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('tabletLayout.col6')};
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.col6')};
  }
`;

const ReviewSection = styled.div`
  text-align: center;
  margin-top: -${size('spacing.xLarge')};
  margin-left: ${size('spacing.large')};
`;

const ReviewBlock = styled(Block)`
  margin-bottom: ${size('spacing.regular')};
`;

const StyledIcon = styled(Icon)`
  margin-left: -${size('spacing.xLarge')};
`;

const CommunityAgentSection = ({
  agent, onPhoneClick, onAdvisorHelpClick,
}) => {
  const {
    displayName, profileImageUrl, slyPhone, chosenReview,
  } = agent.info;
  const reviewedBy = 'Resident\'s family member';
  const { id, address } = agent;
  let agentImageComponent = (
    <>
      <AgentImageWrapper>
        <Image src={profileImageUrl} aspectRatio="1:1" />
      </AgentImageWrapper>
      <AgentName weight="medium" palette="slate">{displayName}</AgentName>
    </>
  );
  if (id && address) {
    agentImageComponent = (
      <Link href={getAgentUrl(agent)}>
        {agentImageComponent}
      </Link>
    );
  }
  return (
    <>
      <SubHeadingSection onClick={onAdvisorHelpClick}>
        <AdvisorHelpBlock size="caption" weight="medium" palette="primary">What can my Local Senior Living Expert help me with?</AdvisorHelpBlock>
        <Icon icon="help" palette="primary" />
      </SubHeadingSection>
      <AgentInfoSection>
        {agentImageComponent}
        {
          slyPhone &&
          (
            <PhoneLink href={`tel:${slyPhone}`} onClick={onPhoneClick}>
              {phoneFormatter(slyPhone, true)}
            </PhoneLink>
          )
        }
      </AgentInfoSection>
      {chosenReview &&
        <AgentReviewSection>
          <StyledIcon icon="quote" size="xLarge" variation="filler" />
          <ReviewSection>
            <ReviewBlock>{chosenReview}</ReviewBlock>
            <Block size="caption" palette="grey">- {reviewedBy}</Block>
          </ReviewSection>
        </AgentReviewSection>
      }
    </>
  );
};

CommunityAgentSection.propTypes = {
  agent: agentPropType.isRequired,
  onPhoneClick: func,
  onAdvisorHelpClick: func,
};

export default CommunityAgentSection;
