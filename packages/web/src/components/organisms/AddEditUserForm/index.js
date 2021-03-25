import React, { Component } from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size, palette } from 'sly/common/components/themes';
import pad from 'sly/web/components/helpers/pad';
import { Block, Button } from 'sly/web/components/atoms';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const StyledButton = pad(Button, 'regular');
StyledButton.displayName = 'StyledButton';

const FormSection = styled.div`
  padding: ${size('spacing.xLarge')} ${size('spacing.large')};
  padding-bottom: 0;
  border-bottom: ${size('border.regular')} solid ${palette('slate', 'stroke')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: ${size('spacing.xLarge')};
    padding-bottom: 0;
  }
`;

const FormBottomSection = styled.div`
  padding: ${size('spacing.large')} ${size('spacing.xLarge')};
`;

const FormSectionHeading = pad(Block, 'large');

export default class AddEditUserForm extends Component {
  static propTypes = {
    handleSubmit: func,
    onCountryChange: func,
    selectedCountry: string,
    onCancel: func,
    invalid: bool,
    submitting: bool,
  };

  render() {
    const {
      handleSubmit, invalid, submitting,
    } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <FormSection>
            <FormSectionHeading weight="medium" size="title">Add New User</FormSectionHeading>
            <Field
              name="name"
              label="User Full Name"
              type="text"
              placeholder="Community Name"
              required
              component={ReduxField}
              wideWidth
            />
            <Field
              name="email"
              label="Phoneumber"
              type="email"
              required
              placeholder="(925) 555-5555"
              parens
              component={ReduxField}
              wideWidth
            />
            <Field
              name="phoneNumber"
              label="Phone Number"
              type="phone"
              required
              placeholder="(925) 555-5555"
              parens
              component={ReduxField}
              wideWidth
            />
            <Field
              name="roleId"
              label="Role ID"
              type="number"
              required
              parens
              component={ReduxField}
              wideWidth
            />
          </FormSection>
        </div>
        <FormBottomSection>
          <StyledButton type="submit" disabled={invalid || submitting}>
            Creae
          </StyledButton>
        </FormBottomSection>
      </form>
    );
  }
}
