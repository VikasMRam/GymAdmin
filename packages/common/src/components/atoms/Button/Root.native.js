import React, { Component } from 'react';
import { Platform, TouchableNativeFeedback } from 'react-native';
import { string, bool } from 'prop-types';
import styled from 'styled-components';

import styles, { textStyles } from './styles';

import { getKey } from 'sly/common/components/themes';
import { Text, View } from 'sly/mobile/components/atoms';

export const defaultBorderProp = 'large';

const StyledText = styled(Text)`
  ${textStyles}
  background: transparent;
  text-align: center;
`;

const StyledTouchableNativeFeedbackView = styled(View)`
  ${styles}
`;

const StyledTouchableHighlight = styled.TouchableHighlight`
  ${styles}
`;

const activeBackgroundColor = ({ disabled, ghost, transparent, background }) =>
  !disabled && !ghost && !transparent && getKey('palette', background, 'filler');

const systemButtonOpacity = 0.2;

const touchablePropsToPreserve = [
  'onPress',
  'onPressIn',
  'onPressOut',
  'onLongPress',
  'delayPressIn',
  'delayPressOut',
  'delayLongPress',
];

export default class Root extends Component {
  static propTypes = {
    children: string,
    disabled: bool,
    selectable: bool,
  };

  static defaultProps = {
    selectable: false,
  };

  initialTouchableProps = {};

  constructor(props) {
    super(props);

    Object.keys(props).forEach((p) => {
      if (touchablePropsToPreserve.includes(p)) {
        this.initialTouchableProps[p] = props[p];
      }
    });
  }

  computeActiveOpacity() {
    return this.props.disabled ? 1 : systemButtonOpacity;
  }

  getTouchableProps() {
    const { disabled } = this.props;
    const touchableProps = {
      activeOpacity: this.computeActiveOpacity(),
    };

    if (disabled) {
      touchableProps.onPress = null;
      touchableProps.onPressIn = null;
      touchableProps.onPressOut = null;
      touchableProps.onLongPress = null;
      touchableProps.delayPressIn = null;
      touchableProps.delayPressOut = null;
      touchableProps.delayLongPress = null;
    } else {
      Object.keys(this.initialTouchableProps).forEach((p) => {
        touchableProps[p] = this.initialTouchableProps[p];
      });
    }

    return touchableProps;
  }

  render() {
    const { selectable, ...props } = this.props;
    const touchableProps = this.getTouchableProps();

    // currentcolor is not supported by native, so replace it with
    // palette which is the current text colour
    if (props.borderPalette === 'currentcolor') {
      props.borderPalette = props.palette;
    }
    props.selectable = selectable;

    if (Platform.OS === 'ios') {
      touchableProps.underlayColor = activeBackgroundColor(props);

      return (
        <StyledTouchableHighlight
          {...props}
          {...touchableProps}
          accessibilityLabel={props.children}
          accessibilityRole="button"
        >
          <StyledText {...props} />
        </StyledTouchableHighlight>
      );
    }

    return (
      <StyledTouchableNativeFeedbackView {...props}>
        <TouchableNativeFeedback
          {...touchableProps}
          accessibilityLabel={props.children}
          accessibilityRole="button"
        >
          <StyledText {...props} />
        </TouchableNativeFeedback>
      </StyledTouchableNativeFeedbackView>
    );
  }
}
