import React from 'react';
import { string, object, func } from 'prop-types';

import InteractiveDetail from 'sly/components/molecules/InteractiveDetail';
import ThreeSectionFormTemplate from 'sly/components/molecules/ThreeSectionFormTemplate';

const AcceptFamilyContactDetails = ({
  label, detail, onSubmit,
}) => (
  <ThreeSectionFormTemplate hasSubmit heading="Accept and contact this family" submitButtonText="Continue to family details" onSubmit={onSubmit}>
    <InteractiveDetail label={label} detail={detail} />
  </ThreeSectionFormTemplate>
);

AcceptFamilyContactDetails.propTypes = {
  label: string.isRequired,
  detail: object.isRequired,
  onSubmit: func,
};

export default AcceptFamilyContactDetails;
