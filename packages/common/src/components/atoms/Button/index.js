import React, { Component } from 'react';
import { bool, string, oneOf, object } from 'prop-types';

import RRLink from './RRLink';
import Root from './Root';
import withSendEvent from './withSendEvent';

import { routes as routesPropType } from 'sly/web/propTypes/routes';
import { palette as palettePropType } from 'sly/common/propTypes/palette';
import { variation as variationPropType } from 'sly/common/propTypes/variation';
import { createRRAnchor } from 'sly/common/components/helpers';
import isPathInRoutes from 'sly/common/services/helpers/isPathInRoutes';
import { addEventToUrl } from 'sly/web/services/helpers/queryParamEvents';

const getTarget = (href) => {
  if (!href.match(/https?:\/\//)) {
    return {};
  }

  return {
    target: '_blank',
    rel: 'noopener',
  };
};

const RRLinkButton = createRRAnchor(Root);

export default class Button extends Component {
  static propTypes = {
    disabled: bool,
    ghost: bool,
    secondary: bool,
    transparent: bool,
    borderPalette: palettePropType,
    background: palettePropType,
    palette: palettePropType,
    backgroundVariation: variationPropType,
    kind: oneOf(['jumbo', 'regular', 'tab', 'label', 'plain']),
    selected: bool,
    type: string,
    to: string,
    event: object,
    href: string,
  };

  static defaultProps = {
    palette: 'white',
    background: 'primary',
    kind: 'regular',
    type: 'button',
    border: 'regular',
    borderPalette: 'transparent',
    borderVariation: 'stroke',
    borderRadius: 'small',
    size: 'caption',
    lineHeight: 'title',
    padding: ['medium', 'large'],
  };

  static contextTypes = {
    routes: routesPropType,
  };

  getStyleProps() {
    const {
      kind,
      secondary,
      ghost,
      borderPalette,
      disabled,
      selected,
      transparent,
      background,
      backgroundVariation,
      palette: paletteProp,
    } = this.props;
    const props = {};

    // border styles
    if (secondary) {
      props.borderPalette = 'slate';
      props.borderVariation = 'stroke';
    } else if (ghost) {
      if (borderPalette !== 'transparent' && disabled) {
        props.borderVariation = 'filler';
      } else if (borderPalette === 'transparent') {
        props.borderPalette = 'currentcolor';
      }
    }

    // text styles, padding & margin styles
    // TODO: Check with Jared and correct Line heights of Buttons Texts
    if (kind === 'jumbo') {
      props.size = 'body';
      props.lineHeight = 'body';
      props.padding = ['large', 'xxLarge'];
    } else if (kind === 'tab') {
      props.lineHeight = 'caption';
      props.padding = ['regular', 'large'];
    } else if (kind === 'label') {
      props.padding = ['0', 'large'];
    }
    if (ghost) {
      if (secondary) {
        props.palette = 'grey';
        props.variation = disabled ? 'filler' : 'base';
      } else if (disabled) {
        props.palette = 'primary';
        props.variation = 'filler';
      } else if (paletteProp === 'white') {
        props.palette = background;
        props.variation = backgroundVariation;
      }
    } else if (transparent && paletteProp === 'white') {
      props.palette = 'none';
    } else if (secondary) {
      props.palette = 'slate';
      props.variation = disabled ? 'filler' : 'base';
    } else if (selected) {
      props.palette = 'slate';
    }

    // background styles
    if (ghost) {
      if (selected) {
        props.background = paletteProp !== 'white' ? paletteProp : background;
        props.backgroundVariation = 'stroke';
      } else {
        props.background = 'white';
        props.backgroundVariation = 'base';
      }
    } else if (transparent) {
      props.background = 'transparent';
    } else if (secondary) {
      props.background = 'grey';
      props.backgroundVariation = 'background';
    } else if (disabled) {
      props.backgroundVariation = 'filler';
    }

    return props;
  }

  getProps() {
    const {
      to, href: hrefprop, event, ...props
    } = this.props;
    const { routes } = this.context;
    const styleProps = this.getStyleProps();

    if (to && isPathInRoutes(routes, to)) {
      return {
        ButtonComponent: RRLink,
        ...props,
        ...styleProps,
        // flip the order on which we present the components
        component: RRLinkButton,
        to: addEventToUrl(to, event),
      };
    }

    const href = to || hrefprop;

    if (href) {
      return {
        ButtonComponent: Root,
        ...props,
        ...styleProps,
        as: 'a',
        href: addEventToUrl(href, event),
        ...getTarget(href),
      };
    }

    return {
      ButtonComponent: Root,
      ...props,
      ...styleProps,
      ...withSendEvent(event, props),
    };
  }

  render() {
    const { ButtonComponent, ...props } = this.getProps();
    return <ButtonComponent {...props} />;
  }
}
