/* eslint-disable react/no-danger */
import React from 'react';
import { string } from 'prop-types';

import CollapsibleBlock from 'sly/web/components/molecules/CollapsibleBlock';

const CommunityLocalDetails = ({ localDetails }) => {
  if (localDetails) {
    return (
      <CollapsibleBlock collapsedDefault={false} >
        <div dangerouslySetInnerHTML={{ __html: localDetails }} />
      </CollapsibleBlock>);
  }
  return null;
};

CommunityLocalDetails.propTypes = {
  localDetails: string,
};
CommunityLocalDetails.defaultProps = {
  localDetails: '',
};

export default CommunityLocalDetails;
