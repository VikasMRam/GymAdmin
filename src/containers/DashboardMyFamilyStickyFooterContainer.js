import React, { Component } from 'react';
import { string, arrayOf, shape, bool } from 'prop-types';

import DashboardMyFamilyStickyFooter from 'sly/components/organisms/DashboardMyFamilyStickyFooter/index';

class DashboardMyFamilyStickyFooterContainer extends Component {
  static propTypes = {
    stage: string,
    options: arrayOf(shape({})),
    showAcceptRejectButtons: bool,
  };

  state = {
    showOptions: false,
  };

  handleOptionsClick = () => {
    const { showOptions } = this.state;
    this.setState({ showOptions: !showOptions });
  }
  render() {
    const { showOptions } = this.state;
    const { stage, options, showAcceptRejectButtons } = this.props;
    return (
      <DashboardMyFamilyStickyFooter
        stage={stage}
        options={options}
        showOptions={showOptions}
        showAcceptRejectButtons={showAcceptRejectButtons}
        onOptionsClick={this.handleOptionsClick}
      />
    );
  }
}

export default DashboardMyFamilyStickyFooterContainer;
