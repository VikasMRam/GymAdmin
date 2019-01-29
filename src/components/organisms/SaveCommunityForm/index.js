import React from 'react';
import { func, bool, string } from 'prop-types';
import styled from 'styled-components';
import { Field } from 'redux-form';

import { size } from 'sly/components/themes';
import { Heading, Button, Block } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField';

const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.xLarge')}
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

const SaveCommunityForm = ({ submitting, handleSubmit, error }) => (
  <section>
    <StyledHeading size="subtitle">Add to your favorites list</StyledHeading>
    <form onSubmit={handleSubmit}>
      <Field
        type="textarea"
        rows="3"
        name="note"
        label="Add a note"
        placeholder="What are some things about this community that you like..."
        component={ReduxField}
      />
      {error && <Block palette="danger">{error}</Block>}
      <StyledButton type="submit" kind="jumbo" disabled={submitting}>
        Confirm
      </StyledButton>
    </form>
  </section>
);

SaveCommunityForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  error: string,
};

export default SaveCommunityForm;
