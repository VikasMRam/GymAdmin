import React from 'react';
import { func, bool, string, shape } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import ReduxField from 'sly/components/organisms/ReduxField';
import { Heading, Button } from 'sly/components/atoms';

const Form = styled.form`
  width: 100%;
`;

const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.large')};
`;

const StyledField = styled(Field)`
  > div > * {
    padding-left: 0;
    padding-right: 0;
  }
`;
const StyledButton = styled(Button)`
  width: 100%;
  margin-bottom: ${size('spacing.regular')};
`;

const StyledReduxField = styled(ReduxField)`
  display: flex;
  align-items: baseline;
`;

const typeOfCareOptions = [
  { value: 'none', label: 'None' },
  { value: 'assisted', label: 'Assisted' },
  { value: 'memory', label: 'Dementia' },
];
// const typeOfRoomOptions = [
//   { value: 'shared', label: 'Shared Suite' },
//   { value: 'studio', label: 'Studio' },
//   { value: 'bedroom', label: '1+ Bedroom' },
// ];
const timeToMoveOptions = [
  { value: 1, label: 'Now' },
  { value: 3, label: '1-3 Months' },
  { value: 6, label: '3+ Months' },
  // { value: 12, label: '12+ Months' },
];
const budgetOptions = [
  { value: 2, label: 'Under $2K' },
  { value: '2k-5k', label: '$2K to $5K' },
  { value: 5, label: 'Over $5K' },
  // { value: 10, label: 'Over $6000' },
];

// const paymentOptions = [
//   { value: 'Private Pay', label: 'Private Pay' },
//   { value: 'Medicaid Pay', label: 'Medicaid' },
// ];

const AdvancedInfoForm = ({
  handleSubmit, submitting, community,
}) => (
  <Form onSubmit={handleSubmit}>
    {community && <StyledHeading level="subtitle" size="subtitle">To connect to {community.name}...</StyledHeading>}
    <Field
      name="type_of_care"
      label="What type of care do you need?"
      type="multiplechoice"
      options={typeOfCareOptions}
      width="100%"
      component={ReduxField}
    />
    {/* <Field */}
    {/* name="type_of_room" */}
    {/* label="What type of room are you looking for?" */}
    {/* type="multiplechoice" */}
    {/* options={typeOfRoomOptions} */}
    {/* width="75%" */}
    {/* component={ReduxField} */}
    {/* /> */}
    <Field
      name="time_to_move"
      label="When would you/your loved one want to move in?"
      type="singlechoice"
      options={timeToMoveOptions}
      width="100%"
      component={ReduxField}
    />
    <StyledField
      name="budget"
      label="Do you have a monthly rental budget?"
      type="singlechoice"
      options={budgetOptions}
      width="100%"
      component={ReduxField}
    />
    {/* <Field */}
    {/* name="payment_mode" */}
    {/* label="How do you intend to pay?" */}
    {/* type="singlechoice" */}
    {/* options={paymentOptions} */}
    {/* width="100%" */}
    {/* component={ReduxField} */}
    {/* /> */}
    <Field
      name="medicaid_coverage"
      label="I'm only using Medicaid to pay."
      type="checkbox"
      responsive
      component={StyledReduxField}
    />
    <Field
      name="message"
      label="Add any additional requests below:"
      type="textarea"
      rows="3"
      component={ReduxField}
    />
    <StyledButton type="submit" kind="jumbo" disabled={submitting}>
      Submit
    </StyledButton>
  </Form>
);

AdvancedInfoForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  user: shape({ name: string.isRequired }),
  community: shape({ name: string.isRequired }),
};

export default AdvancedInfoForm;
