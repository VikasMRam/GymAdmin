import React from 'react';
import { func, bool, object } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';


import { size, palette } from 'sly/components/themes';
import { phoneParser, phoneFormatter } from 'sly/services/helpers/phone';
import ReduxField from 'sly/components/organisms/ReduxField';
import { Button, Heading, Link, Hr } from 'sly/components/atoms';
import TosAndPrivacy from 'sly/components/molecules/TosAndPrivacy';
import AgentTile from 'sly/components/molecules/AgentTile';

const StyledButton = styled(Button)`
  width: 100%;
  margin-bottom: ${size('spacing.regular')};
  font-weight: normal;
`;

const StyledForm = styled.form`
  width: 100%;
  padding: ${size('spacing.xLarge')};
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  margin-bottom: ${size('spacing.xLarge')};
`;

const AgentSectionWrapper = styled.div`
  width: 100%;
  padding: ${size('spacing.xLarge')};
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  margin-bottom: ${size('spacing.xLarge')};

`;

const AgentSectionText = styled.div`
  font-weight: bold;  
  margin-bottom: ${size('spacing.regular')};
`;

const AgentTileWrapper = styled.div`
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  border-radius: ${size('spacing.tiny')};
`;

const SubHeading = styled.div`
  margin-bottom: ${size('spacing.large')};
`;

const ConversionForm = ({
  handleSubmit,
  submitting,
  hasOnlyEmail,
  agent,
  contact,
  onAdvisorHelpClick,
}) => (
  <div>
    <StyledForm onSubmit={handleSubmit}>
      <Heading level="title" size="title">Get Pricing & Availability</Heading>
      {contact && <SubHeading>{`${contact.firstName} ${contact.lastName}`}</SubHeading>}

      <Hr />

      <Field
        name="full_name"
        label="Full Name"
        placeholder="Jane Doe"
        component={ReduxField}
      />
      {!hasOnlyEmail && (
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
        parse={phoneParser}
        format={phoneFormatter}
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
        <AgentSectionText>
          We have matched you with a Seniorly partner agent to help you along the way.{' '}
          <Link palette="primary" onClick={onAdvisorHelpClick}>Learn More</Link>
        </AgentSectionText>
        <AgentTileWrapper>
          <AgentTile
            user={{ name: agent.user.name, title: 'Seniorly Partner Agent', picture: agent.mainImage }}
          />
        </AgentTileWrapper>
      </AgentSectionWrapper>
    }
  </div>
);

ConversionForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  agent: object,
  contact: object,
  hasOnlyEmail: bool,
  onAdvisorHelpClick: func,
};

export default ConversionForm;
