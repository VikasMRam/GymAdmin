import React from 'react';
import { string, func, bool } from 'prop-types';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form';

import { size } from 'sly/components/themes';

import { Heading, Image, Button } from 'sly/components/atoms';

import ReduxField from 'sly/components/organisms/ReduxField';

const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.xLarge')}
`;
const Wrapper = styled.div`
  display: flex;
`;
const StyledImage = styled(Image)`
  max-width: 40%;
  object-fit: cover;
`;
const ContentWrapper = styled.div`
  padding: ${size('spacing.xxLarge')};
  width: 100%;
`;

const formComponent = ({ mainImage, submitting, handleSubmit }) => (
  <Wrapper>
    <StyledImage src={mainImage} />
    <ContentWrapper>
      <StyledHeading size="subtitle">Add to your favourites list</StyledHeading>
      <form onSubmit={handleSubmit}>
        <Field
          type="textarea"
          rows="3"
          name="note"
          label="Add a note"
          placeholder="What are some things about this community that you like..."
          component={ReduxField}
        />
        <Button type="submit" kind="jumbo" disabled={submitting}>
          Confirm
        </Button>
      </form>
    </ContentWrapper>
  </Wrapper>
);
formComponent.propTypes = {
  mainImage: string,
  handleSubmit: func,
  submitting: bool,
};

const ReduxForm = reduxForm({
  form: 'SaveCommunityForm',
  destroyOnUnmount: false,
  // required to refresh when initialValues change. Ref: https://redux-form.com/6.7.0/examples/initializefromstate/
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(formComponent);

const SaveCommunityForm = ({ submitForm, ...props }) => (
  <ReduxForm
    onSubmit={submitForm}
    {...props}
  />
);

SaveCommunityForm.propTypes = {
  submitForm: func.isRequired,
};

export default SaveCommunityForm;
