import React, { Fragment, Component } from 'react';
import styled from 'styled-components';
import { createValidator, required, usPhone } from 'sly/services/validation';
import { reduxForm } from 'redux-form';
import { object, string, shape, func } from 'prop-types';
import voiceCallPropType from 'sly/propTypes/calls';
import { palette, size } from 'sly/components/themes';
import { Hr, Box } from 'sly/components/atoms';
import Tabs from 'sly/components/molecules/Tabs';
import DashboardTwoColumnTemplate from 'sly/components/templates/DashboardTwoColumnTemplate';
import DashboardAdminFamilyDetailsForm from 'sly/components/organisms/DashboardAdminFamilyDetailsForm';
import DashboardAdminSearchContainer from 'sly/containers/DashboardAdminSearchContainer';

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
    query: shape({
      phone: string,
      name: string,
      zip: string,
    }),
    handleCommunitySearch: func.isRequired,
  };

  render() {
    const { voiceCall, query, meta, handleCommunitySearch } = this.props;

    if (!voiceCall) {
      return (
        <DashboardTwoColumnTemplate activeMenuItem="My Families">
          Loading...
        </DashboardTwoColumnTemplate>
      );
    }
    // const voiceFilter = { twilioNumber: voiceCall.toNumber };
    return (
      <Fragment>
        <DashboardTwoColumnTemplate>
          <Box><ReduxForm {...meta} /></Box>
          <DashboardAdminSearchContainer query={query} handleCommunitySearch={handleCommunitySearch} />
        </DashboardTwoColumnTemplate>
      </Fragment>
    );
  }
}
