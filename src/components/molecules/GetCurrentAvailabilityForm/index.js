import React from 'react';
import { func, bool } from 'prop-types';
import styled from 'styled-components';
import { Field } from 'redux-form';

import { size } from 'sly/components/themes';
import { Button } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField';

const TwoColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    flex-direction: row;
  }
`;
const StyledReduxField = styled(ReduxField)`
  margin-right: ${size('spacing.large')};
  margin-bottom: ${size('spacing.large')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-bottom: 0;
  }
  width: 100%;
`;

const GetCurrentAvailabilityForm = ({ handleSubmit, submitting }) => (
  <form onSubmit={handleSubmit}>
    <TwoColumnWrapper>
      <Field
        name="email"
        type="email"
        placeholder="Your email address"
        component={StyledReduxField}
      />
      <Button type="submit" ghost disabled={submitting}>Get Pricing and Availability</Button>
    </TwoColumnWrapper>
  </form>
);

GetCurrentAvailabilityForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
};

export default GetCurrentAvailabilityForm;
