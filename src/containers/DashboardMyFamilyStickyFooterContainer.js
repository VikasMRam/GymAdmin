import React, { Component } from 'react';
import { string, arrayOf, bool, object } from 'prop-types';

import ModalController from 'sly/controllers/ModalController';
import OptionsList from 'sly/components/molecules/OptionsList';
import DashboardMyFamilyStickyFooter from 'sly/components/organisms/DashboardMyFamilyStickyFooter';

class DashboardMyFamilyStickyFooterContainer extends Component {
  static propTypes = {
    stage: string,
    options: arrayOf(object).isRequired,
    showAcceptRejectButtons: bool,
  };

  handleOptionsClick = (show) => {
    const { options } = this.props;
    show(<OptionsList options={options} />, null, 'bottomDrawer');
  };

  render() {
    const { stage, options, showAcceptRejectButtons } = this.props;

    return (
      <ModalController>
        {({ show }) => (
          <DashboardMyFamilyStickyFooter
            stage={stage}
            options={options}
            showAcceptRejectButtons={showAcceptRejectButtons}
            onOptionsClick={() => this.handleOptionsClick(show)}
            onBlur={this.handleOnBlur}
          />
        )}
      </ModalController>
    );
  }
}

export default DashboardMyFamilyStickyFooterContainer;
