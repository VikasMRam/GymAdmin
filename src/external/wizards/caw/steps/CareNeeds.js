import React, { Fragment } from 'react';
import styled from 'styled-components';
import { object } from 'prop-types';

import { size } from 'sly/components/themes';
import { Heading } from 'sly/components/atoms';
import BoxRadioButton from 'sly/components/molecules/BoxRadioButton';

const options = [
  { label: '24-hour supervision', helpText: 'Provide 24 hour supervision' },
  { label: 'Memory care', helpText: 'Needs include Alzheimer\'s or other Dementias' },
  { label: 'Bathing assistance', helpText: 'Provide 24 hour supervision' },
  { label: 'Eating assistance', helpText: 'More' },
  { label: 'Transfer assistance', helpText: 'Provide 24 hour supervision' },
  // { label: 'Medication anagement', helpText: 'Provide 24 hour supervision' },
  // { label: 'Insulin Injections', helpText: 'Provide 24 hour supervision' },
  { label: 'Short-Term care', helpText: 'Provide 24 hour supervision' },
  { label: 'Other', helpText: 'Provide 24 hour supervision' },
];

const StyledHeading = styled(Heading)`
  font-weight: normal;
  margin-bottom: ${size('spacing.xLarge')};
`;
const BoxRadioButtonWrapper = styled.div`
  margin-bottom: ${size('spacing.regular')};
`;

const CareNeeds = ({ data }) => (
  <Fragment>
    {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
    <StyledHeading>Do you have any care needs?</StyledHeading>
    {
      options.map((option, i) => (
        <BoxRadioButtonWrapper key={i}>
          <BoxRadioButton
            multiSelect
            name={`care_needs[${option.label}]`}
            value={option.label}
            label={option.label}
            checked={data.care_needs && data.care_needs[option.label]}
          />
        </BoxRadioButtonWrapper>
      ))
    }
  </Fragment>
);

CareNeeds.propTypes = {
  data: object,
};

CareNeeds.defaultProps = {
  data: {},
};

export default CareNeeds;
