import React, { Component } from 'react';
import { Platform } from 'react-native';
import { string, bool } from 'prop-types';
import styled from 'styled-components';

import styles, { textStyles } from './styles';

import { getKey } from 'sly/common/components/themes';
import { Text } from 'sly/mobile/components/atoms';

export const defaultBorderProp = 'large';

const StyledText = styled(Text)`
  ${textStyles}
  background: transparent;
  text-align: center;
`;

const StyledTouchableNativeFeedback = styled.TouchableNativeFeedback`
  ${styles}
`;

const StyledTouchableHighlight = styled.TouchableHighlight`
  ${styles}
`;

const activeBackgroundColor = ({ disabled, ghost, transparent, background }) =>
  !disabled && !ghost && !transparent && getKey('palette', background, 'filler');

const systemButtonOpacity = 0.2;

export default class Root extends Component {
  static propTypes = {
    children: string,
    disabled: bool,
    selectable: bool,
  };

  static defaultProps = {
    selectable: false,
  };

  computeActiveOpacity() {
    return this.props.disabled ? 1 : systemButtonOpacity;
  }

  render() {
    const { disabled, selectable, ...props } = this.props;
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
    }

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
      <StyledTouchableNativeFeedback
        {...props}
        {...touchableProps}
        accessibilityLabel={props.children}
        accessibilityRole="button"
      >
        <StyledText {...props} />
      </StyledTouchableNativeFeedback>
    );
  }
}
