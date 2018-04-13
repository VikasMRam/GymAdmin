import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { Paragraph, Heading } from 'sly/components/atoms';
import { CollapsibleBlock } from 'sly/components/molecules';

const Wrapper = styled.article`
`;

const CommunityDetails = ({
  communityName, communityDescription, staffDescription, residentDescription,
}) => {
  return (
    <CollapsibleBlock>
      {communityDescription ? (
        <Wrapper>
          <Heading size="subtitle">
            More about {communityName}
          </Heading>
          <Paragraph
            dangerouslySetInnerHTML={{ __html: communityDescription }}
          />
        </Wrapper>
      ) : (
        'No details are available'
      )}
      {staffDescription && (
        <Wrapper>
          <Heading size="subtitle">
            About the Staff at {communityName}
          </Heading>
          <Paragraph>{staffDescription}</Paragraph>
        </Wrapper>
      )}
      {residentDescription && (
        <Wrapper>
          <Heading size="subtitle">
            About the Residents at {communityName}
          </Heading>
          <Paragraph>{residentDescription}</Paragraph>
        </Wrapper>
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
