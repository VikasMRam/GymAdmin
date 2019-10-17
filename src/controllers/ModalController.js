import { Component } from 'react';
import { string, func, bool, node } from 'prop-types';

import { connectController } from 'sly/controllers';

const mapStateToProps = (state, { controller = {} }) => ({
  isModalOpen: controller.isModalOpen,
  modalType: controller.modalType,
  isModalCloseable: controller.isModalCloseable,
  modalContent: controller.modalContent,
  modalOnClose: controller.modalOnClose,
});

@connectController(mapStateToProps)

export default class ModalController extends Component {
  static propTypes = {
    modalType: string,
    set: func,
    children: func,
    type: string,
    isModalOpen: bool,
    modalContent: node,
    modalOnClose: func,
    isModalCloseable: bool,
  };

  show = (content, onClose, modalType, isModalCloseable = true) => {
    const { set } = this.props;

    return set({
      isModalOpen: true,
      modalType,
      isModalCloseable,
      modalContent: content,
      modalOnClose: onClose,
    });
  };

  hide = () => {
    const { set } = this.props;

    // important: don't make modalContent & modalType empty so that close animation has content
    set({
      isModalOpen: false,
      modalOnClose: undefined,
    });
  };

  render() {
    const { show, hide } = this;
    const {
      children, modalType, modalContent, modalOnClose, isModalOpen, isModalCloseable,
    } = this.props;

    return children({
      show, hide, modalType, modalContent, modalOnClose, isModalOpen, isModalCloseable,
    });
  }
}
