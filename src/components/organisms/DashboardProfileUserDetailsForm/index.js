import React from 'react';
import { func, string, bool, object } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { Hr } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField';
import FormSection from 'sly/components/molecules/FormSection';

const TwoColumnField = styled(Field)`
  width: ${size('mobileLayout.col2')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: initial;
  }
`;

// TODO: Searching in, should it be a city search?
const DashboardProfileUserDetailsForm = ({
  handleSubmit, ...props
}) => {
  return (
    <FormSection heading="My Profile" buttonText="Save Changes" onSubmit={handleSubmit} {...props}>
      <Field
        name="name"
        label="Contact Name"
        type="text"
        placeholder="Full Name"
        component={ReduxField}
        wideWidth
      />
      <Field
        name="email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        component={ReduxField}
        wideWidth
      />
      <Field
        name="phone"
        label="Phone"
        type="text"
        placeholder="925-555-5555"
        component={ReduxField}
        wideWidth
      />
      <Hr />
      <TwoColumnField
        name="lookingFor"
        label="Looking For"
        type="select"
        component={ReduxField}
        wideWidth
      >
        <option>Mother</option>
        <option>Father</option>
      </TwoColumnField>
      <Field
        name="residentName"
        label="Resident Name"
        type="text"
        placeholder="Resident Name"
        component={ReduxField}
        wideWidth
      />
      <TwoColumnField
        name="monthlyBudget"
        label="Monthly Budget"
        type="iconInput"
        placeholder="3,000"
        component={ReduxField}
        wideWidth
      />
      <TwoColumnField
        name="timeToMove"
        label="Time to Move"
        type="select"
        component={ReduxField}
        wideWidth
      >
        <option>In a Week</option>
        <option>In a month</option>
      </TwoColumnField>
      <Field
        name="searchingCity"
        label="Searching in"
        type="text"
        placeholder="City"
        component={ReduxField}
        wideWidth
      />
      <Field
        name="openToNearbyAreas"
        label="Open to nearby area"
        type="checkbox"
        component={ReduxField}
        wideWidth
      />
    </FormSection>
  );
};

DashboardProfileUserDetailsForm.propTypes = {
  handleSubmit: func.isRequired,
  pristine: bool,
  submitting: bool,
  user: object,
  error: string,
};

export default DashboardProfileUserDetailsForm;
