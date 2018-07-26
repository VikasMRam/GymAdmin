import React, { Fragment } from 'react';
import styled from 'styled-components';
import { object } from 'prop-types';

import { size } from 'sly/components/themes';
import { Heading } from 'sly/components/atoms';
import BoxRadioButton from 'sly/components/molecules/BoxRadioButton';

const options = [
  'Renting',
  'Buying',
];

const StyledHeading = styled(Heading)`
  font-weight: normal;
  margin-bottom: ${size('spacing.xLarge')};
`;
const BoxRadioButtonWrapper = styled.div`
  margin-bottom: ${size('spacing.regular')};
`;

const BuyingOrRenting = ({ data }) => (
  <Fragment>
    {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
    <StyledHeading>Are you interested in renting or buying into a retirement community?</StyledHeading>
    {
      options.map((option, i) => (
        <BoxRadioButtonWrapper key={i}>
          <BoxRadioButton
            name="renting_or_buying"
            helpText="help text goes here"
            value={option}
            label={option}
            checked={data.renting_or_buying === option}
          />
        </BoxRadioButtonWrapper>
      ))
    }
  </Fragment>
);

BuyingOrRenting.propTypes = {
  data: object,
};

BuyingOrRenting.defaultProps = {
  data: {},
};

export default BuyingOrRenting;
