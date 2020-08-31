import React from 'react';
import { Dimensions } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import Iframe from '.';

import { View } from 'sly/mobile/components/atoms';

const { width, height } = Dimensions.get('window');

const WrappedIframe = props => (
  <View style={{ width, height }}>
    <Iframe {...props} />
  </View>
);

storiesOf('Common|Atoms/Iframe', module)
  .add('default', () => <WrappedIframe src="https://stackoverflow.com" />)
  .add('width', () => <WrappedIframe src="https://stackoverflow.com" width="50%" />);
