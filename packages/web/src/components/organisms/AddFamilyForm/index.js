import React, { Component } from 'react';
import { func, object, bool } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/web/components/themes';
import pad from 'sly/web/components/helpers/pad';
import { SOURCE_OPTIONS, TIME_TO_MOVE_OPTIONS, LOOKING_FOR_OPTIONS } from 'sly/web/constants/familyDetails';
import { phoneParser, phoneFormatter } from 'sly/web/services/helpers/phone';
import { Label, Hr, Span } from 'sly/web/components/atoms';
import ReduxField from 'sly/web/components/organisms/ReduxField';
import ThreeSectionFormTemplate from 'sly/web/components/molecules/ThreeSectionFormTemplate';
import CollapsibleBlock from 'sly/web/components/molecules/CollapsibleBlock';
import SearchBoxContainer from 'sly/web/containers/SearchBoxContainer';
import { textAlign } from 'sly/web/components/helpers/text';

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
    isNonSlyCreator: bool,
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
      handleSubmit, onCancel, isNonSlyCreator, ...props
    } = this.props;

    // todo: convert to new select options after enabling react select
    const sourceOptions = SOURCE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>);
    const lookingForOptions = LOOKING_FOR_OPTIONS.map(i => <option key={i} value={i}>{i}</option>);
    const timeToMoveOptions = TIME_TO_MOVE_OPTIONS.map(i => <option key={i} value={i}>{i}</option>);

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
          required
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
          required
          component={ReduxField}
        />
        <Field
          name="email"
          label="Email"
          type="email"
          component={ReduxField}
        />
        <PaddedTwoColumnWrapper>
          <StyledLabel>Preferred location<Span palette="danger">*</Span></StyledLabel>
          <StyledSearchBoxContainer
            clearLocationOnBlur={false}
            onLocationSearch={this.handleLocationChange}
          />
          <Field
            name="preferredLocation"
            type="hidden"
            component={ReduxField}
          />
        </PaddedTwoColumnWrapper>
        { !isNonSlyCreator && <Field
          name="source"
          label="Source"
          type="select"
          required
          component={ReduxField}
          >
            <option>Select an option</option>
            {sourceOptions}
          </Field>
        }
        { isNonSlyCreator && <Field
          name="source"
          label="Source"
          type="text"
          required
          component={ReduxField}
        />

        }
        <Field
          type="textarea"
          rows={3}
          name="notes"
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
            <option value="" disabled>Select an option</option>
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
