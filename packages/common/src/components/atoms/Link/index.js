import React, { Component } from 'react';
import { string, object } from 'prop-types';

import Root from './Root';

import { palette as palettePropType } from 'sly/common/propTypes/palette';
import { variation as variationPropType } from 'sly/common/propTypes/variation';
import { routes as routesPropType } from 'sly/common/propTypes/routes';
import { createRRAnchor, RRLink } from 'sly/common/components/helpers';
import isPathInRoutes from 'sly/common/services/helpers/isPathInRoutes';
import { addEventToUrl } from 'sly/web/services/helpers/queryParamEvents';

const RRLinkAnchor = createRRAnchor(Root);

export default class Link extends Component {
  static propTypes = {
    to: string,
    href: string,
    palette: palettePropType,
    variation: variationPropType,
    event: object,
  };

  static defaultProps = {
    palette: 'primary',
    variation: 'base',
    textDecoration: 'none',
    cursor: 'pointer',
  };

  static contextTypes = {
    routes: routesPropType,
  };

  static displayName = 'Link';

  checkPropsForLinks() {
    const { to, href: hrefprop, event, ...props } = this.props;
    const { routes } = this.context;

    if (to && isPathInRoutes(routes, to)) {
      return {
        ...props,
        // flip the order on which we present the components
        LinkComponent: RRLink,
        component: RRLinkAnchor,
        to: addEventToUrl(to, event),
      };
    }

    const href = to || hrefprop;
    const target = href && href.match(/https?:\/\//)
      ? { target: '_blank', rel: 'noopener' }
      : {};
    return {
      LinkComponent: Root,
      ...props,
      ...target,
      href: addEventToUrl(href, event),
    };
  }

  render() {
    const { LinkComponent, ...props } = this.checkPropsForLinks();
    return <LinkComponent {...props} />;
  }
}