import React from 'react';
import { Dimensions } from 'react-native';

import { host } from 'sly/mobile/config';
import { Iframe } from 'sly/common/components/atoms';
import { View } from 'sly/mobile/components/atoms';

const { height } = Dimensions.get('window');

const DashboardScreen = () => (
  <View style={{ width: '100%', height }}>
    <Iframe src={host} />
  </View>
);

export default DashboardScreen;
