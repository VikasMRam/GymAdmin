import React, { Component } from 'react';
import { func, bool, object } from 'prop-types';
import styled from 'styled-components';
import { Field as RFField } from 'redux-form';

import { size, palette, columnWidth } from 'sly/components/themes';
import pad from 'sly/components/helpers/pad';
import textAlign from 'sly/components/helpers/textAlign';
import { Block, Button } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField';
import communityPropType from 'sly/propTypes/community';

const familyOvernightOptions = [
  { value: 'Family Overnight Stay Rooms', label: 'Family overnight stay rooms' },
];

const communitySpaceOptions = [
  { value: 'Library', label: 'Library' },
  { value: 'Garden', label: 'Garden' },
];

const Field = ({ canEdit, ...props }) => <RFField component={ReduxField} readOnly={!canEdit} wideWidth {...props} />;

const StyledButton = pad(Button, 'regular');
StyledButton.displayName = 'StyledButton';

const Form = styled.form``;
Form.displayName = 'Form';

const FormScrollSection = styled.div`
  // max-height: calc(100vh - 240px);
`;

const IntroInfo = textAlign(styled(Block)`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-right: ${size('tabletLayout.gutter')};
    flex: 0 0 ${columnWidth(3, size('layout.gutter'))};
  }
`, 'left');
IntroInfo.displayName = 'IntroInfo';

const FormBottomSection = styled.div`
  margin-top: ${size('spacing.xLarge')};
`;

export default class DashboardCommunityAmenitiesForm extends Component {
  static propTypes = {
    currentValues: object,
    community: communityPropType,
    invalid: bool,
    canEdit: bool,
    submitting: bool,
    handleSubmit: func.isRequired,
  };

  render() {
    const {
      handleSubmit, invalid, submitting, canEdit, community,
    } = this.props;

    const isCommunityLarge = parseInt(community.propInfo.capacity || '0', 10) > 50;

    return (
      <Form onSubmit={handleSubmit}>
        <FormScrollSection>
          <Field
            name="propInfo.profileServices"
            type="checkbox"
            options={[{ value: 'Pet Friendly', label: 'Pet friendly' }]}
          />
        </FormScrollSection>

        {isCommunityLarge && (
          <Field
            name="propInfo.communitySpace"
            type="checkbox"
            options={familyOvernightOptions}
          />
        )}

        <Field
          name="propInfo.communitySpace"
          type="checkbox"
          options={communitySpaceOptions}
        />

        <Field
          name="propInfo.communitySpaceOther"
          label="Other"
          type="richtextarea"
          placeholder="More useful information about the community"
          options={communitySpaceOptions}
        />

        {canEdit && (
          <FormBottomSection>
            <StyledButton type="submit" disabled={invalid || submitting}>
              Save changes
            </StyledButton>
          </FormBottomSection>
        )}
      </Form>
    );
  }
}

