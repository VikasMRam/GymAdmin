import React, { Component } from 'react';
import { func, string, bool, object } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { size } from 'sly/components/themes';
import { Hr, Label } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField';
import FormSection from 'sly/components/molecules/FormSection';
import textAlign from 'sly/components/helpers/textAlign';
import { phoneParser, phoneFormatter } from 'sly/services/helpers/phone';
import pad from 'sly/components/helpers/pad';
import SearchBoxContainer from 'sly/containers/SearchBoxContainer';
import { userIs } from 'sly/services/helpers/role';
import { CUSTOMER_ROLE } from 'sly/constants/roles';

// TODO: Copied from FamilyDetailsForm. Need to make it generic field
const TwoColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    flex-direction: row;
    align-items: ${ifProp('verticalCenter', 'center', 'initial')};
  }
`;

const StyledLabel = textAlign(styled(Label)`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-right: ${size('tabletLayout.gutter')};
    flex: 0 0 ${size('tabletLayout.col2')};
  }
`, 'left');

const StyledSearchBoxContainer = styled(SearchBoxContainer)`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    flex: 0 0 ${size('tabletLayout.col3')};
  }
`;

const PaddedTwoColumnWrapper = pad(TwoColumnWrapper, 'large');

// TODO: Searching in, should it be a city search?
class DashboardProfileUserDetailsForm extends Component {
  handleChange = () => {
    const { change } = this.props;
    change('searchingCity', '');
  };

  handleLocationChange = (value) => {
    const { change, onLocationChange } = this.props;
    change('searchingCity', value.formatted_address);
    if (onLocationChange) {
      onLocationChange(value);
    }
  };
  render() {
    const { initialValues, status, user, title } = this.props;
    const { meta } = status.uuidAux;
    const {
      lookingFor, monthlyBudget, timeToMove,
    } = meta;
    // const lookingForOptions = lookingFor.map(i => ({ label: i, value: i }));
    // const timeToMoveOptions = timeToMove.map(i => ({ label: i, value: i }));
    // const monthlyBudgetOptions = monthlyBudget.map(i => ({ label: i, value: i }));

    const lookingForOptions = lookingFor.map(i => <option key={i} value={i}>{i}</option>);
    const timeToMoveOptions = timeToMove.map(i => <option key={i} value={i}>{i}</option>);
    const monthlyBudgetOptions = monthlyBudget.map(i => <option key={i} value={i}>{i}</option>);

    let searchingCity = '';
    if (initialValues) {
      ({ searchingCity } = initialValues);
    }
    return (
      <FormSection heading={title} buttonText="Save Changes" {...this.props}>
        <Field
          name="name"
          label="Contact Name"
          type="text"
          placeholder="Full Name"
          component={ReduxField}
          wideWidth
        />
        <Field
          name="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          component={ReduxField}
          wideWidth
        />
        <Field
          name="phoneNumber"
          label="Phone"
          type="text"
          placeholder="925-555-5555"
          parse={phoneParser}
          format={phone => phoneFormatter(phone)}
          component={ReduxField}
          wideWidth
        />
        {userIs(user, CUSTOMER_ROLE) &&
        <>
          <Hr />
          <Field
            name="lookingFor"
            label="Looking For"
            type="select"
            placeholder="Select an option"
            component={ReduxField}
            options={lookingForOptions}
            wideWidth
          >
            {lookingForOptions}
          </Field>
          <Field
            name="residentName"
            label="Resident Name"
            type="text"
            placeholder="Resident Name"
            component={ReduxField}
            wideWidth
          />
          <Field
            name="monthlyBudget"
            label="Monthly Budget"
            type="select"
            placeholder="Select an option"
            component={ReduxField}
            wideWidth
          >
            {monthlyBudgetOptions}
          </Field>
          <Field
            name="timeToMove"
            label="Time to move"
            type="select"
            placeholder="Select an option"
            component={ReduxField}
            wideWidth
          >
            {timeToMoveOptions}
          </Field>
          <PaddedTwoColumnWrapper verticalCenter>
            <StyledLabel>Searching in</StyledLabel>
            <StyledSearchBoxContainer
              onLocationSearch={this.handleLocationChange}
              onTextChange={this.handleChange}
              address={searchingCity}
            />
          </PaddedTwoColumnWrapper>
          <Field
            name="openToNearbyAreas"
            options={[{ label: 'Open to nearby area', value: true }]}
            type="checkbox"
            component={ReduxField}
            wideWidth
          />
        </>}
      </FormSection>
    );
  }
}

DashboardProfileUserDetailsForm.propTypes = {
  handleSubmit: func.isRequired,
  pristine: bool,
  submitting: bool,
  user: object,
  error: string,
  change: func,
  onLocationChange: func,
  initialValues: object,
  status: object,
  title: string.isRequired,
};

export default DashboardProfileUserDetailsForm;
