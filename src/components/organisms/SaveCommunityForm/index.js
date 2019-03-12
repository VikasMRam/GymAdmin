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

const ButtonsWrapper = styled.div`
  text-align: right;
`;

const StyledButton = styled(Button)`
  margin-right: ${size('spacing.large')};
`;

const SaveCommunityForm = ({
  submitting, handleSubmit, error, onCancelClick, hasCancel, heading,
}) => (
  <section>
    <StyledHeading size="subtitle">{heading}</StyledHeading>
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
      <ButtonsWrapper>
        {hasCancel &&
          <StyledButton secondary disabled={submitting} onClick={onCancelClick}>
            Cancel
          </StyledButton>
        }
        <Button type="submit" disabled={submitting}>
          Save
        </Button>
      </ButtonsWrapper>
    </form>
  </section>
);

SaveCommunityForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  error: string,
  onCancelClick: func,
  hasCancel: bool,
  heading: string,
};

SaveCommunityForm.defaultProps = {
  heading: 'Add to your favorites list',
};

export default SaveCommunityForm;
