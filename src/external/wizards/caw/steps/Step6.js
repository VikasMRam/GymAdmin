import React, { Fragment } from 'react';
import styled from 'styled-components';
import { object, number } from 'prop-types';
import { Field } from 'redux-form';

import { size } from 'sly/components/themes';
import { Heading } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField';

const StyledHeading = styled(Heading)`
  font-weight: normal;
  margin-bottom: calc(${size('spacing.xxLarge')} + ${size('spacing.regular')});
`;

const Step6 = ({ searchResultCount }) => (
  <Fragment>
    {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
    <StyledHeading>We found {searchResultCount} options near you. Sign up to view your options.</StyledHeading>
    <Field
      name="name"
      placeholder="Name"
      type="text"
      component={ReduxField}
    />
    <Field
      name="email"
      placeholder="Email"
      type="email"
      component={ReduxField}
    />
    <Field
      name="phone"
      placeholder="Phone"
      type="text"
      component={ReduxField}
    />
  </Fragment>
);

Step6.propTypes = {
  data: object,
  searchResultCount: number,
};

Step6.defaultProps = {
  data: {},
  searchResultCount: 0,
};

export default Step6;
