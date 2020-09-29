import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/common/components/themes';
import { Heading, Paragraph, Link } from 'sly/common/components/atoms';
import CollapsibleBlock from 'sly/web/components/molecules/CollapsibleBlock';

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

const CommunityAbout = ({
  id, communityName, communityDescription, rgsAuxDescription, staffDescription, residentDescription,
  ownerExperience, city, state, twilioNumber, guideUrl, communityUser, isActiveAdult, ...props
}) => (
  <CollapsibleBlock {...props} collapsedDefault={false}>
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
        <StyledHeading level="subtitle" size="body">
          Owners Story
        </StyledHeading>
        {ownerExperience.split('\n\n')
          .map(paragraph => <Paragraph key={paragraph}>{paragraph}</Paragraph>)
        }
      </StyledArticle>
    )}
    {staffDescription && (
      <StyledArticle>
        <StyledHeading level="subtitle" size="body">
          About the Staff at {communityName}
        </StyledHeading>
        {staffDescription.split('\n\n')
          .map(paragraph => <Paragraph key={paragraph}>{paragraph}</Paragraph>)
        }
      </StyledArticle>
    )}
    {residentDescription && (
      <StyledArticle>
        <StyledHeading level="subtitle" size="body">
          About the Residents at {communityName}
        </StyledHeading>
        {residentDescription.split('\n\n')
          .map(paragraph => <Paragraph key={paragraph}>{paragraph}</Paragraph>)
        }
      </StyledArticle>
    )}
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
    {!isActiveAdult &&
      <StyledArticle>
        <StyledHeading level="subtitle" size="body">
          What is a Local Senior Living Expert in {city}, {state}?
        </StyledHeading>
        <Paragraph>
          A senior living expert is a professional who knows
          the {city}, {state} communities and specializes in helping you find the right fit for your
          unique budget, location, care, social and other needs. This is a free service. To learn more,&nbsp;
          <Link href="https://www.seniorly.com/agents?sly_category=summary&sly_action=cta_link&sly_label=agent_link" target="_blank">
            click here to visit our Seniorly Local Experts page.
          </Link>
        </Paragraph>
      </StyledArticle>
    }
    {isActiveAdult &&
      <StyledArticle>
        <StyledHeading level="subtitle" size="body">
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
  guideUrl: PropTypes.string,
  twilioNumber: PropTypes.object,
  communityUser: PropTypes.object,
  isActiveAdult: PropTypes.bool,
};

export default CommunityAbout;
