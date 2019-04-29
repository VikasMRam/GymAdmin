import React, { Component, Fragment } from 'react';
import { func, bool, string, object, arrayOf } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, columnWidth } from 'sly/components/themes';
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

class FamilyDetailsForm extends Component {
  static propTypes = {
    handleSubmit: func.isRequired,
    submitting: bool,
    accepted: bool,
    intro: string,
    change: func,
    onLocationChange: func,
    initialValues: object,
    lookingFor: arrayOf(string).isRequired,
    gender: arrayOf(string).isRequired,
    timeToMove: arrayOf(string).isRequired,
    monthlyBudget: arrayOf(string).isRequired,
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
      handleSubmit, submitting, accepted, intro, initialValues, lookingFor,
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

    return (
      <Form onSubmit={handleSubmit}>
        <Field
          name="name"
          label="Contact name"
          type="text"
          component={ReduxField}
          wideWidth
        />
        <Field
          name="phone"
          label="Phone"
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
          component={ReduxField}
          wideWidth
        />
        <Field
          name="lookingFor"
          label="Looking for"
          type="select"
          component={ReduxField}
          wideWidth
        >
          {lookingForOptions}
        </Field>
        <Field
          name="gender"
          label="Gender"
          type="select"
          component={ReduxField}
          wideWidth
        >
          {femaleOptions}
        </Field>
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
          name="budget"
          label="Monthly budget"
          type="select"
          component={ReduxField}
          wideWidth
        >
          {monthlyBudgetOptions}
        </Field>
        <Field
          name="timeToMove"
          label="Time to move"
          type="select"
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
            <StyledButton type="submit" disabled={submitting}>
              Save changes
            </StyledButton>
          </Fragment>
        }
      </Form>
    );
  }
}

export default FamilyDetailsForm;
