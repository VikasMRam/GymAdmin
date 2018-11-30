import React from 'react';
import { string, object, func } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size, assetPath } from 'sly/components/themes';
import ReduxField from 'sly/components/organisms/ReduxField/index';
import { Heading, Block, Image } from 'sly/components/atoms';
import Link from 'sly/components/atoms/Link/index';

const SubheadingWrapper = styled.div`
  display: flex;
`;

const HeadingSection = styled(Heading)`
  margin-bottom: ${size('spacing.large')};
`;

const SubHeading = styled(Block)`
  margin-right: ${size('spacing.xLarge')};
  margin-bottom: ${size('spacing.xLarge')};
`;

const AgentImage = styled(Image)`
  display: block;
  align-self: baseline;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: none;
  }
`;

const CheckboxField = styled(Field)`
  display: flex;
  align-items: baseline;
`;

const CommunitySATContactForm = ({
  error, user, heading, subheading, onAdvisorHelpClick, onContactByTextMsgChange, handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <HeadingSection level="subtitle" size="subtitle">{heading}</HeadingSection>
      <SubheadingWrapper>
        <SubHeading size="body">{subheading} <Link palette="primary" onClick={onAdvisorHelpClick}>How can a partner agent help?</Link></SubHeading>
        <AgentImage src={assetPath('images/agent-xLarge.png')} alt="Agent" />
      </SubheadingWrapper>
      {!(user && user.name) && <Field
        name="name"
        label="Full name"
        type="text"
        placeholder="Full name"
        component={ReduxField}
      />}
      {!(user && user.phoneNumber) && <Field
        name="phone"
        label="Phone"
        type="text"
        placeholder="925-555-5555"
        component={ReduxField}
      />}
      {user && <Field
        name="notes"
        label="Add a note"
        type="textarea"
        rows="5"
        placeholder="Anything you'd like your partner agent to know about this tour or any questions"
        component={ReduxField}
      />}
      {!user && <CheckboxField
        name="contactByTextMsg"
        label="Please contact me by text message"
        type="checkbox"
        component={ReduxField}
        onChange={onContactByTextMsgChange}
      />}
      {error && <Block palette="danger">{error}</Block>}
      {!user && <Block size="tiny">By continuing, you agree to our <Link href="/tos" target="_blank">Terms of Service</Link> and <Link href="/privacy" target="_blank">Privacy Policy</Link></Block>}
    </form>
  );
};

CommunitySATContactForm.propTypes = {
  user: object,
  error: string,
  onAdvisorHelpClick: func.isRequired,
  onContactByTextMsgChange: func,
  handleSubmit: func,
  heading: string.isRequired,
  subheading: string.isRequired,
};

export default CommunitySATContactForm;
