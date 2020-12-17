import React, { Component } from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size, palette } from 'sly/common/components/themes';
import pad from 'sly/web/components/helpers/pad';
import { Block, Button } from 'sly/web/components/atoms';
import ReduxField from 'sly/common/components/organisms/ReduxField';
import { AVAILABLE_TAGS } from 'sly/web/constants/tags';
import { countries, states } from 'sly/web/constants/geo';

const getStatesOptions = ( country ) => states[country].map(e => <option key={e.abbe} value={e.abbr}>{e.name}</option>);
const getAvailableTags = ( country ) => AVAILABLE_TAGS[country];
const countryOptions = countries.map(s => <option key={s} value={s}>{s}</option>);

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

export default class AddCommunityForm extends Component {
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
      handleSubmit, invalid, submitting, selectedCountry, onCountryChange
    } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <FormSection>
            <FormSectionHeading weight="medium" size="title">Add New Community</FormSectionHeading>
            <Field
              name="name"
              label="Community name"
              type="text"
              placeholder="Community Name"
              required
              component={ReduxField}
              wideWidth
            />
            <Field
              name="communityPhone"
              label="Front desk phone number"
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
              name="country"
              label="Country"
              type="select"
              required
              onChange={onCountryChange}
              component={ReduxField}
              wideWidth
            >
              <option>Select an option</option>
              {countryOptions}
            </Field>
            <Field
              name="state"
              label="State/Region"
              type="select"
              required
              component={ReduxField}
              wideWidth
            >
              <option>Select an option</option>
              {getStatesOptions(selectedCountry)}
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
          <FormSection heading="Type of community">
            <Field
              name="typeCare"
              label="Care type"
              type="choice"
              required
              isMulti
              options={getAvailableTags(selectedCountry).map(value => ({ label: value, value }))}
              component={ReduxField}
              wideWidth
            />
          </FormSection>
        </div>
        <FormBottomSection>
          <StyledButton type="submit" disabled={invalid || submitting}>
            Create Community
          </StyledButton>
        </FormBottomSection>
      </form>
    );
  }
}
