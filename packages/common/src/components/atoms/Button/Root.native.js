import React, { Component } from 'react';
import { string, bool } from 'prop-types';

import { Block } from 'sly/common/components/atoms';

const systemButtonOpacity = 0.7;

const pressablePropsToPreserve = [
  'onPress',
  'onPressIn',
  'onPressOut',
  'onLongPress',
  'delayLongPress',
];

export default class Root extends Component {
  static propTypes = {
    children: string,
    disabled: bool,
    selectable: bool,
    palette: string,
    variation: string,
    clamped: bool,
  };

  static defaultProps = {
    selectable: false,
  };

  initialPressableProps = {};

  constructor(props) {
    super(props);

    Object.keys(props).forEach((p) => {
      if (pressablePropsToPreserve.includes(p)) {
        this.initialPressableProps[p] = props[p];
      }
    });
  }

  computeOpacity() {
    return this.props.disabled ? systemButtonOpacity : 1;
  }

  getPressableProps() {
    const { disabled } = this.props;
    const pressableProps = {
      opacity: this.computeOpacity(),
    };

    if (disabled) {
      pressableProps.onPress = null;
      pressableProps.onPressIn = null;
      pressableProps.onPressOut = null;
      pressableProps.onLongPress = null;
      pressableProps.delayLongPress = null;
    } else {
      Object.keys(this.initialPressableProps).forEach((p) => {
        pressableProps[p] = this.initialPressableProps[p];
      });
    }

    return pressableProps;
  }

  render() {
    const {
      selectable,
      palette,
      variation,
      children,
      clamped,
      ...props
    } = this.props;
    const pressableProps = this.getPressableProps();

    props.selectable = selectable;

    return (
      <Block
        width="100%"
        {...props}
        {...pressableProps}
        // currentcolor is not supported by native, so replace it with
        // palette which is the current text colour
        borderPalette={props.borderPalette === 'currentcolor' ? palette : props.borderPalette}
        borderVariation={props.borderPalette === 'currentcolor' ? variation : props.borderVariation}
      >
        <Block numberOfLines={1} width="100%" align="center" palette={palette} variation={variation}>
          {children}
        </Block>
      </Block>
    );
  }
}
