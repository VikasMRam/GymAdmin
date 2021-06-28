import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Heading, Link, Paragraph, space, color } from 'sly/common/system';
import CollapsibleBlock from 'sly/web/components/molecules/CollapsibleBlock';

const StyledHeading = styled(Heading)`
  margin-bottom: ${space('m')};
`;

const StyledArticle = styled.article`
  margin-bottom: ${space('l')};
  &:last-of-type {
    margin-bottom: 0;
    p {
      margin-bottom: ${space('xs')};
    }
  }
`;

const LegacyContent = styled.div`
  a {
    text-decoration: none;
    color: ${color('primary')};

    &:hover {
      color: ${color('slate')};
      cursor: pointer;
    }

    &:active {
      color: ${color('primary')};
    }

    &:focus {
      outline: none;
    }
  }
`;
LegacyContent.defaultProps = {
  color: 'primary',
};

const CommunityAbout = ({
  id, communityName, communityDescription, rgsAuxDescription, staffDescription, residentDescription,
  ownerExperience, city, state, twilioNumber, communityUser, isActiveAdult, isInternational, ...props
}) => (
  <CollapsibleBlock showChevron={false} collapsedLabel="Read More" notCollapsedLabel="Read Less" {...props} collapsedDefault>
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
        <StyledHeading font="title-m">
          Owners Story
        </StyledHeading>
        {ownerExperience.split('\n\n')
          .map(paragraph => <Paragraph key={paragraph}>{paragraph}</Paragraph>)
        }
      </StyledArticle>
    )}
    {staffDescription && (
      <StyledArticle>
        <StyledHeading font="title-m">
          About the Staff at {communityName}
        </StyledHeading>
        {staffDescription.split('\n\n')
          .map(paragraph => <Paragraph key={paragraph}>{paragraph}</Paragraph>)
        }
      </StyledArticle>
    )}
    {residentDescription && (
      <StyledArticle>
        <StyledHeading font="title-m">
          About the Residents at {communityName}
        </StyledHeading>
        {residentDescription.split('\n\n')
          .map(paragraph => <Paragraph key={paragraph}>{paragraph}</Paragraph>)
        }
      </StyledArticle>
    )}
    {false && !isActiveAdult && !isInternational &&
      <StyledArticle>
        <StyledHeading font="title-m">
          What is a Seniorly Local Advisor in {city}, {state}?
        </StyledHeading>
        <Paragraph>
          A senior living expert is a professional who knows
          the {city}, {state} communities and specializes in helping you find the right fit for your
          unique budget, location, care, social and other needs. This is a free service. To learn more,&nbsp;
          <Link href="https://www.seniorly.com/agents?sly_category=summary&sly_action=cta_link&sly_label=agent_link" target="_blank">
            click here to visit our Seniorly Local Advisors page.
          </Link>
        </Paragraph>
      </StyledArticle>
    }
    {isActiveAdult &&
      <StyledArticle>
        <StyledHeading font="title-m">
          What are Active Adult Communities in {city}, {state}?
        </StyledHeading>
        <Paragraph>
          Active Adult Communities are age-restricted and age-targeted housing developments typically built for
          those aged 55 and over. Most 55+ Active Adult Communities have residences that are for sale. Age-restricted
          active adult communities require that 80% of residents must have at least one person over the age of 55
          living in the dwelling. Age-targeted active adult communities are housing developments that are marketed
          to those 55 and over.
        </Paragraph>
        <Paragraph>
          There are many reasons why a person over 55 should consider the Active Adult category. These
          reasons include living a maintenance free lifestyle, downsizing from a larger empty nest, rich
          amenities, and most importantly a vibrant social lifestyle.
        </Paragraph>
        <Paragraph>
          These communities do NOT offer caring services and may also not offer services such as housekeeping,
          transportation, and dining options. Looking for a senior living community that offers caring services? Consider a&nbsp;
          <Link href="https://www.seniorly.com/continuing-care-retirement-community?sly_category=summary&sly_action=cta_link&sly_label=ccrc_link" target="_blank">
            Continuing Care Retirement Community near you.
          </Link>
        </Paragraph>
      </StyledArticle>
    }
  </CollapsibleBlock>
);

CommunityAbout.propTypes = {
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
  communityUser: PropTypes.object,
  isActiveAdult: PropTypes.bool,
  isInternational: PropTypes.bool,
};

export default CommunityAbout;
