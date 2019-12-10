import React from 'react';
import { object, func } from 'prop-types';

import ConversionFormContainer from 'sly/containers/ConversionFormContainer';

const Concierge = ({
  community,
  concierge,
  submitRegularConversion,
}) => (
  <ConversionFormContainer
    submitRegularConversion={submitRegularConversion}
    community={community}
    concierge={concierge}
  />
);

Concierge.propTypes = {
  community: object,
  concierge: object.isRequired,
  submitRegularConversion: func.isRequired,
};

export default Concierge;
