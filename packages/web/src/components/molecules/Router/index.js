import React, { Component } from 'react';
import { func, object, node, array } from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { stringify, parse } from 'query-string';

import {
  parseURLQueryParams,
  removeQueryParamFromURL,
} from 'sly/web/services/helpers/url';
import { withAuth } from 'sly/web/services/api';
import { isServer } from 'sly/web/config';
import withApiContext, { apiContextPropType } from 'sly/web/services/api/context';

const searchWhitelist = [
  'page-number',
  'page-size',
];

const bumpOnSearch = (prev, next) => searchWhitelist
  .some(key => next[key] !== prev[key]);

@withApiContext
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
    apiContext: apiContextPropType,
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
      apiContext,
    } = this.props;

    if (requiresAuth.some(regex => regex.test(location.pathname))) {
      if (status.user.status === 401) {
        const afterLogin = `${location.pathname}${location.search}${location.hash}`;
        const url = `/?${stringify({ loginRedirect: afterLogin })}`;
        if (isServer) {
          staticContext.status = 302;
        }
        return <Redirect to={url} />;
      } else if (isServer) {
        apiContext.skipApiCalls = true;
      }
    }

    return children;
  }
}
