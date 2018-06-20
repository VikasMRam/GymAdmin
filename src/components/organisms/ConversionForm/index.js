import React from 'react';
import { func, bool } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { Experiment, Variant } from 'sly/services/experiments';

import ReduxField from 'sly/components/organisms/ReduxField';
import { Button, Heading } from 'sly/components/atoms';
import TosAndPrivacy from 'sly/components/molecules/TosAndPrivacy';
import { community as communityPropType } from 'sly/propTypes/community';

const StyledButton = styled(Button)`
  margin-bottom: ${size('spacing.regular')};
`;

const ConversionForm = ({ handleSubmit, submitting, community }) => (
  <form onSubmit={handleSubmit}>
    <Experiment disabled name="Organisms_ConversionForm_Heading" defaultVariant="get_pricing_availability">
      <Variant name="property_manager">
        <Heading level="title" size="title">Contact Property Manager</Heading>
      </Variant>
      <Variant name="get_pricing_availability">
        <Heading level="title" size="title">Get Pricing, Availability and more</Heading>
      </Variant>
    </Experiment>
    <Field
      name="full_name"
      label="Full Name"
      placeholder="Jane Doe"
      component={ReduxField}
    />
    <Field
      name="email"
      label="Email"
      type="email"
      placeholder="janedoe@gmail.com"
      component={ReduxField}
    />
    <Field
      name="phone"
      label="Phone"
      placeholder="925-555-5555"
      component={ReduxField}
    />
    <StyledButton type="submit" kind="jumbo" disabled={submitting}>
      Request Info
    </StyledButton>

    <TosAndPrivacy />
  </form>
);

ConversionForm.propTypes = {
  handleSubmit: func.isRequired,
  community: communityPropType.isRequired,
  submitting: bool,
};

export default ConversionForm;
