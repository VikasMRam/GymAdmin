import React from 'react';
import { func, string, bool, object } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/web/components/themes';
import ReduxField from 'sly/web/components/organisms/ReduxField/index';
import { Heading, Block, Button } from 'sly/web/components/atoms';
import pad from 'sly/web/components/helpers/pad';
import { community as communityPropType } from 'sly/common/propTypes/community';

const StyledButton = styled(Button)`
  margin-bottom: ${size('spacing.regular')};
`;

const ErrorBlock = pad(Block);

const CommunityAddRatingForm = ({
  handleSubmit, pristine, submitting, community, user, error,
}) => {
  const name = community && community.name;
  return (
    <form onSubmit={handleSubmit}>
      <Heading level="title" size="title">Write a review for {name}</Heading>
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
        palette="primary"
        variation="base"
        component={ReduxField}
      />
      <Field
        name="comments"
        label=""
        type="textarea"
        placeholder="Type your Comments here..."
        component={ReduxField}
      />
      {error && <ErrorBlock palette="danger">{error}</ErrorBlock>}
      <StyledButton type="submit" kind="jumbo" disabled={pristine || submitting}>
        Submit Rating
      </StyledButton>

      {/* <TosAndPrivacy /> */}
    </form>
  );
};

CommunityAddRatingForm.propTypes = {
  community: communityPropType,
  handleSubmit: func.isRequired,
  pristine: bool,
  submitting: bool,
  user: object,
  error: string,
};

export default CommunityAddRatingForm;
