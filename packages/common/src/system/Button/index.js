import React, { Component } from 'react';
import { func, bool, string, oneOf, oneOfType, object, element } from 'prop-types';
import { Link as RRLink } from 'react-router-dom';

import Block from 'sly/common/system/Block';
import { createRRAnchor } from 'sly/common/components/helpers';
import events from 'sly/web/services/events';
// todo: most probably should be common in future

const buttonBaseStyles = {
  minHeight: 'm',
  padding: 's l',
  font: 'body-m',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  cursor: 'pointer',
  textOverflow: 'ellipsis',
  ':focus': {
    outline: 'none',
  },
};

const getBackgrounds = (disabled, palette, [background, hover, active]) => {
  if (disabled) {
    return {
      background: `${palette}.lighter-60`,
    };
  }

  return {
    background,
    ':hover': {
      background: hover,
    },
    ':active': {
      background: active,
    },
  };
};

const getStyles = ({ variant, palette, disabled }) => {
  switch (variant) {
    case 'primary': return {
      ...buttonBaseStyles,
      color: 'white.base',
      border: 'round',
      ...getBackgrounds(disabled, palette, [
        `${palette}.base`,
        `${palette}.darker-20`,
        `${palette}.darker-40`,
      ]),
    };
    case 'secondary': return {
      ...buttonBaseStyles,
      color: `${palette}.base`,
      border: 'box',
      borderColor: 'currentColor',
      background: 'white.base',
      ':hover': {
        background: `${palette}.lighter-90`,
      },
      ':active': {
        background: `${palette}.lighter-80`,
      },
    };
    case 'neutral': return {
      ...buttonBaseStyles,
      color: 'slate.base',
      border: 'box',
      background: 'white.base',
      ':hover': {
        background: 'slate.lighter-95',
      },
      ':active': {
        background: 'slate.lighter-90',
      },
    };
    default: return null;
  }
};

const getTarget = (href) => {
  if (!href.match(/https?:\/\//)) {
    return {};
  }

  return {
    target: '_blank',
    rel: 'noopener',
  };
};

const RRLinkButton = createRRAnchor(Block);

export default class Button extends Component {
  static propTypes = {
    as: oneOfType([string, element]),
    disabled: bool,
    palette: string,
    variant: oneOf(['primary', 'secondary', 'neutral']),
    event: object,
    to: string,
    href: string,
    onClick: func,
  };

  static defaultProps = {
    as: 'button',
    palette: 'viridian',
    variant: 'primary',
  };

  getProps() {
    const {
      to, href: hrefprop, event, onClick: onClickProp, ...props
    } = this.props;

    const onClick = (...args) => {
      if (event) {
        events.track(event);
      }
      if (onClickProp) {
        return onClickProp(...args);
      }
      return null;
    };

    if (to && !to.match(/\/\//)) {
      return {
        ButtonComponent: RRLink,
        ...props,
        // flip the order on which we present the components
        component: RRLinkButton,
        to,
        onClick,
      };
    }

    const href = to || hrefprop;

    if (href) {
      return {
        ButtonComponent: Block,
        as: 'a',
        ...props,
        href,
        ...getTarget(href),
        onClick,
      };
    }

    return {
      ButtonComponent: Block,
      onClick,
      ...props,
    };
  }

  render() {
    const { ButtonComponent, ...props } = this.getProps();
    const sx = getStyles(props);
    return (
      <ButtonComponent _sx={sx} {...props} />
    );
  }
}
