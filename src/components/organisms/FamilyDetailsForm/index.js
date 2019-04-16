import React, { Component, Fragment } from 'react';
import { func, bool, string, object } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, columnWidth } from 'sly/components/themes';
import pad from 'sly/components/helpers/pad';
import textAlign from 'sly/components/helpers/textAlign';
import { phoneParser, phoneFormatter } from 'sly/services/helpers/phone';
import { LOOKING_FOR, GENDER, TIME_TO_MOVE, MONTHLY_BUDGET } from 'sly/constants/familyDetails';
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

const lookingForOptions = LOOKING_FOR.map(i => <option key={i.value} value={i.value}>{i.label}</option>);
const femaleOptions = GENDER.map(i => <option key={i.value} value={i.value}>{i.label}</option>);
const timeToMoveOptions = TIME_TO_MOVE.map(i => <option key={i.value} value={i.value}>{i.label}</option>);
const monthlyBudgetOptions = MONTHLY_BUDGET.map(i => <option key={i.value} value={i.value}>{i.label}</option>);

class FamilyDetailsForm extends Component {
  static propTypes = {
    handleSubmit: func.isRequired,
    submitting: bool,
    accepted: bool,
    intro: string,
    change: func,
    onLocationChange: func,
    initialValues: object,
  };

  handleChange = () => {
    const { change } = this.props;
    change('preferredLocation', '');
  };

  handleLocationChange = (value) => {
    const { change, onLocationChange } = this.props;
    change('preferredLocation', value);
    if (onLocationChange) {
      onLocationChange(value);
    }
  };

  render() {
    const { handleChange, handleLocationChange } = this;
    const {
      handleSubmit, submitting, accepted, intro, initialValues,
    } = this.props;
    let preferredLocation = '';
    if (initialValues) {
      ({ preferredLocation } = initialValues);
    }

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
        {accepted &&
          <Field
            name="budget"
            label="Monthly budget"
            type="select"
            component={ReduxField}
            wideWidth
          >
            {monthlyBudgetOptions}
          </Field>
        }
        {!accepted &&
          <Field
            name="budget"
            label="Monthly budget"
            type="text"
            disabled
            hideValue
            placeholder="Accept family to view"
            component={ReduxField}
            wideWidth
          />
        }
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
