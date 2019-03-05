import React from 'react';
import styled from 'styled-components';
import { func, string, bool, object } from 'prop-types';
import { Field } from 'redux-form';

import ReduxField from 'sly/components/organisms/ReduxField';
import FormSection from 'sly/components/molecules/FormSection';
import InputMessage from 'sly/components/molecules/InputMessage';
import { size } from 'sly/components/themes';

const FormElementsWrapper = styled.div`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: flex;
    flex-direction: row-reverse;
  }
`;

const FieldsWrapper = styled.div``;

const StyledInputMessage = styled(InputMessage)`
  margin-bottom: ${size('spacing.xLarge')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-bottom: 0;
  }
`;

const noPasswordWarning = 'Create a password so you can discover and keep track of your favorite communities.';

const DashboardAddPasswordForm = ({
  handleSubmit, ...props
}) => {
  return (
    <FormSection heading="Add Your Password" buttonText="Create Password" onSubmit={handleSubmit} {...props}>
      <FormElementsWrapper>
        <StyledInputMessage icon="warning" palette="warning" message={noPasswordWarning} />
        <FieldsWrapper>
          <Field
            name="newPassword"
            label="New Password"
            type="password"
            placeholder=""
            component={ReduxField}
            wideWidth
          />
          <Field
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder=""
            component={ReduxField}
            wideWidth
          />
        </FieldsWrapper>
      </FormElementsWrapper>
    </FormSection>
  );
};

DashboardAddPasswordForm.propTypes = {
  handleSubmit: func.isRequired,
  pristine: bool,
  submitting: bool,
  user: object,
  error: string,
};

export default DashboardAddPasswordForm;
