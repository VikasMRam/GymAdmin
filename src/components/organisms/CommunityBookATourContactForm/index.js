import React from 'react';
import { string, object, func } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size, assetPath } from 'sly/components/themes';
import ReduxField from 'sly/components/organisms/ReduxField';
import { Heading, Block, Image } from 'sly/components/atoms';
import Link from 'sly/components/atoms/Link';

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

const CommunityBookATourContactForm = ({
  error, user, userDetails, heading, subheading, onAdvisorHelpClick, handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <HeadingSection level="subtitle" size="subtitle">{heading}</HeadingSection>
      <SubheadingWrapper>
        <SubHeading size="body">{subheading} <Link palette="primary" onClick={onAdvisorHelpClick}>How can a Seniorly Partner Agent help?</Link></SubHeading>
      </SubheadingWrapper>
      {!(userDetails && userDetails.fullName) && <Field
        name="name"
        label="Full name"
        type="text"
        placeholder="Full name"
        component={ReduxField}
      />}
      {!(userDetails && userDetails.phone) &&
        <Field
          name="phone"
          label="Phone"
          type="text"
          placeholder="925-555-5555"
          component={ReduxField}
        />
      }
      {userDetails && userDetails.fullName &&
        <Field
          name="notes"
          label="Add a note"
          type="textarea"
          rows="5"
          placeholder="Anything you'd like your Seniorly Partner Agent to know or any questions"
          component={ReduxField}
        />
      }
      {error && <Block palette="danger">{error}</Block>}
      {!user && <Block size="tiny">By continuing, you agree to our <Link href="/tos" target="_blank">Terms of Service</Link> and <Link href="/privacy" target="_blank">Privacy Policy</Link></Block>}
    </form>
  );
};

CommunityBookATourContactForm.propTypes = {
  user: object,
  userDetails: object,
  error: string,
  onAdvisorHelpClick: func.isRequired,
  onContactByTextMsgChange: func,
  handleSubmit: func,
  heading: string.isRequired,
  subheading: string,
};

export default CommunityBookATourContactForm;
