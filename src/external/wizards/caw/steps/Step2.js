import React, { Fragment } from 'react';
import styled from 'styled-components';
import { object } from 'prop-types';

import { size } from 'sly/components/themes';
import { Heading } from 'sly/components/atoms';
import BoxRadioButton from 'sly/components/molecules/BoxRadioButton';

const options = [
  '24-hour supervision',
  'Dimentia care',
  'Bathing assistance',
  'Eating assistance',
  'Tansfer assistance',
  'Medication management',
  'Insulin injections',
  'short-term care',
];

const StyledHeading = styled(Heading)`
  font-weight: normal;
  margin-bottom: ${size('spacing.xLarge')};
`;
const BoxRadioButtonWrapper = styled.div`
  margin-bottom: ${size('spacing.regular')};
`;

const Step2 = ({ data }) => (
  <Fragment>
    {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
    <StyledHeading>Do you have any care needs?</StyledHeading>
    {
      options.map((option, i) => (
        <BoxRadioButtonWrapper key={i}>
          <BoxRadioButton
            multiSelect
            name={`care_needs[${option}]`}
            helpText="help text goes here"
            value={option}
            label={option}
            checked={data.care_needs && data.care_needs[option]}
          />
        </BoxRadioButtonWrapper>
      ))
    }
  </Fragment>
);

Step2.propTypes = {
  data: object,
};

Step2.defaultProps = {
  data: {},
};

export default Step2;
