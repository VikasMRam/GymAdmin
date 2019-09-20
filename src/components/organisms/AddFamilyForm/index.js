import React, { Component } from 'react';
import { func, string, arrayOf, object } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import pad from 'sly/components/helpers/pad';
import textAlign from 'sly/components/helpers/textAlign';
import { SOURCE_OPTIONS } from 'sly/constants/familyDetails';
import { phoneParser, phoneFormatter } from 'sly/services/helpers/phone';
import { Label, Hr } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField';
import ThreeSectionFormTemplate from 'sly/components/molecules/ThreeSectionFormTemplate';
import CollapsibleBlock from 'sly/components/molecules/CollapsibleBlock';
import SearchBoxContainer from 'sly/containers/SearchBoxContainer';

const PaddedTwoColumnWrapper = pad(styled.div``, 'large');

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

export default class AddFamilyForm extends Component {
  static propTypes = {
    handleSubmit: func,
    onCancel: func,
    initialValues: object,
    change: func,
    onLocationChange: func,
    lookingFor: arrayOf(string).isRequired,
    timeToMove: arrayOf(string).isRequired,
  };

  handleLocationChange = (value) => {
    const { change, onLocationChange } = this.props;
    change('preferredLocation', value.formatted_address);
    if (onLocationChange) {
      onLocationChange(value);
    }
  };

  render() {
    const {
      handleSubmit, onCancel, initialValues, timeToMove, lookingFor, ...props
    } = this.props;

    // todo: convert to new select options after enabling react select
    const sourceOptions = SOURCE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>);
    const lookingForOptions = lookingFor.map(i => <option key={i} value={i}>{i}</option>);
    const timeToMoveOptions = timeToMove.map(i => <option key={i} value={i}>{i}</option>);

    return (
      <ThreeSectionFormTemplate
        {...props}
        hasCancel
        onCancelClick={onCancel}
        hasSubmit
        onSubmit={handleSubmit}
        heading="Add New Family"
        submitButtonText="Create"
      >
        <Field
          name="name"
          label="Contact name"
          type="text"
          component={ReduxField}
        />
        <Field
          name="residentName"
          label="Resident name"
          type="text"
          component={ReduxField}
        />
        <Field
          name="phone"
          label="Phone number"
          parse={phoneParser}
          format={phoneFormatter}
          component={ReduxField}
        />
        <PaddedTwoColumnWrapper>
          <StyledLabel>Preferred location</StyledLabel>
          <StyledSearchBoxContainer
            allowOnlySelectionFromSuggestions
            clearLocationOnBlur={false}
            onLocationSearch={this.handleLocationChange}
          />
          <Field
            name="preferredLocation"
            type="hidden"
            component={ReduxField}
          />
        </PaddedTwoColumnWrapper>
        <Field
          name="source"
          label="Source"
          type="select"
          component={ReduxField}
        >
          <option>Select an option</option>
          {sourceOptions}
        </Field>
        <Field
          type="textarea"
          rows={3}
          name="slyMessage"
          label="Notes"
          component={ReduxField}
        />
        <Hr />
        <CollapsibleBlock chevronOnLeft expandTo="bottom" moreLabelOn="center" minHeight={0} notCollapsedLabel="Hide additional fields" collapsedLabel="Show additional fields">
          <Field
            name="timeToMove"
            label="Time to move"
            type="select"
            component={ReduxField}
          >
            <option value="" disabled>Select</option>
            {timeToMoveOptions}
          </Field>
          <Field
            name="lookingFor"
            label="Looking for"
            type="select"
            component={ReduxField}
          >
            <option value="" disabled>Select an option</option>
            {lookingForOptions}
          </Field>
        </CollapsibleBlock>
      </ThreeSectionFormTemplate>
    );
  }
}
