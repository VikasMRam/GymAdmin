import React from 'react';
import { string, object, func } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { phoneParser, phoneFormatter } from 'sly/services/helpers/phone';
import { size } from 'sly/components/themes';
import ReduxField from 'sly/components/organisms/ReduxField';
import { Heading, Block } from 'sly/components/atoms';
import TosAndPrivacy from 'sly/components/molecules/TosAndPrivacy';

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

const StyledContainer = styled.div`
  padding: ${props => props.displayContext ? (props.displayContext === 'wizard' ? size('spacing.xLarge') : 'inherit') : 'inherit'};
  min-height:  ${props => props.displayContext ? (props.displayContext === 'wizard' ? '400px' : 'inherit') : 'inherit'};
`;

const CommunityBookATourContactForm = ({
  error, user, community, heading, handleSubmit, displayContext,
}) => {
  const format = number => phoneFormatter(number, true);
  return (
    <StyledContainer displayContext={displayContext}>
      <form onSubmit={handleSubmit}>
        <HeadingSection level="subtitle" size="subtitle">{heading}</HeadingSection>
        <SubheadingWrapper>
          <SubHeading size="body">Your details will remain confidential</SubHeading>
        </SubheadingWrapper>
        {!(user && user.name) && <Field
          name="name"
          label="Full name"
          type="text"
          placeholder="Full name"
          component={ReduxField}
        />}
        {!(user && user.phoneNumber) &&
          <Field
            name="phone"
            label="Phone"
            type="phone"
            parens
            component={ReduxField}
          />
        }
        {(community && community.partnerAgents && community.partnerAgents.length === 0) && !(user && user.email) &&
          <Field
            name="email"
            label="Email"
            type="email"
            placeholder="Email"
            component={ReduxField}
          />
        }
        {user && user.name && user.phoneNumber &&
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
        {!user && <TosAndPrivacy openLinkInNewTab />}
      </form>
    </StyledContainer>
  );
};

CommunityBookATourContactForm.propTypes = {
  user: object,
  community: object,
  displayContext: string,
  error: string,
  handleSubmit: func,
  heading: string.isRequired,
};

export default CommunityBookATourContactForm;
