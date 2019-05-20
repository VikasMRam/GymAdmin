import React, { Fragment } from 'react';
import styled from 'styled-components';
import DashboardTwoColumnTemplate from 'sly/components/templates/DashboardTwoColumnTemplate';


import { createValidator, required, usPhone } from 'sly/services/validation';
import { reduxForm } from 'redux-form';
import { object } from 'prop-types';
import DashboardAdminFamilyDetailsForm from 'sly/components/organisms/DashboardAdminFamilyDetailsForm';
import SearchBoxContainer from 'sly/containers/SearchBoxContainer'
import { size } from 'sly/components/themes';
import { Hr } from 'sly/components/atoms';
import DashboardCallDetailsAgentInfoContainer from 'sly/containers/DashboardCallDetailsAgentInfoContainer';

const validate = createValidator({
  name: [required],
  phone: [required, usPhone],
  residentName: [required],
  lookingFor: [required],
  gender: [required],
  preferredLocation: [required],
  budget: [required],
  timeToMove: [required],
});

const ReduxForm = reduxForm({
  form: 'DashboardAdminFamilyDetailsForm',
  validate,
})(DashboardAdminFamilyDetailsForm);

const DetailsTab = styled.div`
  width: ${size('layout.col4')};
  margin: auto;
  padding: ${size('spacing.xxxLarge')} ${size('spacing.large')};
`;

const FamilyDetailsTab = styled.div`
  padding: ${size('spacing.xLarge')};
`;

const DashboardCallsDetailsPage = ({ meta, voiceCall }) => {
  console.log("Saw meta info:",meta);
  console.log("Saw voicecall info:",voiceCall);

  return (
    <Fragment>
      <DashboardTwoColumnTemplate>

        <FamilyDetailsTab><ReduxForm {...meta} /></FamilyDetailsTab>
        <DetailsTab><SearchBoxContainer> </SearchBoxContainer> <Hr /> <DashboardCallDetailsAgentInfoContainer callNumber={voiceCall.toNumber} /> <Hr /> <div>Search 3 Container </div> </DetailsTab>
      </DashboardTwoColumnTemplate>
    </Fragment>

  );
};

DashboardCallsDetailsPage.propTypes = {
  meta: object,
  voiceCall: object,
};

DashboardCallsDetailsPage.defaultProps = {
};

export default DashboardCallsDetailsPage;
