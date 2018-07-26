import React, { Fragment } from 'react';
import styled from 'styled-components';
import { palette } from 'styled-theme';
import { object } from 'prop-types';

import { size } from 'sly/components/themes';
import { Heading } from 'sly/components/atoms';
import BoxRadioButton from 'sly/components/molecules/BoxRadioButton';

const options = [
  'Myself',
  'Parent',
  'Grantparent',
  'Spouse',
  'Friend',
  'Client',
];

const StyledHeading = styled(Heading)`
  font-weight: normal;
`;
const Description = styled.p`
  color: ${palette('grayscale', 0)};
`;
const BoxRadioButtonWrapper = styled.div`
  margin-bottom: ${size('spacing.regular')};
`;

const LookingFor = ({ data }) => (
  <Fragment>
    {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
    <StyledHeading>Who are you looking for?</StyledHeading>
    <Description>This is an optional supportive sentance that can ideally at most two lines.</Description>
    {
      options.map((option, i) => (
        <BoxRadioButtonWrapper key={i}>
          <BoxRadioButton
            name="looking_for"
            helpText="help text goes here"
            value={option}
            label={option}
            checked={data.looking_for === option}
          />
        </BoxRadioButtonWrapper>
      ))
    }
  </Fragment>
);

LookingFor.propTypes = {
  data: object,
};

LookingFor.defaultProps = {
  data: {},
};

export default LookingFor;
