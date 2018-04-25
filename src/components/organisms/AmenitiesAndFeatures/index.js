import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { Paragraph } from 'sly/components/atoms';
import List from 'sly/components/molecules/List';

const StyledArticle = styled.article`
  margin-bottom: ${size('spacing.large')};
`;

const AmenitiesAndFeatures = ({
  communityName, communityHighlights, personalSpace, personalSpaceOther, communitySpace, communitySpaceOther,
  nonCareServices, nonCareServicesOther, languages, languagesOther,
}) => {
  let noData = false;
  if (!communityHighlights.length && !personalSpace.length && !personalSpaceOther && !communitySpace.length &&
      !communitySpaceOther && !nonCareServices.length && !nonCareServicesOther && !languages.length) {
    noData = true;
  }

  return (
    <section id="amenities-and-features">
      {noData &&
        <Paragraph>
          No information about amenities and features currently available
        </Paragraph>
      }
      {communityHighlights.length > 0 &&
        <StyledArticle id="amenities-and-features-known-for">
          <List heading={`${communityName} is known for`} items={communityHighlights} />
        </StyledArticle>
      }
      {(personalSpace.length > 0 || personalSpaceOther) &&
        <StyledArticle id="amenities-and-features-personal-space">
          {personalSpace.length > 0 &&
            <List heading="Personal Space/Amenities" items={personalSpace} />
          }
          {personalSpaceOther &&
            <Paragraph>
              {personalSpaceOther}
            </Paragraph>
          }
        </StyledArticle>
      }
      {(communitySpace.length > 0 || communitySpaceOther) &&
        <StyledArticle id="amenities-and-features-community-space">
          {communitySpace.length > 0 &&
            <List heading="Community Space/Neighborhood" items={communitySpace} />
          }
          {communitySpaceOther &&
            <Paragraph>
              {communitySpaceOther}
            </Paragraph>
          }
        </StyledArticle>
      }
      {(nonCareServices.length > 0 || nonCareServicesOther) &&
        <StyledArticle id="amenities-and-features-noncare-services">
          {nonCareServices.length > 0 &&
            <List heading="Activities & other services" items={nonCareServices} />
          }
          {nonCareServicesOther &&
            <Paragraph>
              {nonCareServicesOther}
            </Paragraph>
          }
        </StyledArticle>
      }
      {(languages.length > 0 || languagesOther) &&
        <StyledArticle id="amenities-and-features-languages">
          {languages.length > 0 &&
            <List heading="Resident Languages" items={languages} />
          }
          {languagesOther &&
            <Paragraph>
              {languagesOther}
            </Paragraph>
          }
        </StyledArticle>
      }
    </section>
  );
};

AmenitiesAndFeatures.propTypes = {
  communityName: PropTypes.string.isRequired,
  communityHighlights: PropTypes.arrayOf(PropTypes.string),
  personalSpace: PropTypes.arrayOf(PropTypes.string),
  personalSpaceOther: PropTypes.string,
  communitySpace: PropTypes.arrayOf(PropTypes.string),
  communitySpaceOther: PropTypes.string,
  nonCareServices: PropTypes.arrayOf(PropTypes.string),
  nonCareServicesOther: PropTypes.string,
  languages: PropTypes.arrayOf(PropTypes.string),
  languagesOther: PropTypes.string,
};

AmenitiesAndFeatures.defaultProps = {
  communityHighlights: [],
  personalSpace: [],
  communitySpace: [],
  nonCareServices: [],
  languages: [],
};

export default AmenitiesAndFeatures;
