import React, { Component } from 'react';
import { func, bool, string, object, arrayOf } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, columnWidth } from 'sly/components/themes';
import pad from 'sly/components/helpers/pad';
import textAlign from 'sly/components/helpers/textAlign';
import { phoneParser, phoneFormatter } from 'sly/services/helpers/phone';
import { Block, Button, Hr, Label, Heading } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField';
import SearchBoxContainer from 'sly/containers/SearchBoxContainer';

const PadButton = pad(Button, 'regular');

const StyledButton = textAlign(PadButton, 'right');
StyledButton.displayName = 'StyledButton';
const Form = textAlign(styled.form``, 'right');
Form.displayName = 'Form';

const TwoColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${ifProp('verticalCenter', 'center', 'initial')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    flex-direction: row;
  }
`;

const StyledLabel = textAlign(styled(Label)`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-right: ${size('tabletLayout.gutter')};
    flex: 0 0 ${size('tabletLayout.col2')};
  }
`, 'left');

const IntroInfo = textAlign(styled(Block)`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-right: ${size('tabletLayout.gutter')};
    flex: 0 0 ${columnWidth(3, size('layout.gutter'))};
  }
`, 'left');
IntroInfo.displayName = 'IntroInfo';

const StyledSearchBoxContainer = styled(SearchBoxContainer)`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    flex: 0 0 ${size('tabletLayout.col3')};
  }
`;

const PaddedTwoColumnWrapper = pad(TwoColumnWrapper, 'large');

class DashboardAdminFamilyDetailsForm extends Component {
  static propTypes = {
    handleSubmit: func.isRequired,
    submitting: bool,
    change: func,
    onLocationChange: func,
    initialValues: object,
    lookingFor: arrayOf(string).isRequired,
    gender: arrayOf(string).isRequired,
    timeToMove: arrayOf(string).isRequired,
    monthlyBudget: arrayOf(string).isRequired,
    referralSource: arrayOf(string).isRequired,
  };

  handleChange = () => {
    const { change } = this.props;
    change('preferredLocation', '');
  };

  handleLocationChange = (value) => {
    const { change, onLocationChange } = this.props;
    change('preferredLocation', value.formatted_address);
    if (onLocationChange) {
      onLocationChange(value);
    }
  };

  render() {
    const { handleChange, handleLocationChange } = this;
    const {
      handleSubmit, submitting, initialValues, lookingFor, referralSource,
      gender, timeToMove, monthlyBudget,
    } = this.props;
    let preferredLocation = '';
    if (initialValues) {
      ({ preferredLocation } = initialValues);
    }

    const lookingForOptions = lookingFor.map(i => <option key={i} value={i}>{i}</option>);
    const femaleOptions = gender.map(i => <option key={i} value={i}>{i}</option>);
    const timeToMoveOptions = timeToMove.map(i => <option key={i} value={i}>{i}</option>);
    const monthlyBudgetOptions = monthlyBudget.map(i => <option key={i} value={i}>{i}</option>);
    const referralSourceOptions = referralSource.map(i => <option key={i} value={i}>{i}</option>);

    return (
      <div>
        <Form onSubmit={handleSubmit}>
          <TwoColumnWrapper>
            <div>
              {initialValues && initialValues.name && <Heading level="subtitle">{initialValues.name}</Heading>}
            </div>
            <StyledButton type="submit" disabled={submitting}>
              Save
            </StyledButton>
          </TwoColumnWrapper>
          <Hr />
          <Field
            name="name"
            label="Contact name"
            type="text"
            component={ReduxField}
          />
          <Field
            name="phone"
            label="Phone"
            parse={phoneParser}
            format={phoneFormatter}
            component={ReduxField}
          />
          <Field
            name="email"
            label="Email"
            type="email"
            component={ReduxField}
          />
          <Field
            name="residentName"
            label="Resident name"
            type="text"
            component={ReduxField}
          />
          <PaddedTwoColumnWrapper verticalCenter>
            <StyledLabel>Preferred location</StyledLabel>
            <StyledSearchBoxContainer
              layout="boxWithoutButton"
              onLocationSearch={handleLocationChange}
              onTextChange={handleChange}
              address={preferredLocation}
            />
          </PaddedTwoColumnWrapper>
          <Field
            name="referralSource"
            label="Referral Source"
            type="select"
            component={ReduxField}
            options={referralSourceOptions}
          />
          <Field
            name="lookingFor"
            label="Looking for"
            type="select"
            component={ReduxField}
            options={lookingForOptions}
          />
          <Field
            name="gender"
            label="Gender"
            type="select"
            component={ReduxField}
            options={femaleOptions}
          />
          <Field
            name="budget"
            label="Monthly budget"
            type="select"
            component={ReduxField}
            options={monthlyBudgetOptions}
          />
          <Field
            name="timeToMove"
            label="Time to move"
            type="select"
            component={ReduxField}
            options={timeToMoveOptions}
          />
          <TwoColumnWrapper>
            <Field
              name="introMessage"
              label="Message"
              type="textarea"
              component={ReduxField}
            />
          </TwoColumnWrapper>
        </Form>
      </div>
    );
  }
}

export default DashboardAdminFamilyDetailsForm;
