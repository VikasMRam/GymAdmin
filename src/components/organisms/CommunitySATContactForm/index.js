import React from 'react';
import { string, object, func } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size, assetPath } from 'sly/components/themes';
import ReduxField from 'sly/components/organisms/ReduxField/index';

import { Heading, Block, Icon, Image } from 'sly/components/atoms';
import Link from 'sly/components/atoms/Link/index';

const Wrapper = styled.div`
  width: ${size('mobileLayout.col4')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.col6')};
  }
`;

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

const MedicaidCheckBox = styled(ReduxField)`
  display: flex;
  align-items: baseline;
  margin-right: ${size('spacing.regular')};
`;
MedicaidCheckBox.displayName = 'MedicaidCheckBox';

const CheckboxWrapper = styled.div`
  display: flex;
`;

const StyledIcon = styled(Icon)`
  &:hover {
    cursor: pointer;
  }
`;
StyledIcon.displayName = 'MedicaidHelpIcon';

const CommunitySATContactForm = ({
  error, user, onAdvisorHelpClick, onMedicaidHelpClick,
}) => {
  let heading = 'How can we contact you about this community tour?';
  if (user) {
    heading = 'Do you have any questions about this tour?';
  }
  const subheading = 'A local senior living advisor will help get you detailed pricing with this community. ';
  return (
    <Wrapper>
      <form>
        <HeadingSection level="subtitle" size="subtitle">{heading}</HeadingSection>
        <SubheadingWrapper>
          <SubHeading size="body">{subheading}<Link palette="primary" onClick={onAdvisorHelpClick}>How can an advisor help?</Link></SubHeading>
          <AgentImage src={assetPath('images/agent-xLarge.png')} alt="Agent" />
        </SubheadingWrapper>
        {!user && <Field
          name="name"
          label="Name"
          type="text"
          placeholder="First and Last Name"
          component={ReduxField}
        />}
        {!user && <Field
          name="email"
          label="Email"
          type="email"
          placeholder="Email"
          component={ReduxField}
        />}
        {!user && <Field
          name="phone"
          label="Phone"
          type="number"
          placeholder="Phone"
          component={ReduxField}
        />}
        <Field
          name="note"
          label="Add a note"
          type="textarea"
          placeholder="Anything you’d like your Advisor to know about this tour or any questions"
          component={ReduxField}
        />
        <CheckboxWrapper>
          <Field
            name="isMedicaid"
            label="I qualify for medicaid coverage"
            type="checkbox"
            component={MedicaidCheckBox}
          />
          <StyledIcon icon="help" size="regular" palette="slate" onClick={onMedicaidHelpClick} />
        </CheckboxWrapper>
        {error && <strong>{error}</strong>}
      </form>
    </Wrapper>
  );
};

CommunitySATContactForm.propTypes = {
  user: object,
  error: string,
  onAdvisorHelpClick: func.isRequired,
  onMedicaidHelpClick: func.isRequired,
};

export default CommunitySATContactForm;

