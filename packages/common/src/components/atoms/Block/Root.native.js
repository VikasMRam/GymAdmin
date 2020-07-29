import React from 'react';
import styled from 'styled-components';
import { node, any } from 'prop-types';

import { isString } from 'sly/common/services/helpers/utils';
import { Text, View } from 'sly/mobile/components/atoms';

const StyledView = styled(View)`
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
      <StyledView style={props.style}>
        {props.children.map(c => c && isString(c) ? <Text key={c}>{c}</Text> : c)}
      </StyledView>
    );
  }

  return <StyledView {...props} />;
};

Root.propTypes = {
  children: node,
  style: any,
};

export default Root;
