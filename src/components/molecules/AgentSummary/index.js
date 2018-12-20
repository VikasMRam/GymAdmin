import React from 'react';
import { string, number, arrayOf, func } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes/index';
import { Image, Icon, Block, Button, Span } from 'sly/components/atoms';
import { formatRating } from 'sly/services/helpers/rating';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;


const AgentImageWrapper = styled.div`
  width: ${size('mobileLayout.col2')};
  img {
    border-radius: 50%;
  }
  display: block;
  margin: 0 auto;
  margin-bottom: ${size('spacing.xLarge')};
`;

const TextSection = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  margin: 0 ${size('spacing.large')};
`;

const AgentName = styled(Block)`
  margin-bottom: ${size('spacing.regular')};
`;

const ReviewValueSection = styled.div`
  margin: 0 auto;
  align-items: center;
  margin-bottom: ${size('spacing.xLarge')};
`;

const FamiliesHelpedSection = styled.div`
  text-align: left;
  margin-bottom: ${size('spacing.large')};
`;

const AgentsCitiesSection = styled.div`
  text-align: left;
  margin-bottom: ${size('spacing.xLarge')};
`;

const AskQuestionButton = styled(Button)`
  width: 100%;
  margin-bottom: ${size('spacing.xLarge')};
`;

const PhoneSection = styled.div`
  margin-bottom: ${size('spacing.large')};
`;

const PhoneIcon = styled(Icon)`
  margin-right: ${size('spacing.regular')};
`;

const AgentSummary = ({
  profileImageUrl, displayName, aggregateRating, numRatings, recentFamiliesHelped, citiesServed, slyPhone, onButtonClick,
}) => {
  const firstName = displayName.split(' ')[0];
  return (
    <Wrapper>
      <AgentImageWrapper>
        <Image src={profileImageUrl} aspectRatio="1:1" />
      </AgentImageWrapper>
      <TextSection>
        <AgentName weight="medium" size="title">{displayName}</AgentName>
        {aggregateRating &&
          <ReviewValueSection>
            <Span icon="star" size="regular" palette="secondary" />
            <Span size="subtitle" weight="medium"> {formatRating(aggregateRating)} </Span>
            {numRatings && <Span size="caption" palette="grey">{numRatings} reviews</Span>}
          </ReviewValueSection>
        }
        {recentFamiliesHelped &&
          <FamiliesHelpedSection>
            <Span weight="medium">Families helped: </Span>
            <Span>{recentFamiliesHelped}</Span>
          </FamiliesHelpedSection>
        }
        {citiesServed &&
          <AgentsCitiesSection>
            <Span weight="medium">{`${firstName}'s Cities: `}</Span>
            <Span>{citiesServed.join(', ')}</Span>
          </AgentsCitiesSection>
        }
        <AskQuestionButton onClick={onButtonClick}>Ask a Question</AskQuestionButton>
        {slyPhone &&
          <PhoneSection>
            <PhoneIcon icon="phone" size="regular" palette="primary" />
            <Span size="subtitle" weight="medium" palette="primary">{slyPhone}</Span>
          </PhoneSection>
        }
      </TextSection>
    </Wrapper>
  );
};

AgentSummary.propTypes = {
  profileImageUrl: string.isRequired,
  displayName: string.isRequired,
  aggregateRating: number,
  numRatings: number,
  recentFamiliesHelped: number,
  citiesServed: arrayOf(string),
  slyPhone: string,
  onButtonClick: func,
};

export default AgentSummary;
