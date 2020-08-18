import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { string } from 'prop-types';
import { WebView } from 'react-native-webview';
import CookieManager from '@react-native-community/cookies';

import { apiUrl, host, isDev } from 'sly/common/config';

export default class Root extends Component {
  static propTypes = {
    src: string.isRequired,
  };

  state = {
    cookies: '',
    isLoadingCookies: true,
  };

  componentDidMount() {
    const { src } = this.props;
    this.shouldAddCookies = host.split('://').pop().includes(src.split('://').pop());

    if (this.shouldAddCookies) {
      CookieManager.get(apiUrl)
        .then((cookies) => {
          const cookieValues = Object.values(cookies).map(c => `${c.name}=${c.value}`).join('; ');
          this.setState({
            isLoadingCookies: false,
            cookies: cookieValues,
          });
        });
    }
  }

  render() {
    const { src, ...props } = this.props;
    const { cookies, isLoadingCookies } = this.state;

    if (this.shouldAddCookies && isLoadingCookies) {
      return (
        <ActivityIndicator
          size="large"
          style={{ flex: 1 }}
        />
      );
    }

    if (this.shouldAddCookies && isDev) {
      console.log('Passing cookies: ', cookies);
    }

    return (
      <WebView
        {...props}
        style={{ flex: 1 }}
        source={{
          uri: src,
          headers: {
            Cookie: cookies,
          },
        }}
        renderLoading={() => (
          <ActivityIndicator
            size="large"
          />
        )}
        startInLoadingState
        sharedCookiesEnabled
      />
    );
  }
}
