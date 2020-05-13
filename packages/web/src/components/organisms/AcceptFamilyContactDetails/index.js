import React from 'react';
import { string, object, func } from 'prop-types';

import InteractiveDetail from 'sly/web/components/molecules/InteractiveDetail';
import ThreeSectionFormTemplate from 'sly/web/components/molecules/ThreeSectionFormTemplate';

const AcceptFamilyContactDetails = ({
  label, detail, handleSubmit, ...props
}) => (
  <ThreeSectionFormTemplate {...props} hasSubmit heading="Accept and contact this family" submitButtonText="Continue to family details" onSubmit={handleSubmit}>
    <InteractiveDetail label={label} detail={detail} />
  </ThreeSectionFormTemplate>
);

AcceptFamilyContactDetails.propTypes = {
  label: string.isRequired,
  detail: object.isRequired,
  handleSubmit: func,
};

export default AcceptFamilyContactDetails;
