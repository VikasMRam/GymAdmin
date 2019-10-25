import React, { Component, Fragment } from 'react';
import { node } from 'prop-types';


import RetentionPopups from './RetentionPopups';

import ModalController from 'sly/controllers/ModalController';

export default class RetentionPopupsInstaller extends Component {
    static propTypes = {
      children: node,
    };
    render() {
      return (
        <Fragment>
          <ModalController>
            {({ show }) => {
              return  <RetentionPopups showModal={show} />;
            }}
          </ModalController>
          {this.props.children}
        </Fragment>
      );
    }
}
