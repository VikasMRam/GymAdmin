import React, { Component } from 'react';
import styled from 'styled-components';
import { Link as RRLink } from 'react-router-dom';
import { string, bool, func, object } from 'prop-types';
import { ifNotProp } from 'styled-tools';

import { palette } from 'sly/web/components/themes';
import { palette as palettePropType } from 'sly/web/propTypes/palette';
import { routes as routesPropType } from 'sly/web/propTypes/routes';
import { variation as variationPropType } from 'sly/web/propTypes/variation';
import isPathInRoutes from 'sly/web/services/helpers/isPathInRoutes';
import { addEventToUrl } from 'sly/web/services/helpers/queryParamEvents';
import { withColor, withText, withSpacing, withDisplay, withBorder, withZIndex } from 'sly/web/components/helpers';

// eslint-disable-next-line jsx-a11y/anchor-has-content
export const Anchor = styled.a`
  ${withDisplay}
  ${withSpacing}
  ${withText}
  ${withBorder}
  ${withZIndex}
  
  &, &:active {
    ${withColor} 
  }
  
  text-decoration: none;

  &:hover {
    color: ${ifNotProp('noHoverColorChange', palette('filler'))};
    cursor: pointer;
  }

 
  &:focus {
    outline: none;
  }
`;

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

// hack to avoid non html props passed down
const A = styled.a``;

export const LinkAnchor = React.forwardRef(({ navigate, onClick, ...rest }, ref) => {
  const { target } = rest;

  const props = {
    ...rest,
    onClick: (event) => {
      try {
        if (onClick) onClick(event);
      } catch (ex) {
        event.preventDefault();
        throw ex;
      }

      if (
        !event.defaultPrevented && // onClick prevented default
        event.button === 0 && // ignore everything but left clicks
        (!target || target === '_self') && // let browser handle "target=_blank" etc.
        !isModifiedEvent(event) // ignore clicks with modifier keys
      ) {
        event.preventDefault();
        navigate();
      }
    },
  };

  return <A ref={ref} {...props} />;
});

LinkAnchor.propTypes = {
  navigate: func,
  onClick: func,
};

export default class Link extends Component {
  static propTypes = {
    to: string,
    href: string,
    palette: palettePropType,
    variation: variationPropType,
    noHoverColorChange: bool,
    event: object,
  };

  static defaultProps = {
    palette: 'primary',
    variation: 'base',
  };

  static contextTypes = {
    routes: routesPropType,
  };

  checkPropsForLinks() {
    const { to, href: hrefprop, event, ...props } = this.props;
    const { routes } = this.context;

    if (to && isPathInRoutes(routes, to)) {
      return {
        ...props,
        // flip the order on which we present the components
        as: RRLink,
        component: LinkAnchor,
        to: addEventToUrl(to, event),
      };
    }

    const href = to || hrefprop;
    const target = href && href.match(/https?:\/\//)
      ? { target: '_blank', rel: 'noopener' }
      : {};
    return {
      ...props,
      ...target,
      href: addEventToUrl(href, event),
    };
  }

  render() {
    const props = this.checkPropsForLinks();
    return <Anchor {...props} />;
  }
}
