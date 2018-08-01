import React, { Fragment } from 'react';
import styled from 'styled-components';
import { object } from 'prop-types';
import { palette } from 'styled-theme';

import { size } from 'sly/components/themes';
import { Heading } from 'sly/components/atoms';
import BoxRadioButton from 'sly/components/molecules/BoxRadioButton';

import { stepInputFieldNames } from '../helpers';

const options = [
  { label: '24-hour supervision', helpText: 'Provide 24 hour supervision' },
  { label: 'Memory care', helpText: "Needs include Alzheimer's or other Dementias" },
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
  margin-bottom: ${size('spacing.regular')};
`;
const BoxRadioButtonWrapper = styled.div`
  margin-bottom: ${size('spacing.regular')};
`;
const Description = styled.p`
  color: ${palette('grayscale', 0)};
  margin-bottom: ${size('spacing.xLarge')};
`;

const CareNeeds = ({ data }) => (
  <Fragment>
    {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
    <StyledHeading>Do you have any care needs?</StyledHeading>
    <Description>Select all that apply</Description>
    {
      options.map((option, i) => (
        <BoxRadioButtonWrapper key={i}>
          <BoxRadioButton
            multiSelect
            name={`${stepInputFieldNames.CareNeeds[0]}[${option.label}]`}
            value={option.label}
            label={option.label}
            checked={data[stepInputFieldNames.CareNeeds[0]] && data[stepInputFieldNames.CareNeeds[0]][option.label]}
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
