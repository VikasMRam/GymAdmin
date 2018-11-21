import React from 'react';
import { func, string, bool, object } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size, assetPath } from 'sly/components/themes';

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

const CommunityTourBookedAskQuestionForm = ({
  handleSubmit, pristine, submitting, error,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <TopSection>
        <div>
          <Heading level="subtitle" size="subtitle">We&apos;ve recieved your tour request.</Heading>
          <Block>
            Your advisor will reach out to you soon. Feel free to ask them any questions in the meantime.
          </Block>
        </div>
        <div>
          <Image src={assetPath('images/agent-xLarge.png')} />
        </div>
      </TopSection>
      <StyledField
        name="question"
        label="Your message"
        type="textarea"
        placeholder="Hi Rachel, I have a question about my tour with Sagebrook..."
        component={ReduxField}
      />
      {error && <Block palette="danger">{error}</Block>}
      <StyledButton type="submit" kind="jumbo" disabled={pristine || submitting}>
        Send
      </StyledButton>
    </form>
  );
};

CommunityTourBookedAskQuestionForm.propTypes = {
  handleSubmit: func.isRequired,
  pristine: bool,
  submitting: bool,
  user: object,
  error: string,
};

export default CommunityTourBookedAskQuestionForm;
