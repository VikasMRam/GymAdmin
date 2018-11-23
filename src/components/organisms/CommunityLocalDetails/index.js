import React from 'react';
import PropTypes from 'prop-types';

import CollapsibleBlock from 'sly/components/molecules/CollapsibleBlock';

const CommunityLocalDetails = ({ localDetails }) => {
  if (localDetails) {
    return (
      <CollapsibleBlock collapsedDefault={false} >
        <div dangerouslySetInnerHTML={{ __html: localDetails }} />
      </CollapsibleBlock>);
  }
  return <div />;
};

CommunityLocalDetails.propTypes = {
  localDetails: PropTypes.string,
};
CommunityLocalDetails.defaultProps = {
  localDetails: '',
};

export default CommunityLocalDetails;
