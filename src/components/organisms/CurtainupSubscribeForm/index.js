import React from 'react';
import styled, { css } from 'styled-components';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';
import { ifProp } from 'styled-tools';

import { size } from 'sly/components/themes';
import pad from 'sly/components/helpers/pad';
import mobileOnly from 'sly/components/helpers/mobileOnly';
import { Button, Block } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField';

const Error = pad(Block);
Error.displayName = 'Error';

const Wrapper = styled.div`
  display: grid;
  align-items: center;
  margin-bottom: ${ifProp('hasError', size('spacing.large'), 0)};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-bottom: 0;
    grid-gap: ${size('spacing.regular')};
    grid-template-columns: ${size('layout.col3')} min-content ${size('layout.col3')} ${size('layout.col2')};
  }
`;

const Or = mobileOnly(styled.div``, css`
  margin-bottom: ${size('spacing.xLarge')};
  text-align: center;
`);

const CurtainupSubscribeForm = ({
  handleSubmit, submitting, invalid, error, className,
}) => (
  <form onSubmit={handleSubmit} className={className}>
    <Wrapper hasError={!!error}>
      <Field
        name="email"
        type="email"
        label="Email"
        component={ReduxField}
        hideErrors
      />
      <Or>or</Or>
      <Field
        name="phone"
        type="phone"
        label="Phone"
        component={ReduxField}
        hideErrors
      />
      <Button type="submit" disabled={submitting || invalid}>Subscribe</Button>
    </Wrapper>
    {error && <Error palette="danger" size="caption">{error}</Error>}
  </form>
);

CurtainupSubscribeForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  invalid: bool,
  error: string,
  className: string,
};

export default CurtainupSubscribeForm;
