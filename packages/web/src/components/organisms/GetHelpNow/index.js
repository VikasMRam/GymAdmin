import React from 'react';
import { func, bool } from 'prop-types';
import { Field } from 'redux-form';

import pad from 'sly/web/components/helpers/pad';
import fullWidth from 'sly/web/components/helpers/fullWidth';
import { Button, Heading, Box, Link, Block } from 'sly/common/components/atoms';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const StyledButton = pad(fullWidth(Button), 'large');
StyledButton.displayName = 'StyledButton';

const PaddedHeading = pad(Heading);
PaddedHeading.displayName = 'PaddedHeading';

const GetHelpNow = ({ handleSubmit, onPhoneClick, invalid, submitting }) => (
  <Box>
    <form onSubmit={handleSubmit}>
      <PaddedHeading level="title" size="subtitle">Get Help Now - 100% Free</PaddedHeading>
      <Field
        name="what"
        label="What can we help you with?"
        type="select"
        component={ReduxField}
        hideErrors
      >
        <option value="" disabled>Use This Dropdown</option>
        <option value="get-detailed-pricing">Get Detailed Pricing</option>
        <option value="find-a-room-now">Find a Room Now</option>
        <option value="how-do-i-pay-for-senior-living">How Do I Pay for Senior Living?</option>
        <option value="ask-anything-about-senior-living">Ask Anything About Senior Living</option>
        <option value="other">Other</option>
      </Field>
      <StyledButton disabled={invalid || submitting} type="submit">Get Help Now</StyledButton>
      <Block>or call our team at <Link href="tel:+18558664515" onClick={onPhoneClick}>(855) 866-4515</Link></Block>
    </form>
  </Box>
);

GetHelpNow.propTypes = {
  handleSubmit: func,
  onPhoneClick: func,
  invalid: bool,
  submitting: bool,
};

export default GetHelpNow;
