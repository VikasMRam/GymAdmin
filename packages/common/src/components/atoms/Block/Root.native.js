import React from 'react';
import styled from 'styled-components';
import { node, any } from 'prop-types';

import { isString } from 'sly/common/services/helpers/utils';

const Text = styled.Text``;
const View = styled.View`
  flex-direction: row;
  align-content: center;
`;

const Root = (props) => {
  if (isString(props.children)) {
    return <Text {...props} />;
  }
  // wrap all string children with Text
  if (Array.isArray(props.children)) {
    return (
      <View style={props.style}>
        {props.children.map(c => c && isString(c) ? <Text key={c}>{c}</Text> : c)}
      </View>
    );
  }

  return <View {...props} />;
};

Root.propTypes = {
  children: node,
  style: any,
};

export default Root;
