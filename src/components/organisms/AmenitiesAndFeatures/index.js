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
  propertyName, communityHighlights, personalSpace, personalSpaceOther, communitySpace, communitySpaceOther,
  nonCareServices, nonCareServicesOther, languages, languagesOther,
}) => {
  let noData = false;
  if (!communityHighlights.length && !personalSpace.length && !personalSpaceOther.length && !communitySpace.length &&
      !communitySpaceOther.length && !nonCareServices.length && !nonCareServicesOther.length && !languages.length) {
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
          <List heading={`${propertyName} is known for`} items={communityHighlights} />
        </StyledArticle>
      }
      {(personalSpace.length > 0 || personalSpaceOther.length > 0) &&
        <StyledArticle id="amenities-and-features-personal-space">
          <List heading="Personal Space/Amenities" items={personalSpace.concat(personalSpaceOther)} />
        </StyledArticle>
      }
      {(communitySpace.length > 0 || communitySpaceOther.length > 0) &&
        <StyledArticle id="amenities-and-features-community-space">
          <List heading="Community Space/Neighborhood" items={communitySpace.concat(communitySpaceOther)} />
        </StyledArticle>
      }
      {(nonCareServices.length > 0 || nonCareServicesOther.length > 0) &&
        <StyledArticle id="amenities-and-features-noncare-services">
          <List heading="Activities & other services" items={nonCareServices.concat(nonCareServicesOther)} />
        </StyledArticle>
      }
      {(languages.length > 0 || languagesOther.length > 0) &&
        <StyledArticle id="amenities-and-features-languages">
          <List heading="Resident Languages" items={languages.concat(languagesOther)} />
        </StyledArticle>
      }
    </section>
  );
};

AmenitiesAndFeatures.propTypes = {
  propertyName: PropTypes.string.isRequired,
  communityHighlights: PropTypes.arrayOf(PropTypes.string),
  personalSpace: PropTypes.arrayOf(PropTypes.string),
  personalSpaceOther: PropTypes.arrayOf(PropTypes.string),
  communitySpace: PropTypes.arrayOf(PropTypes.string),
  communitySpaceOther: PropTypes.arrayOf(PropTypes.string),
  nonCareServices: PropTypes.arrayOf(PropTypes.string),
  nonCareServicesOther: PropTypes.arrayOf(PropTypes.string),
  languages: PropTypes.arrayOf(PropTypes.string),
  languagesOther: PropTypes.arrayOf(PropTypes.string),
};

AmenitiesAndFeatures.defaultProps = {
  communityHighlights: [],
  personalSpace: [],
  personalSpaceOther: [],
  communitySpace: [],
  communitySpaceOther: [],
  nonCareServices: [],
  nonCareServicesOther: [],
  languages: [],
  languagesOther: [],
};

export default AmenitiesAndFeatures;
