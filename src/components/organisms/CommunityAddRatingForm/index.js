import React from 'react';
import { func, string, bool, object } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import ReduxField from 'sly/components/organisms/ReduxField/index';

import { Heading, Button } from 'sly/components/atoms';

const StyledButton = styled(Button)`
  margin-bottom: ${size('spacing.regular')};
`;


const CommunityAddRatingForm = ({
  handleSubmit, pristine, submitting, communityName, user, error,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Heading level="title" size="title">Write a review for {communityName}</Heading>
      {!user && <Field
        name="name"
        label=""
        type="text"
        placeholder="Type your Name here..."
        component={ReduxField}
      />}
      {!user && <Field
        name="email"
        label=""
        type="email"
        placeholder="janedoe@gmail.com"
        component={ReduxField}
      />}
      <Field
        name="value"
        label=""
        type="rating"
        component={ReduxField}
      />
      <Field
        name="comments"
        label=""
        type="textarea"
        placeholder="Type your Comments here..."
        component={ReduxField}
      />
      {error && <strong>{error}</strong>}
      <StyledButton type="submit" kind="jumbo" disabled={pristine || submitting}>
        Submit Rating
      </StyledButton>

      {/* <TosAndPrivacy /> */}
    </form>
  );
};

CommunityAddRatingForm.propTypes = {
  handleSubmit: func.isRequired,
  communityName: string.isRequired,
  pristine: bool,
  submitting: bool,
  user: object,
  error: string,
};

export default CommunityAddRatingForm;
