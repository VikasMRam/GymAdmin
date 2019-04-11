import React, { Fragment } from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size, columnWidth } from 'sly/components/themes';
import pad from 'sly/components/helpers/pad';
import textAlign from 'sly/components/helpers/textAlign';
import ReduxField from 'sly/components/organisms/ReduxField';
import { Block, Button, Hr, Label } from 'sly/components/atoms';
import { phoneParser, phoneFormatter } from 'sly/services/helpers/phone';

const StyledButton = pad(Button, 'regular');
const Form = textAlign(styled.form``, 'right');

const TwoColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    flex-direction: row;
  }
`;

const StyledLabel = textAlign(styled(Label)`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-right: ${size('tabletLayout.gutter')};
    flex: 0 0 ${size('tabletLayout.col2')};
  }
`, 'left');

const IntroInfo = textAlign(styled(Block)`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-right: ${size('tabletLayout.gutter')};
    flex: 0 0 ${columnWidth(3, size('layout.gutter'))};
  }
`, 'left');

const FamilyDetailsForm = ({
  handleSubmit, submitting, accepted, intro,
}) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="name"
      label="Contact name"
      type="text"
      component={ReduxField}
      wideWidth
    />
    <Field
      name="phone"
      label="Phone"
      disabled={!accepted}
      placeholder={!accepted ? 'Accept family to view' : null}
      parse={phoneParser}
      format={phoneFormatter}
      component={ReduxField}
      wideWidth
    />
    <Field
      name="email"
      label="Email"
      type="email"
      disabled={!accepted}
      placeholder={!accepted ? 'Accept family to view' : null}
      component={ReduxField}
      wideWidth
    />
    <Field
      name="residentName"
      label="Resident name"
      type="text"
      component={ReduxField}
      wideWidth
    />
    <Field
      name="lookingFor"
      label="Looking for"
      type="select"
      component={ReduxField}
      wideWidth
    >
      <option value="mother">Mother</option>
      <option value="father">Father</option>
      <option value="self">Self</option>
    </Field>
    <Field
      name="gender"
      label="Gender"
      type="select"
      component={ReduxField}
      wideWidth
    >
      <option value="male">Male</option>
      <option value="female">Female</option>
    </Field>
    <Field
      name="preferredLocation"
      label="Preferred location"
      type="text"
      component={ReduxField}
      wideWidth
    />
    <Field
      name="budget"
      label="Monthly budget"
      type={!accepted ? 'text' : 'iconInput'}
      disabled={!accepted}
      placeholder={!accepted ? 'Accept family to view' : null}
      component={ReduxField}
      wideWidth
    />
    <Field
      name="timeToMove"
      label="Time to move"
      type="select"
      component={ReduxField}
      wideWidth
    >
      <option>In a Week</option>
      <option>In a month</option>
      <option value="2 months">In 2 month</option>
    </Field>
    <TwoColumnWrapper>
      <StyledLabel>Seniorly introduction</StyledLabel>
      <IntroInfo size="caption">{intro}</IntroInfo>
    </TwoColumnWrapper>
    {accepted &&
      <Fragment>
        <Hr />
        <StyledButton type="submit" disabled={submitting}>
          Save changes
        </StyledButton>
      </Fragment>
    }
  </Form>
);

FamilyDetailsForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  accepted: bool,
  intro: string,
};

export default FamilyDetailsForm;
