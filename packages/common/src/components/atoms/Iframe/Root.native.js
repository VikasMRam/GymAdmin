import React from 'react';
import { ActivityIndicator } from 'react-native';
import { string } from 'prop-types';
import { WebView } from 'react-native-webview';

const Root = ({ src, ...props }) => (
  <WebView
    {...props}
    style={{ flex: 1 }}
    source={{ uri: src }}
    renderLoading={() => (
      <ActivityIndicator
        size="large"
      />
    )}
    startInLoadingState
  />
);

Root.propTypes = {
  src: string.isRequired,
};

export default Root;
