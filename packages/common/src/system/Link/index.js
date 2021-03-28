import React, { Component } from 'react';
import { string, object } from 'prop-types';
import { Link as RRLink } from 'react-router-dom';

import Block from 'sly/common/system/Block';

import { palette as palettePropType } from 'sly/common/propTypes/palette';
import { variation as variationPropType } from 'sly/common/propTypes/variation';
import { createRRAnchor } from 'sly/common/components/helpers';
import { addEventToUrl } from 'sly/web/services/helpers/queryParamEvents';

const RRLinkAnchor = createRRAnchor(Block);

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

  static displayName = 'Link';

  checkPropsForLinks() {
    const { to, href: hrefprop, event, ...props } = this.props;

    if (to && !to.match(/\/\//)) {
      return {
        ...props,
        // flip the order on which we present the components
        LinkComponent: RRLink,
        component: RRLinkAnchor,
        to: addEventToUrl(to, event),
      };
    }

    const href = to || hrefprop;
    const target = href && href.match(/\/\//)
      ? { target: '_blank', rel: 'noopener' }
      : {};
    return {
      LinkComponent: Block,
      ...props,
      ...target,
      href: addEventToUrl(href, event),
    };
  }

  render() {
    const { LinkComponent, ...props } = this.checkPropsForLinks();
    return <LinkComponent as="a" color="viridian.base" {...props} />;
  }
}
