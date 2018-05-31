import React from 'react';
import PropTypes from 'prop-types';

import CollapsibleBlock from 'sly/components/molecules/CollapsibleBlock';
import { Paragraph, Heading } from 'sly/components/atoms';


const CommunityDetails = ({
  communityName, communityDescription, staffDescription, residentDescription, ownerExperience,
}) => {
  return (
    <CollapsibleBlock>
      {communityDescription ? (
        <article>
          <Paragraph
            dangerouslySetInnerHTML={{ __html: communityDescription }}
          />
        </article>
      ) : (
        'No details are available'
      )}
      {ownerExperience && (
        <article>
          <Heading level="subtitle" size="subtitle">
            Owners Story
          </Heading>
          <Paragraph>{ownerExperience}</Paragraph>
        </article>
      )}
      {staffDescription && (
        <article>
          <Heading level="subtitle" size="subtitle">
            About the Staff at {communityName}
          </Heading>
          <Paragraph>{staffDescription}</Paragraph>
        </article>
      )}
      {residentDescription && (
        <article>
          <Heading level="subtitle" size="subtitle">
            About the Residents at {communityName}
          </Heading>
          <Paragraph>{residentDescription}</Paragraph>
        </article>
      )}
    </CollapsibleBlock>
  );
};

CommunityDetails.propTypes = {
  communityName: PropTypes.string.isRequired,
  communityDescription: PropTypes.string,
  staffDescription: PropTypes.string,
  residentDescription: PropTypes.string,
  ownerExperience: PropTypes.string,
};

export default CommunityDetails;
