import React, { Fragment, Component } from 'react';
import styled from 'styled-components';



import { createValidator, required, usPhone } from 'sly/services/validation';
import { reduxForm } from 'redux-form';
import { object } from 'prop-types';

import voiceCallPropType from 'sly/propTypes/calls';

import { palette, size } from 'sly/components/themes';
import { Hr } from 'sly/components/atoms';
import Tabs from 'sly/components/molecules/Tabs';

import DashboardTwoColumnTemplate from 'sly/components/templates/DashboardTwoColumnTemplate';
import DashboardAdminFamilyDetailsForm from 'sly/components/organisms/DashboardAdminFamilyDetailsForm';

import DashboardCallDetailsAgentInfoContainer from 'sly/containers/DashboardCallDetailsAgentInfoContainer';
import SearchBoxContainer from 'sly/containers/SearchBoxContainer';

const validate = createValidator({
  name: [required],
  phone: [required, usPhone],
  residentName: [required],
  lookingFor: [required],
  gender: [required],
  preferredLocation: [required],
  budget: [required],
  timeToMove: [required],
});

const ReduxForm = reduxForm({
  form: 'DashboardAdminFamilyDetailsForm',
  validate,
})(DashboardAdminFamilyDetailsForm);

const StyledTabs = styled(Tabs)`
  background-color: ${palette('white', 'base')};
  > :first-child {
    text-transform: uppercase;
  }
`;

const DetailsTab = styled.div`
  width: ${size('layout.col4')};
  margin: auto;
  padding: ${size('spacing.xxxLarge')} ${size('spacing.large')};
`;

const FamilyDetailsTab = styled.div`
  padding: ${size('spacing.xLarge')};
`;
const BigScreenSummarySection = styled.section`
  display: none;

  > * {
    background-color: ${palette('white', 'base')};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: block;
  }
`;

export default class DashboardCallDetailsPage extends Component {
  static propTypes = {
    meta: object,
    voiceCall: voiceCallPropType.isRequired,
  }
  render() {
    const { voiceCall, meta } = this.props;
    console.log('Seeing voice vall here',voiceCall);
    if (!voiceCall) {
      return (
        <DashboardTwoColumnTemplate activeMenuItem="My Families">
          Loading...
        </DashboardTwoColumnTemplate>
      );
    }
    return (
      <Fragment>
        <DashboardTwoColumnTemplate>
          <ReduxForm {...meta} />
          <StyledTabs activeTab="fDetails">
            <DetailsTab id="fDetails" label="FIrst">
              Some Details
            </DetailsTab>
            <div id="searchTab" label="Search"><SearchBoxContainer> </SearchBoxContainer></div>
            <div id= "callDetails" label="Third">{voiceCall.toNumber} </div>
          </StyledTabs>
        </DashboardTwoColumnTemplate>
      </Fragment>
    );
  }
}
