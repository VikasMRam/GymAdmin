import React from 'react';
import { string, func } from 'prop-types';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';

import { size } from 'sly/components/themes';
import { formatRating } from 'sly/services/helpers/rating';
import agentPropType from 'sly/propTypes/agent';
import { Image, Icon, Block, Button, Span, Hr, Link } from 'sly/components/atoms';
import CollapsibleBlock from 'sly/components/molecules/CollapsibleBlock';
import pad from 'sly/components/helpers/pad';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    flex-direction: row;
  }
`;


const AgentImageWrapper = styled.div`
  width: ${size('mobileLayout.col2')};
  img {
    border-radius: 50%;
  }
  display: block;
  margin: 0 auto;
  margin-bottom: ${size('spacing.xLarge')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    flex: 1;
    img {
      border-radius: ${size('border.xxLarge')};
    }
  }
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    flex: 1;
  }
`;

const AgentName = styled(Block)`
  margin-bottom: ${size('spacing.regular')};
  text-align: center;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    text-align: left;
  }
`;

const ReviewValueSection = styled.div`
  align-items: center;
  margin-bottom: ${size('spacing.xLarge')};
  text-align: center;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    text-align: left;
  }
`;

const StyledHr = styled(Hr)`
  display: none;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: block;
    margin-top: 0;
  }
`;

const FamiliesHelpedSection = pad('div', 'large');

const ParentCompanySection = pad('div', 'large');

const AgentsCitiesSection = pad('div');

const AgentSlySection = pad('div', 'small');

const AskQuestionButton = styled(Button)`
  width: 100%;
  margin-bottom: ${size('spacing.xLarge')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: initial;
  }
`;

const PhoneSection = styled.div`
  text-align: center;
  margin-bottom: ${size('spacing.large')};
  span {
    margin-right: ${size('spacing.regular')};
  }
`;

const AskQuestionPhoneSection = styled.div`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
const AgentSummary = ({
  firstName, agent, onButtonClick, onPhoneClick,
}) => {
  const { info, aggregateRating } = agent;
  const {
    profileImageUrl, displayName, recentFamiliesHelped, citiesServed, slyPhone, parentCompany, imageCaption
  } = info;
  let ratingsSection = null;
  if (aggregateRating && aggregateRating.ratingValue > 0) {
    const { numRatings, ratingValue } = aggregateRating;
    ratingsSection = (
      <ReviewValueSection>
        <Icon icon="star" size="regular" palette="secondary" />
        <Span size="subtitle" weight="medium"> {formatRating(ratingValue)} </Span>
        {numRatings && <Span size="caption" palette="grey">from {numRatings} {numRatings > 1 ? 'reviews' : 'review'}</Span>}
      </ReviewValueSection>
    );
  }
  return (
    <Wrapper>
      <AgentImageWrapper>
        <Image src={profileImageUrl} aspectRatio="1:1" />
        <Block size="caption">
          {imageCaption}
        </Block>
      </AgentImageWrapper>
      <TextSection>
        <AgentSlySection>
          <Span weight="regular" >Seniorly Partner Agent</Span>
        </AgentSlySection>
        <AgentName weight="medium" size="title">{displayName}</AgentName>
        {ratingsSection}
        <StyledHr />
        {recentFamiliesHelped > 0 &&
          <FamiliesHelpedSection>
            <Span weight="medium">Families helped: </Span>
            <Span>{recentFamiliesHelped}</Span>
          </FamiliesHelpedSection>
        }
        {parentCompany &&
          <ParentCompanySection>
            <Span weight="medium">Company: </Span>
            <Span weight="regular">{parentCompany}</Span>
          </ParentCompanySection>
        }
        {citiesServed.length > 0 &&
          <AgentsCitiesSection>
            <Span weight="medium">{`${firstName}'s Cities: `}</Span>
            <CollapsibleBlock>{citiesServed.join(', ')}</CollapsibleBlock>
          </AgentsCitiesSection>
        }
        <AskQuestionPhoneSection>
          <AskQuestionButton onClick={onButtonClick}>Ask a Question</AskQuestionButton>
          {slyPhone &&
            <PhoneSection>
              <Icon icon="phone" size="regular" palette="primary" />
              <Link href={`tel:${slyPhone}`} onClick={onPhoneClick}>
                <Span size="subtitle" weight="medium" palette="primary">
                  <NumberFormat
                    value={slyPhone}
                    format="(###) ###-####"
                    displayType="text"
                  />
                </Span>
              </Link>
            </PhoneSection>
          }
        </AskQuestionPhoneSection>
      </TextSection>
    </Wrapper>
  );
};

AgentSummary.propTypes = {
  agent: agentPropType.isRequired,
  firstName: string.isRequired,
  onButtonClick: func,
  onPhoneClick: func,
};

AgentSummary.defaultProps = {
  citiesServed: [],
};

export default AgentSummary;
