import React, { Fragment } from 'react';
import styled from 'styled-components';
import { palette } from 'styled-theme';
import { object } from 'prop-types';

import { size } from 'sly/components/themes';
import { Heading } from 'sly/components/atoms';
import BoxRadioButton from 'sly/components/molecules/BoxRadioButton';

const lookingForOptions = [
  'Myself',
  'Parent',
  'Grantparent',
  'Spouse',
  'Friend',
  'Client',
];
const convertToValue = (option) => {
  return option.toLowerCase().replace(' ', '_');
};

const StyledHeading = styled(Heading)`
  font-weight: normal;
`;
const Description = styled.p`
  color: ${palette('grayscale', 0)};
`;
const BoxRadioButtonWrapper = styled.div`
  margin-bottom: ${size('spacing.regular')};
`;

const Step1 = ({ data }) => (
  <Fragment>
    {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
    <StyledHeading>Who are you looking for?</StyledHeading>
    <Description>This is an optional supportive sentance that can ideally at most two lines.</Description>
    {
      lookingForOptions.map((option, i) => {
        const value = convertToValue(option);

        return (
          <BoxRadioButtonWrapper key={i}>
            <BoxRadioButton
              name="looking_for"
              value={value}
              label={option}
              checked={data.looking_for === value}
            />
          </BoxRadioButtonWrapper>
        );
      })
    }
  </Fragment>
);

Step1.propTypes = {
  data: object,
};

Step1.defaultProps = {
  data: {},
};

export default Step1;
