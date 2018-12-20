import React from 'react';
import { string, number, arrayOf, func } from 'prop-types';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';

import { size } from 'sly/components/themes/index';
import { Image, Icon, Block, Button, Span, Hr, Link } from 'sly/components/atoms';
import { formatRating } from 'sly/services/helpers/rating';

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
      border-radius: initial;
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
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: initial;
    margin-right: ${size('spacing.xLarge')};
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
  }
`;
const AgentSummary = ({
  profileImageUrl, displayName, aggregateRating, numRatings, recentFamiliesHelped, citiesServed, slyPhone, onButtonClick, onPhoneClick,
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
            <Icon icon="star" size="regular" palette="secondary" />
            <Span size="subtitle" weight="medium"> {formatRating(aggregateRating)} </Span>
            {numRatings && <Span size="caption" palette="grey">{numRatings} reviews</Span>}
          </ReviewValueSection>
        }
        <StyledHr />
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
        <AskQuestionPhoneSection>
          <AskQuestionButton onClick={onButtonClick}>Ask a Question</AskQuestionButton>
          {slyPhone &&
            <PhoneSection>
              <Icon icon="phone" size="regular" palette="primary" />
              <Link href={`tel:${slyPhone}`} onClick={onPhoneClick}>
                <Span size="subtitle" weight="medium" palette="primary">
                  <NumberFormat
                    value={slyPhone}
                    format="###-###-####"
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
  profileImageUrl: string.isRequired,
  displayName: string.isRequired,
  aggregateRating: number,
  numRatings: number,
  recentFamiliesHelped: number,
  citiesServed: arrayOf(string),
  slyPhone: number,
  onButtonClick: func,
  onPhoneClick: func,
};

export default AgentSummary;
