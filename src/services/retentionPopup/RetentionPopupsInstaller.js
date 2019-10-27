import React, { Component, Fragment } from 'react';
import { node } from 'prop-types';


import RetentionPopups from './RetentionPopup';

import ModalController from 'sly/controllers/ModalController';

export default class RetentionPopupsInstaller extends Component {
  static propTypes = {
    children: node,
  };
  render() {
    return (
      <Fragment>
        <ModalController>
          {({ show, hide }) => {
            return <RetentionPopups showModal={show} hideModal={hide} />;
          }}
        </ModalController>
        {this.props.children}
      </Fragment>
    );
  }
}
