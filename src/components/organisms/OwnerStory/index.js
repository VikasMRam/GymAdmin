import React from 'react';
import PropTypes from 'prop-types';

import { Paragraph } from 'sly/components/atoms';

const OwnerStory = ({
  ownerExprience,
}) => {
  return (
    <Paragraph>
      {ownerExprience || "No owner's story available"}
    </Paragraph>
  );
};

OwnerStory.propTypes = {
  ownerExprience: PropTypes.string,
};

export default OwnerStory;
