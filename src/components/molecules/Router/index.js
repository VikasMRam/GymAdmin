import React, { Component } from 'react';
import { func, object, node, bool } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { stringify, parse } from 'query-string';

import {
  parseURLQueryParams,
  removeQueryParamFromURL,
} from 'sly/services/helpers/url';
import { withAuth } from 'sly/services/newApi';
import SlyEvent from 'sly/services/helpers/events';
import RefreshRedirect from 'sly/components/common/RefreshRedirect';
import { isServer } from 'sly/config';

const searchWhitelist = [
  'page-number',
  'page-size',
];

const pathnameBlacklist = [
  /^\/our-history/,
];

const blacklisted = (from, to) => pathnameBlacklist
  .some(re => from.match(re) && to.match(re));

const bumpOnSearch = (prev, next) => searchWhitelist
  .some(key => next[key] !== prev[key]);

@withAuth

@withRouter

export default class Router extends Component {
  static propTypes = {
    requiresAuth: bool,
    location: object,
    children: node,
    enableEvents: bool,
    status: object,
    history: object,
    staticContext: object,
    authenticated: object,
    ensureAuthenticated: func,
    bailRegex: object,
  };

  static defaultProps = {
    enableEvents: true,
    requiresAuth: false,
  };

  componentDidMount() {
    const {
      enableEvents,
      authenticated,
      location,
      history,
      ensureAuthenticated,
    } = this.props;

    const { pathname, search, hash } = location;

    if (enableEvents) {
      SlyEvent.getInstance()
        .sendPageView(pathname, search);
    }

    const { loginRedirect } = parseURLQueryParams(search);
    if (!authenticated.loggingIn && loginRedirect) {
      ensureAuthenticated()
        .then(() => {
          window.location.href = decodeURIComponent(loginRedirect);
        })
        .catch(() => {
          const params = removeQueryParamFromURL('loginRedirect', search);
          history.push(`${pathname}${stringify(params)}${hash}`);
        });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { enableEvents } = this.props;
    if (enableEvents && this.props.location !== nextProps.location) {
      const { pathname, search } = nextProps.location;
      SlyEvent.getInstance().sendPageView(pathname, search);
    }
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    const { pathname, search } = location;
    const { pathname: prevPath, search: prevSearch } = prevProps.location;

    const qs = parse(search);
    const prevQs = parse(prevSearch);

    if ((!blacklisted(pathname, prevPath)
      && pathname !== prevPath
    ) || bumpOnSearch(prevQs, qs)) {
      window && window.scrollTo(0, 0);
    }
  }

  render() {
    const {
      requiresAuth,
      status,
      location,
      children,
      staticContext,
      bailRegex,
    } = this.props;

    if (bailRegex && location.pathname.match(bailRegex)) {
      return <RefreshRedirect to={`${location.pathname}${location.search}${location.hash}`} />;
    }

    if (requiresAuth && status.user.status === 401) {
      const afterLogin = `${location.pathname}${location.search}${location.hash}`;
      const url = `/?${stringify({ loginRedirect: afterLogin })}`;
      if (isServer) {
        staticContext.status = 302;
      }
      return <RefreshRedirect to={url} />;
    }

    return children;
  }
}
