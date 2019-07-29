import React, { Component } from 'react';
import { string, arrayOf, bool, object } from 'prop-types';

import DashboardMyFamilyStickyFooter from 'sly/components/organisms/DashboardMyFamilyStickyFooter';

class DashboardMyFamilyStickyFooterContainer extends Component {
  static propTypes = {
    stage: string,
    options: arrayOf(object),
    showAcceptRejectButtons: bool,
  };

  state = {
    showOptions: false,
  };

  handleOptionsClick = () => {
    const { showOptions } = this.state;
    this.setState({ showOptions: !showOptions });
  };

  handleOnBlur = () => {
    this.setState({ showOptions: false });
  };

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
        onBlur={this.handleOnBlur}
      />
    );
  }
}

export default DashboardMyFamilyStickyFooterContainer;
