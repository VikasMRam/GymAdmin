import { Component } from 'react';
import { string, func, any } from 'prop-types';

import { connectController } from 'sly/controllers';

class ModalController extends Component {
  static propTypes = {
    modalType: string,
    modalEntity: any,
    set: func,
    children: func,
  };

  show = (type, modalEntity) => {
    if (!type) {
      throw new Error('A modal type is required');
    }
    const { set } = this.props;

    return set({
      modalType: type,
      modalEntity,
    });
  };

  hide = () => {
    const { set } = this.props;

    set({
      modalType: null,
      modalEntity: null,
    });
  };

  render() {
    const { show, hide } = this;
    const { children, modalType, modalEntity } = this.props;

    return children({
      show, hide, modalType, modalEntity,
    });
  }
}

const mapStateToProps = (state, { controller = {} }) => ({
  modalType: controller.modalType,
  modalEntity: controller.modalEntity,
});

export default connectController(mapStateToProps)(ModalController);
