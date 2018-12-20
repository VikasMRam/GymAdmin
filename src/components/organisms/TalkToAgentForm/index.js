import React from 'react';
import { string, func, bool } from 'prop-types';
import styled from 'styled-components';
import { Field } from 'redux-form';
import { ifProp } from 'styled-tools';

import { size } from 'sly/components/themes';
import { Button, Block } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField';
import SearchBoxContainer from 'sly/containers/SearchBoxContainer';

const StyledBlock = styled(Block)`
  margin-bottom: ${size('spacing.regular')}
`;

const StyledButton = styled(Button)`
  margin-bottom: ${ifProp('error', size('spacing.large'), 0)};
  width: 100%;
`;

const StyledSearchBoxContainer = styled(SearchBoxContainer)`
  margin-bottom: ${size('spacing.large')};
`;

const Label = styled(Block)`
  margin-bottom: ${size('spacing.small')};
`;

const TalkToAgentForm = ({
  submitting, handleSubmit, error,
}) => (
  <section>
    <StyledBlock size="subtitle" weight="medium">Talk to a local Seniorly Agent</StyledBlock>
    <form onSubmit={handleSubmit}>
      <Label size="caption">Where are you searching for homes? *</Label>
      <StyledSearchBoxContainer layout="homeHero" />
      <Field
        name="phone"
        label="Phone"
        type="text"
        placeholder="925-555-5555"
        component={ReduxField}
      />
      <Field
        type="textarea"
        rows="3"
        name="message"
        label="What can we help you with? *"
        placeholder="I'm interested in a free consult with a Seniorly Agent."
        component={ReduxField}
      />
      <StyledButton error={error} type="submit" kind="jumbo" disabled={submitting}>
        Send
      </StyledButton>
    </form>
    {error && <Block palette="danger">{error}</Block>}
  </section>
);

TalkToAgentForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  error: string,
};

export default TalkToAgentForm;
