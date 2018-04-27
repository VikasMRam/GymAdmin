import React from 'react';
import PropTypes from 'prop-types';

import CollapsibleBlock from 'sly/components/molecules/CollapsibleBlock';
import { Paragraph, Heading } from 'sly/components/atoms';

const CommunityDetails = ({
  communityName, communityDescription, staffDescription, residentDescription,
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
      {staffDescription && (
        <article>
          <Heading size="subtitle">
            About the Staff at {communityName}
          </Heading>
          <Paragraph>{staffDescription}</Paragraph>
        </article>
      )}
      {residentDescription && (
        <article>
          <Heading size="subtitle">
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
};

export default CommunityDetails;
