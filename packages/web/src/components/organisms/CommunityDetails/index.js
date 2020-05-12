import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';
import CollapsibleBlock from 'sly/components/molecules/CollapsibleBlock';
import { Link, Paragraph, Heading } from 'sly/components/atoms';
import { phoneFormatter } from 'sly/services/helpers/phone';

const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.large')};
`;

const StyledArticle = styled.article`
  margin-bottom: ${size('spacing.xLarge')};
  &:last-of-type {
    margin-bottom: 0;
    p {
      margin-bottom: ${size('spacing.regular')};
    }
  }
`;

const LegacyContent = styled.div`
  a {
    text-decoration: none;
    color: ${palette('base')};

    &:hover {
      color: ${palette('filler')};
      cursor: pointer;
    }

    &:active {
      color: ${palette('base')};
    }

    &:focus {
      outline: none;
    }
  }
`;
LegacyContent.defaultProps = {
  palette: 'primary',
};

const CommunityDetails = ({
  id, communityName, communityDescription, rgsAuxDescription, staffDescription, residentDescription, ownerExperience, city, state, twilioNumber, guideUrl,
}) => {
  let phone = '8558664515';
  if (twilioNumber && twilioNumber.numbers && twilioNumber.numbers.length) {
    [phone] = twilioNumber.numbers;
  }

  return (
    <CollapsibleBlock collapsedDefault={false}>
      {communityDescription && (
        <StyledArticle>
          {communityDescription.split('\n\n')
            .map(paragraph => <Paragraph key={paragraph}>{paragraph}</Paragraph>)
          }
        </StyledArticle>
      )}
      {(!communityDescription && rgsAuxDescription &&
        <StyledArticle>
          <LegacyContent dangerouslySetInnerHTML={{ __html: rgsAuxDescription }} />
        </StyledArticle>
      )}
      {ownerExperience && (
        <StyledArticle>
          <StyledHeading level="subtitle" size="subtitle">
            Owners Story
          </StyledHeading>
          {ownerExperience.split('\n\n')
            .map(paragraph => <Paragraph key={paragraph}>{paragraph}</Paragraph>)
          }
        </StyledArticle>
      )}
      {staffDescription && (
        <StyledArticle>
          <StyledHeading level="subtitle" size="subtitle">
            About the Staff at {communityName}
          </StyledHeading>
          {staffDescription.split('\n\n')
            .map(paragraph => <Paragraph key={paragraph}>{paragraph}</Paragraph>)
          }
        </StyledArticle>
      )}
      {residentDescription && (
        <StyledArticle>
          <StyledHeading level="subtitle" size="subtitle">
            About the Residents at {communityName}
          </StyledHeading>
          {residentDescription.split('\n\n')
            .map(paragraph => <Paragraph key={paragraph}>{paragraph}</Paragraph>)
          }
        </StyledArticle>
      )}
      {
        <StyledArticle>
          Manage this community?&nbsp;
          <Link href={`/partners/communities?prop=${id}&sly_category=community-details&sly_action=cta_link&sly_label=claim`}>
            Click here to claim this profile
          </Link>

        </StyledArticle>
      }

      {guideUrl &&
        <StyledArticle>
          <Paragraph>
            {communityName} is located in {city}, {state}. To learn even more about senior living there, click on this link for the&nbsp;
            <Link href={`${guideUrl}`} >
              {city}, {state} assisted living guide.
            </Link>
          </Paragraph>
        </StyledArticle>
      }
      <StyledArticle>
        <Paragraph>
          Seniorly is not affiliated with the owner or operator(s) of {communityName}.
          The information above has not been verified or approved by the owner or operator.
          For exact details, connect to a Local Senior Living Expert in {city} by calling&nbsp;
          <Link href={`tel:${phone}`}>
            {phoneFormatter(phone, true)}
          </Link>
          . There is no cost for this service. We are compensated by the community you select.
        </Paragraph>
      </StyledArticle>
      <StyledArticle>
        <StyledHeading level="subtitle" size="subtitle">
          What is a Local Senior Living Expert in {city}, {state}?
        </StyledHeading>
        <Paragraph>
          A senior living expert is a professional who knows
          the {city}, {state} communities and specializes in helping you find the right fit for your
          unique budget, location, care, social and other needs. This is a free service. To learn more,&nbsp;
          <Link href="https://www.seniorly.com/agents?sly_category=summary&sly_action=cta_link&sly_label=agent_link" target="_blank">
            click here to visit our Seniorly Partner Agent page.
          </Link>
        </Paragraph>
        <Paragraph>&nbsp;</Paragraph>
      </StyledArticle>
    </CollapsibleBlock>
  );
};

CommunityDetails.propTypes = {
  id: PropTypes.string.isRequired,
  communityName: PropTypes.string.isRequired,
  communityDescription: PropTypes.string,
  rgsAuxDescription: PropTypes.string,
  staffDescription: PropTypes.string,
  residentDescription: PropTypes.string,
  ownerExperience: PropTypes.string,
  contract: PropTypes.bool,
  city: PropTypes.string,
  state: PropTypes.string,
  twilioNumber: PropTypes.object,
};

export default CommunityDetails;
