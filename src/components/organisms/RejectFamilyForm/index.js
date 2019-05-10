import React, { Component } from 'react';
import { string, func, arrayOf } from 'prop-types';
import { Field } from 'redux-form';

import { Span, Label } from 'sly/components/atoms';
import {
  DESCRIPTION_REQUIRED_CLOSED_STAGE_REASONS,
  PREFERRED_LOCATION_REQUIRED_CLOSED_STAGE_REASONS,
} from 'sly/constants/familyDetails';
import ReduxField from 'sly/components/organisms/ReduxField';
import ThreeSectionFormTemplate from 'sly/components/molecules/ThreeSectionFormTemplate';
import SearchBoxContainer from 'sly/containers/SearchBoxContainer';

export default class RejectFamilyForm extends Component {
  static propTypes = {
    handleSubmit: func,
    onCancel: func,
    reasons: arrayOf(string).isRequired,
    currentReason: string,
    change: func.isRequired,
    onLocationChange: func,
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
      handleSubmit, onCancel, reasons, currentReason, ...props
    } = this.props;

    return (
      <ThreeSectionFormTemplate
        {...props}
        hasCancel
        onCancelClick={onCancel}
        hasSubmit
        onSubmit={handleSubmit}
        heading="Reject lead"
        submitButtonText="Confirm"
      >
        <Field
          name="reason"
          label={<span>Select a reason<Span palette="danger">*</Span></span>}
          type="select"
          component={ReduxField}
          value=""
        >
          <option value="" disabled>Select rejection reason</option>
          {reasons.map(r => <option key={r} value={r}>{r}</option>)}
        </Field>
        {DESCRIPTION_REQUIRED_CLOSED_STAGE_REASONS.includes(currentReason) &&
          <Field
            showCharacterCount
            type="textarea"
            rows={3}
            name="description"
            label={<span>Description<Span palette="danger">*</Span></span>}
            maxLength={200}
            placeholder="Please leave a note on the reason for closing this lead..."
            component={ReduxField}
          />
        }
        {PREFERRED_LOCATION_REQUIRED_CLOSED_STAGE_REASONS.includes(currentReason) &&
          <div>
            <Field
              name="preferredLocation"
              type="hidden"
              component={ReduxField}
            />
            <Label><span>Preferred location<Span palette="danger">*</Span></span></Label>
            <SearchBoxContainer
              layout="boxWithoutButton"
              onLocationSearch={handleLocationChange}
              onTextChange={handleChange}
            />
          </div>
        }
      </ThreeSectionFormTemplate>
    );
  }
}
