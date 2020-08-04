import React from 'react';
import { string, func, bool } from 'prop-types';
import styled from 'styled-components';
import { Field } from 'redux-form';
import { ifProp } from 'styled-tools';

import { size } from 'sly/common/components/themes';
import { Heading, Button, Block } from 'sly/web/components/atoms';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.xLarge')}
`;

const StyledButton = styled(Button)`
  margin-bottom: ${ifProp('error', size('spacing.large'), 0)};
  width: 100%;
`;
StyledButton.displayName = 'StyledButton';

const ShareCommunityForm = ({
  submitting, fromEnabled, handleSubmit, error,
}) => (
  <section>
    <StyledHeading size="subtitle">Share this community</StyledHeading>
    <form onSubmit={handleSubmit}>
      <Field
        type="text"
        name="to"
        label="Send to"
        placeholder="Enter email addresses, separated by commas"
        component={ReduxField}
      />
      {fromEnabled &&
        <Field
          type="text"
          name="from"
          label="From"
          placeholder="Your email"
          component={ReduxField}
        />
      }
      <Field
        type="textarea"
        rows="3"
        name="message"
        label="Message"
        placeholder="I wanted to share this community with you..."
        component={ReduxField}
      />
      <StyledButton error={error} type="submit" kind="jumbo" disabled={submitting}>
        Send
      </StyledButton>
    </form>
    {error && <Block palette="danger">{error}</Block>}
  </section>
);

ShareCommunityForm.propTypes = {
  handleSubmit: func.isRequired,
  fromEnabled: bool,
  submitting: bool,
  error: string,
};

ShareCommunityForm.defaultProps = {
  fromEnabled: true,
};

export default ShareCommunityForm;
