import React, { Fragment } from 'react';
import styled from 'styled-components';
import { object } from 'prop-types';

import { size } from 'sly/components/themes';
import { Heading } from 'sly/components/atoms';
import BoxRadioButton from 'sly/components/molecules/BoxRadioButton';

const options = [
  'Myself',
  'Spouse',
  'Parent',
  'Grandparent',
  'Friend',
  'Client',
];

const StyledHeading = styled(Heading)`
  font-weight: normal;
`;

const BoxRadioButtonWrapper = styled.div`
  margin-bottom: ${size('spacing.regular')};
`;

const LookingFor = ({ data }) => (
  <Fragment>
    {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
    <StyledHeading>Who are you looking for?</StyledHeading>
    {
      options.map((option, i) => (
        <BoxRadioButtonWrapper key={i}>
          <BoxRadioButton
            name="looking_for"
            helpText=""
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
