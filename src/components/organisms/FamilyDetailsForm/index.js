import React, { Component, Fragment } from 'react';
import { func, bool, string, object, arrayOf } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, palette, columnWidth } from 'sly/components/themes';
import pad from 'sly/components/helpers/pad';
import textAlign from 'sly/components/helpers/textAlign';
import { phoneParser, phoneFormatter } from 'sly/services/helpers/phone';
import { Block, Button, Hr, Label } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField';
import SearchBoxContainer from 'sly/containers/SearchBoxContainer';

const StyledButton = pad(Button, 'regular');
StyledButton.displayName = 'StyledButton';

const Form = textAlign(styled.form``, 'right');
Form.displayName = 'Form';

const Warning = pad(styled(Block)`
  background-color: ${palette('warning.filler')};
  border-radius: ${size('border.xxLarge')};
  text-align: center;
  padding: ${size('spacing.large')};
`, 'xLarge');
Warning.displayName = 'Warning';

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


class FamilyDetailsForm extends Component {
  static propTypes = {
    handleSubmit: func.isRequired,
    submitting: bool,
    pristine: bool,
    invalid: bool,
    accepted: bool,
    canEditFamilyDetails: bool,
    intro: string,
    change: func,
    onLocationChange: func,
    initialValues: object,
    lookingFor: arrayOf(string).isRequired,
    gender: arrayOf(string).isRequired,
    timeToMove: arrayOf(string).isRequired,
    monthlyBudget: arrayOf(string).isRequired,
    preferredLocation: string,
  };

  handleLocationChange = (value) => {
    const { change, onLocationChange } = this.props;
    change('preferredLocation', value.formatted_address);
    if (onLocationChange) {
      onLocationChange(value);
    }
  };

  render() {
    const { handleLocationChange } = this;
    const {
      handleSubmit, submitting, invalid, accepted, intro, initialValues, lookingFor,
      gender, timeToMove, monthlyBudget, canEditFamilyDetails,
    } = this.props;
    let { preferredLocation } = this.props;
    if (initialValues && !preferredLocation) {
      ({ preferredLocation } = initialValues);
    }

    // const lookingForOptions = lookingFor.map(i => ({ label: i, value: i }));
    // const femaleOptions = gender.map(i => ({ label: i, value: i }));
    // const timeToMoveOptions = timeToMove.map(i => ({ label: i, value: i }));
    // const monthlyBudgetOptions = monthlyBudget.map(i => ({ label: i, value: i }));

    const lookingForOptions = lookingFor.map(i => <option value={i}>{i}</option>);
    const femaleOptions = gender.map(i => <option value={i}>{i}</option>);
    const timeToMoveOptions = timeToMove.map(i => <option value={i}>{i}</option>);
    const monthlyBudgetOptions = monthlyBudget.map(i => <option value={i}>{i}</option>);

    return (
      <div>
        {!canEditFamilyDetails &&
          <Warning size="caption">
            First update to a <strong>Connected Stage</strong> to edit this family’s details.
          </Warning>
        }
        <Form onSubmit={handleSubmit}>
          <Field
            name="name"
            label="Contact name"
            type="text"
            readOnly={!canEditFamilyDetails}
            component={ReduxField}
            wideWidth
          />
          <Field
            name="phone"
            label="Phone"
            readOnly={!canEditFamilyDetails}
            disabled={!accepted}
            hideValue={!accepted}
            placeholder={!accepted ? 'Accept family to view' : null}
            parse={phoneParser}
            format={phoneFormatter}
            component={ReduxField}
            wideWidth
          />
          <Field
            name="email"
            label="Email"
            type="email"
            readOnly={!canEditFamilyDetails}
            disabled={!accepted}
            hideValue={!accepted}
            placeholder={!accepted ? 'Accept family to view' : null}
            component={ReduxField}
            wideWidth
          />
          <Field
            name="residentName"
            label="Resident name"
            type="text"
            readOnly={!canEditFamilyDetails}
            component={ReduxField}
            wideWidth
          />
          <Field
            name="lookingFor"
            label="Looking for"
            type="select"
            placeholder="Select an option"
            disabled={!canEditFamilyDetails}
            component={ReduxField}
            wideWidth
          >
            {lookingForOptions}
          </Field>
          <Field
            name="gender"
            label="Gender"
            type="select"
            placeholder="Select an option"
            disabled={!canEditFamilyDetails}
            component={ReduxField}
            wideWidth
          >
            {femaleOptions}
          </Field>
          <PaddedTwoColumnWrapper verticalCenter>
            <StyledLabel>Preferred location</StyledLabel>
            <StyledSearchBoxContainer
              allowOnlySelectionFromSuggestions
              clearLocationOnBlur={false}
              onLocationSearch={handleLocationChange}
              address={preferredLocation}
              readOnly={!canEditFamilyDetails}
            />
            <Field
              name="preferredLocation"
              type="hidden"
              component={ReduxField}
            />
          </PaddedTwoColumnWrapper>
          <Field
            name="budget"
            label="Monthly budget"
            type="select"
            placeholder="Select an option"
            disabled={!canEditFamilyDetails}
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
            disabled={!canEditFamilyDetails}
            component={ReduxField}
            wideWidth
          >
            {timeToMoveOptions}
          </Field>
          <TwoColumnWrapper>
            <StyledLabel>Seniorly introduction</StyledLabel>
            <IntroInfo size="caption">{intro}</IntroInfo>
          </TwoColumnWrapper>
          {accepted &&
            <Fragment>
              <Hr />
              <StyledButton type="submit" disabled={invalid || submitting}>
                Save changes
              </StyledButton>
            </Fragment>
          }
        </Form>
      </div>
    );
  }
}

export default FamilyDetailsForm;
