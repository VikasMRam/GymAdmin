import React from 'react';
import { func, bool } from 'prop-types';
import styled from 'styled-components';
import { Field } from 'redux-form';

import { size } from 'sly/common/components/themes';
import { Button } from 'sly/web/components/atoms';
import ReduxField from 'sly/common/components/organisms/ReduxField';
import TosAndPrivacy from 'sly/web/components/molecules/TosAndPrivacy';

const TwoColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${size('spacing.regular')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    flex-direction: row;
    align-items: flex-start;
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
      <Button type="submit" disabled={submitting}>Get Availability</Button>
    </TwoColumnWrapper>
    <TosAndPrivacy />
  </form>
);

GetCurrentAvailabilityForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
};

export default GetCurrentAvailabilityForm;
