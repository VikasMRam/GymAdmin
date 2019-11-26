import React, { Component } from 'react';
import { func, object, node, array } from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { stringify, parse } from 'query-string';

import {
  parseURLQueryParams,
  removeQueryParamFromURL,
} from 'sly/services/helpers/url';
import { withAuth } from 'sly/services/newApi';
import { isServer } from 'sly/config';

const searchWhitelist = [
  'page-number',
  'page-size',
];

const bumpOnSearch = (prev, next) => searchWhitelist
  .some(key => next[key] !== prev[key]);

@withAuth

@withRouter

export default class Router extends Component {
  static propTypes = {
    requiresAuth: array.isRequired,
    location: object,
    children: node,
    status: object,
    history: object,
    staticContext: object,
    authenticated: object,
    ensureAuthenticated: func,
  };

  static defaultProps = {
    requiresAuth: [],
    children: null,
  };

  checkLoginRedirect() {
    const {
      authenticated,
      location,
      history,
      ensureAuthenticated,
    } = this.props;

    const { pathname, search, hash } = location;

    const { loginRedirect } = parseURLQueryParams(search);
    if (!authenticated.loggingIn && loginRedirect) {
      ensureAuthenticated()
        .then(() => {
          history.replace(decodeURIComponent(loginRedirect));
        })
        .catch(() => {
          const params = removeQueryParamFromURL('loginRedirect', search);
          history.replace(`${pathname}${stringify(params)}${hash}`);
        });
    }
  }

  componentDidMount() {
    this.checkLoginRedirect();
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    const { pathname, search } = location;
    const { pathname: prevPathname, search: prevSearch } = prevProps.location;

    const qs = parse(search);
    const prevQs = parse(prevSearch);

    if (pathname !== prevPathname) {
      // call component did mount here too
      this.checkLoginRedirect();
    }

    if (pathname !== prevPathname || bumpOnSearch(prevQs, qs)) {
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
    } = this.props;

    if (requiresAuth.some(regex => regex.test(location.pathname)) && status.user.status === 401) {
      const afterLogin = `${location.pathname}${location.search}${location.hash}`;
      const url = `/?${stringify({ loginRedirect: afterLogin })}`;
      if (isServer) {
        staticContext.status = 302;
      }
      return <Redirect to={url} />;
    }

    return children;
  }
}
