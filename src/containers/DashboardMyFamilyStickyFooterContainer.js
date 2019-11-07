import React, { Component } from 'react';
import { string, arrayOf, bool, object, func } from 'prop-types';

import withModal from 'sly/controllers/withModal';
import OptionsList from 'sly/components/molecules/OptionsList';
import DashboardMyFamilyStickyFooter from 'sly/components/organisms/DashboardMyFamilyStickyFooter';

@withModal

export default class DashboardMyFamilyStickyFooterContainer extends Component {
  static propTypes = {
    stage: string,
    stageLabel: string,
    options: arrayOf(object),
    showAcceptRejectButtons: bool,
    showModal: func.isRequired,
  };

  handleOptionsClick = () => {
    const { options, showModal } = this.props;

    showModal(<OptionsList options={options} />, null, 'bottomDrawer');
  };

  render() {
    const {
      stage, stageLabel, options, showAcceptRejectButtons,
    } = this.props;

    return (
      <DashboardMyFamilyStickyFooter
        stage={stage}
        stageLabel={stageLabel}
        options={options}
        showAcceptRejectButtons={showAcceptRejectButtons}
        onOptionsClick={this.handleOptionsClick}
      />
    );
  }
}
