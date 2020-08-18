import React, { Component } from 'react';
import { Linking } from 'react-native';
import { string } from 'prop-types';

import Block from 'sly/common/components/atoms/Block';

export default class Root extends Component {
  static propTypes = {
    href: string,
  };

  openBrowser = () => {
    const { href } = this.props;

    if (href) {
      Linking.canOpenURL(href)
        .catch(e => console.error(e))
        .then((supported) => {
          if (supported) {
            Linking.openURL(href);
          } else {
            console.log(`Don't know how to open URI: ${href}`);
          }
        });
    }
  };

  render() {
    return <Block {...this.props} onPress={this.openBrowser} />;
  }
}
