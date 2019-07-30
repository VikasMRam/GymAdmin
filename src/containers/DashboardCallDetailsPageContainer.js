import React, { Fragment, Component } from 'react';
import { string, object } from 'prop-types';
import { prefetch, query } from 'sly/services/newApi';
import DashboardCallDetailsPage from 'sly/components/pages/DashboardCallDetailsPage';


@prefetch('voiceCall', 'getVoiceCall', (req, { match }) => req({
  id: match.params.id,
}))

export default class DashboardCallDetailsPageContainer extends Component {
  static propTypes = {
    id: string,
    voiceCall: object,
  };

  state = {
    name: null,
    zip: null,
  };

  handleCommunitySearch = ({ name, zip }) => {
    console.log("this is called, all the way from parent", name,zip);
    this.setState({ name, zip });
  };

  render() {
    const { voiceCall } = this.props;
    if (!voiceCall) {
      return <div>Loading...</div>;
    }

    const { name, zip } = this.state;

    const query = (!name && !zip) ? ({ phone: voiceCall.toNumber }) : ({ name, zip });

    const meta = {
      lookingFor: [], gender: ['Female', 'Male'], timeToMove: ['1+ Months'], monthlyBudget: [],
    };

    return (
      <DashboardCallDetailsPage meta={meta} voiceCall={voiceCall} query={query} handleCommunitySearch={this.handleCommunitySearch} />
    );
  }
}
