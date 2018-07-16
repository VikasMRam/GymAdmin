import React, { Fragment } from 'react';
import styled from 'styled-components';
import { object } from 'prop-types';
import { palette } from 'styled-theme';

import { size } from 'sly/components/themes';
import SearchBoxContainer from 'sly/containers/SearchBoxContainer';
import { Heading } from 'sly/components/atoms';

const StyledHeading = styled(Heading)`
  font-weight: normal;
  margin-bottom: ${size('spacing.xLarge')};
`;
const Description = styled.p`
  color: ${palette('grayscale', 0)};
`;

const Step5 = ({ data }) => (
  <Fragment>
    {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
    <StyledHeading>What city are you renting in?</StyledHeading>
    <Description>Use the slider to adjust your budget.</Description>
    <SearchBoxContainer layout="boxWithoutButton" placeholder="Search the city you are renting in..." />
  </Fragment>
);

Step5.propTypes = {
  data: object,
};

Step5.defaultProps = {
  data: {},
};

export default Step5;
