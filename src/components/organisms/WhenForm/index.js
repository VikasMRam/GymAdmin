import React from 'react';
import { func, bool } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import ReduxField from 'sly/components/organisms/ReduxField';

import { Heading, Button, Block } from 'sly/components/atoms';
import TosAndPrivacy from 'sly/components/molecules/TosAndPrivacy';
import { community as communityPropType } from 'sly/propTypes/community';

const StyledButton = styled(Button)`
  margin-bottom: ${size('spacing.regular')};
`;

const WhenForm = ({ handleSubmit, submitting, community }) => (
  <form onSubmit={handleSubmit}>
    <Heading level={'title'} size="title">Get Pricing, Availability and more</Heading>
    <Field
      name="when"
      label="Full Name"
      type="datetime"
      placeholder="Jane Doe"
      component={ReduxField}
    />
    <StyledButton type="submit" kind="jumbo" disabled={submitting}>
      Request 
    </StyledButton>
  </form>
);

WhenForm.propTypes = {
  handleSubmit: func.isRequired,
  community: communityPropType.isRequired,
  submitting: bool,
};

export default WhenForm;
