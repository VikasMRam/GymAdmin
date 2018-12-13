import { Component } from 'react';
import { string, func } from 'prop-types';

import { connectController } from 'sly/controllers';

class ModalController extends Component {
  static propTypes = {
    modalType: string,
    set: func,
    children: func,
  };

  show = (type) => {
    if (!type) {
      throw new Error('A modal type is required');
    }
    const { set } = this.props;

    return set({
      modalType: type,
    });
  };

  hide = () => {
    const { set } = this.props;

    set({
      modalType: null,
    });
  };

  render() {
    const { show, hide } = this;
    const { children, modalType } = this.props;

    return children({
      show, hide, modalType,
    });
  }
}

const mapStateToProps = (state, { controller = {} }) => ({
  modalType: controller.modalType,
});

export default connectController(mapStateToProps)(ModalController);
