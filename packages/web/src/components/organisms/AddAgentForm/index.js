import React, { Component } from 'react';
import { func, object, bool } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size, palette, columnWidth } from 'sly/web/components/themes';
import pad from 'sly/web/components/helpers/pad';
import { Label, Hr, Block, Button } from 'sly/web/components/atoms';
import ReduxField from 'sly/web/components/organisms/ReduxField';
import { AVAILABLE_TAGS } from 'sly/web/constants/tags';
import { states } from 'sly/web/constants/communities';

const statesOptions = states.map(s => <option key={s} value={s}>{s}</option>);


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

export default class AddAgentForm extends Component {
  static propTypes = {
    handleSubmit: func,
    onCancel: func,
    invalid: bool,
    submitting: bool,
  };

  render() {
    const {
      handleSubmit, invalid, submitting, ...props
    } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <FormSection>
            <FormSectionHeading weight="medium" size="title">Add New Partner Agent</FormSectionHeading>
            <Field
              name="name"
              label="Agent Business name"
              type="text"
              placeholder="Agent Name"
              required
              component={ReduxField}
              wideWidth
            />
            <Field
              name="phone"
              label="Business phone"
              type="phone"
              required
              placeholder="(925) 555-5555"
              parens
              component={ReduxField}
              wideWidth
            />
          </FormSection>
          <FormSection>
            <FormSectionHeading weight="medium">Address</FormSectionHeading>
            <Field
              name="line1"
              label="Line 1"
              type="text"
              placeholder="Address line 1"
              required
              component={ReduxField}
              wideWidth
            />
            <Field
              name="line2"
              label="Line 2"
              type="text"
              placeholder="Address line 2"
              component={ReduxField}
              wideWidth
            />
            <Field
              name="city"
              label="City"
              type="text"
              placeholder="City"
              required
              component={ReduxField}
              wideWidth
            />
            <Field
              name="state"
              label="State"
              type="select"
              required
              component={ReduxField}
              wideWidth
            >
              <option>Select an option</option>
              {statesOptions}
            </Field>
            <Field
              name="zip"
              label="Zipcode"
              type="text"
              placeholder="Zipcode"
              required
              component={ReduxField}
              wideWidth
            />
          </FormSection>
        </div>
        <FormBottomSection>
          <StyledButton type="submit" disabled={invalid || submitting}>
            Create Agent
          </StyledButton>
        </FormBottomSection>
      </form>
    );
  }
}
