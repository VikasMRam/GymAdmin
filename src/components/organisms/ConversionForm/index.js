import React from 'react';
import { func, bool, object } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { palette } from 'styled-theme';

import { size } from 'sly/components/themes';
import { Experiment, Variant } from 'sly/services/experiments';

import ReduxField from 'sly/components/organisms/ReduxField';
import { Button, Heading, Link, Hr, Block } from 'sly/components/atoms';
import TosAndPrivacy from 'sly/components/molecules/TosAndPrivacy';
import AgentTile from 'sly/components/molecules/AgentTile';
import { community as communityPropType } from 'sly/propTypes/community';

const StyledButton = styled(Button)`
  margin-bottom: ${size('spacing.regular')};
`;

const StyledForm = styled.form`
  width: 100%;
  padding: ${size('spacing.xLarge')};
  border: ${size('border.regular')} solid ${palette('grayscale', 2)};
  margin-bottom: ${size('spacing.xLarge')};
`;

const AgentSectionWrapper = styled.div`
  width: 100%;
  padding: ${size('spacing.xLarge')};
  border: ${size('border.regular')} solid ${palette('grayscale', 2)};
`;

const AgentSectionText = styled.div`
  margin-bottom: ${size('spacing.regular')};
`;

const AgentTileWrapper = styled.div`
  border: ${size('border.regular')} solid ${palette('grayscale', 2)};
  border-radius: ${size('spacing.tiny')};
`;

const SubHeading = styled.div`
  margin-bottom: ${size('spacing.large')};
`;


const ConversionForm = ({
  handleSubmit,
  submitting,
  community,
  concierge,
  express,
  agent,
  contact,
}) => (
  <div>
    <StyledForm onSubmit={data => handleSubmit(data, express)}>
      <Heading level="title" size="title">Get Pricing & Availability</Heading>
      {contact && <SubHeading>{`${contact.firstName} ${contact.lastName}`}</SubHeading>}

      <Hr />

      {express && (
        <Block>
          A Seniorly Guide will contact you soon, we just need your name and number.
        </Block>
      )}

      <Field
        name="full_name"
        label="Full Name"
        placeholder="Jane Doe"
        component={ReduxField}
      />
      {!express && (
        <Field
          name="email"
          label="Email"
          type="email"
          placeholder="janedoe@gmail.com"
          component={ReduxField}
        />
      )}
      <Field
        name="phone"
        label="Phone"
        placeholder="925-555-5555"
        component={ReduxField}
      />
      <StyledButton type="submit" kind="jumbo" disabled={submitting}>
        Request Info
      </StyledButton>

      <TosAndPrivacy />
    </StyledForm>
    {agent &&
      <AgentSectionWrapper>
        <AgentSectionText>We have matched you with a Seniorly Local Guide to help you along the way</AgentSectionText>
        <AgentSectionText><Link href="/how-it-works">Learn More</Link></AgentSectionText>
        <AgentTileWrapper>
          <AgentTile user={{ name: agent.user.name, title: 'Seniorly Local Guide', picture: agent.mainImage }} community={community} />
        </AgentTileWrapper>
      </AgentSectionWrapper>
    }
  </div>
);

ConversionForm.propTypes = {
  handleSubmit: func.isRequired,
  community: communityPropType.isRequired,
  submitting: bool,
  agent: object,
  contact: object,
};

export default ConversionForm;
