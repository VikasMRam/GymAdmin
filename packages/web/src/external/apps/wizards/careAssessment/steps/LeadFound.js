import React from 'react';
import styled from 'styled-components';
import { number } from 'prop-types';
import { Field } from 'redux-form';

import { palette } from 'sly/components/themes';
import pad from 'sly/components/helpers/pad';
import { STEP_INPUT_FIELD_NAMES } from 'sly/external/constants/steps';
import { phoneParser, phoneFormatter } from 'sly/services/helpers/phone';
import { Heading } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField';
import TosAndPrivacy from 'sly/components/molecules/TosAndPrivacy';

const PaddedHeading = pad(Heading, 'regular');
PaddedHeading.displayName = 'PaddedHeading';

const Description = pad(styled.p`
  color: ${palette('slate', 'filler')};
`, 'xLarge');
Description.displayName = 'Description';

const LeadFound = ({ searchResultCount }) => (
  <>
    <PaddedHeading weight="regular">We found {searchResultCount} options near you. Sign up to connect with your local Seniorly Advisor.</PaddedHeading>
    <Description>Exclusive pricing and options - This is a FREE service.</Description>
    <Field
      name={STEP_INPUT_FIELD_NAMES.LeadFound[0]}
      placeholder="Name"
      type="text"
      component={ReduxField}
    />
    <Field
      name={STEP_INPUT_FIELD_NAMES.LeadFound[1]}
      placeholder="Email"
      type="email"
      component={ReduxField}
    />
    <Field
      name={STEP_INPUT_FIELD_NAMES.LeadFound[2]}
      placeholder="Phone"
      type="text"
      parse={phoneParser}
      format={phoneFormatter}
      component={ReduxField}
    />
    <TosAndPrivacy openLinkInNewTab />
  </>
);

LeadFound.propTypes = {
  searchResultCount: number,
};

LeadFound.defaultProps = {
  searchResultCount: 0,
};

export default LeadFound;
