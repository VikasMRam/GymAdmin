import React from 'react';
import { func, string, bool } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { Heading, Button, Block, Image } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField';

const StyledButton = styled(Button)`
  margin-bottom: ${size('spacing.regular')};
  width: 100%;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${size('spacing.xLarge')};
`;

const StyledField = styled(Field)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const TextWrapper = styled.div`
  max-width: calc(${size('layout.col4')} + ${size('layout.gutter')} );
`;

const CommunityAskQuestionAgentForm = ({
  heading, description, agentImageUrl, handleSubmit, pristine, submitting, error, placeholder,
}) => (
  <form onSubmit={handleSubmit}>
    <TopSection>
      <TextWrapper>
        <Heading level="subtitle" size="subtitle">{heading}</Heading>
        {description && <Block>{description}</Block>}
      </TextWrapper>
      <div><Image src={agentImageUrl} /></div>
    </TopSection>
    <StyledField
      name="question"
      label="Your message"
      type="textarea"
      placeholder={placeholder}
      component={ReduxField}
    />
    {error && <Block palette="danger">{error}</Block>}
    <StyledButton type="submit" kind="jumbo" disabled={pristine || submitting}>
      Send
    </StyledButton>
  </form>
);

CommunityAskQuestionAgentForm.propTypes = {
  handleSubmit: func,
  pristine: bool,
  submitting: bool,
  error: string,
  placeholder: string.isRequired,
  heading: string.isRequired,
  description: string,
  agentImageUrl: string.isRequired,
};

export default CommunityAskQuestionAgentForm;
