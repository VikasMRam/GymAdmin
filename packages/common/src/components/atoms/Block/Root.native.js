import React from 'react';
import styled from 'styled-components';
import { node } from 'prop-types';

import { isString } from 'sly/common/services/helpers/utils';

const Text = styled.Text``;
const View = styled.View``;

const Root = props =>
  isString(props.children) ? <Text {...props} /> : <View {...props} />;

Root.propTypes = {
  children: node,
};

export default Root;
