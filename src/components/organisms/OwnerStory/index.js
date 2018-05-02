import React from 'react';
import PropTypes from 'prop-types';

import { Paragraph } from 'sly/components/atoms';

const OwnerStory = ({
  ownerExperience,
}) => {
  return (
    <Paragraph>
      {ownerExperience || "No owner's story available"}
    </Paragraph>
  );
};

OwnerStory.propTypes = {
  ownerExperience: PropTypes.string,
};

export default OwnerStory;
