import React, { Component } from 'react';
import { Pressable } from 'react-native';
import styled from 'styled-components';
import { node, any, func } from 'prop-types';

import { isString } from 'sly/common/services/helpers/utils';
import { Text, View } from 'sly/mobile/components/atoms';

const StyledView = styled(View)`
  flex-direction: row;
  align-content: center;
`;

const shouldWrapWithText = c =>
  isString(c) || Number.isFinite(c);

export default class Root extends Component {
  static propTypes = {
    children: node,
    style: any,
    onClick: func,
  };

  withPressable(content) {
    const { onClick } = this.props;

    if (onClick) {
      // in mobiles onPress is equivalent of onClick
      return (
        <Pressable onPress={onClick}>
          {content}
        </Pressable>
      );
    }

    return content;
  }

  render() {
    const { children, style } = this.props;

    if (shouldWrapWithText(children)) {
      return this.withPressable(<Text {...this.props} />);
    }
    // wrap all children with Text, if required
    if (Array.isArray(children)) {
      return this.withPressable(
        <StyledView style={style}>
          {children.map(c => shouldWrapWithText(c) ? <Text key={c}>{c}</Text> : c)}
        </StyledView>,
      );
    }

    return this.withPressable(<StyledView {...this.props} />);
  }
}
