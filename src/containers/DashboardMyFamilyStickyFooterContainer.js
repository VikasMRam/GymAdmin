import React, { Component } from 'react';
import { arrayOf, shape } from 'prop-types';

import DashboardMyFamilyStickyFooter from 'sly/components/organisms/DashboardMyFamilyStickyFooter/index';

class DashboardMyFamilyStickyFooterContainer extends Component {
  propTypes = {
    stageProps: arrayOf(shape({})),
    options: arrayOf(shape({})),
  }
  state = {
    showOptions: false,
  }
  handleOptionsClick = () => {
    const { showOptions } = this.state;
    this.setState({ showOptions: !showOptions });
  }
  render() {
    const { showOptions } = this.state;
    const { stageProps, options } = this.props;
    return (
      <DashboardMyFamilyStickyFooter
        stageProps={stageProps}
        options={options}
        showOptions={showOptions}
        onOptionsClick={this.handleOptionsClick}
      />
    );
  }
}

export default DashboardMyFamilyStickyFooterContainer;
