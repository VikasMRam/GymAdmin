import React, { Component } from 'react';
import { object, node, array, bool } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { stringify, parse } from 'query-string';
import { withRouter } from 'react-router';

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
    location: object,
    children: node,
    status: object,
    history: object,
    staticContext: object,
    apiContext: apiContextPropType,
    isLoggedIn: bool,
  };

  static defaultProps = {
    children: null,
  };

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    const { pathname, search } = location;
    const { pathname: prevPathname, search: prevSearch } = prevProps.location;

    const qs = parse(search);
    const prevQs = parse(prevSearch);

    if (pathname !== prevPathname || bumpOnSearch(prevQs, qs)) {
      window && window.scrollTo(0, 0);
    }
  }

  render() {
    const {
      location,
      children,
      staticContext,
      apiContext,
      isLoggedIn,
    } = this.props;

    if (isLoggedIn === false) {
      const afterLogin = `${location.pathname}${location.search}${location.hash}`;
      const url = `/?${stringify({ loginRedirect: afterLogin })}`;
      if (isServer) {
        staticContext.status = 302;
      }
      return <Redirect to={url} />;
      // return <LoginRedirect />;
    } else if (isServer) {
      // we do this because we don't want to prefetch in the server
      // all of dashboard (or any other section that requires auth)
      // all the api queries as they are not seo pages.
      apiContext.skipApiCalls = true;
    }

    return children;
  }
}
