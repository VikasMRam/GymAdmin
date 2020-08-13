import React, { Component, Children } from 'react';
import { Pressable } from 'react-native';
import styled from 'styled-components';
import { node, any, func } from 'prop-types';

import { isString, objectFilter } from 'sly/common/services/helpers/utils';
import { withWidth } from 'sly/common/components/helpers';
import { Text, View } from 'sly/mobile/components/atoms';

const StyledPressable = styled(Pressable)`
  ${withWidth}
`;

const StyledView = styled(View)`
  flex-direction: row;
  align-content: center;
`;

const shouldWrapWithText = c =>
  isString(c) || Number.isFinite(c);

const pressableProps = [
  'onPress',
  'onPressIn',
  'onPressOut',
  'onLongPress',
  'delayLongPress',
];

export default class Root extends Component {
  static propTypes = {
    children: node,
    style: any,
    onClick: func,
    flex: any,
    width: any,
  };

  withPressable(content) {
    const { onClick, flex, width } = this.props;
    const providedPressableProps = objectFilter(this.props, pressableProps);

    if (onClick || Object.keys(providedPressableProps).length) {
      // in mobiles onPress is equivalent of onClick
      return (
        // apply dimension props like flex, width as passed
        <StyledPressable onPress={onClick} flex={flex} width={width} {...providedPressableProps}>
          {content}
        </StyledPressable>
      );
    }

    return content;
  }

  render() {
    const { children, style } = this.props;
    const allChildrenText =
      Children.toArray(children).reduce((acc, c) => acc && shouldWrapWithText(c), true);

    if (shouldWrapWithText(children) || allChildrenText) {
      let newChildren = children;

      // if all children are Text, concat into one
      if (allChildrenText) {
        newChildren = Children.toArray(children).join('');
      }

      return this.withPressable(<Text {...this.props}>{newChildren}</Text>);
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
