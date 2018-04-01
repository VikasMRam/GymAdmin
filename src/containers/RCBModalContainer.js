import React, { Component } from 'react';
import { connect } from 'react-redux';

import RCBModal from 'sly/components/organisms/RCBModal';

export default class RCBModalContainer extends Component {
  render() {
    const props = this.props;
    return <RCBModal {...props} />;
  }
}

//export default connect()(RCBModalContainer);

