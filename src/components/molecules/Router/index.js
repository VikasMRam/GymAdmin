import { Component } from 'react';
import { func, object, node, bool } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { stringify, parse } from 'query-string';

import {
  parseURLQueryParams,
  removeQueryParamFromURL,
} from 'sly/services/helpers/url';
import { withAuth } from 'sly/services/newApi';
import SlyEvent from 'sly/services/helpers/events';

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

export default class ClassRouter extends Component {
  static propTypes = {
    requiresAuth: bool,
    location: object,
    children: node,
    enableEvents: bool,
    status: object,
    history: object,
    authenticated: object,
    ensureAuthenticated: func,
  };

  static defaultProps = {
    enableEvents: true,
    requiresAuth: false,
  };

  componentWillMount() {
    const { requiresAuth, status, location, history } = this.props;
    if (requiresAuth && status.user.status === 401) {
      const afterLogin = `${location.pathname}${location.search}${location.hash}`;
      const url = `/?${stringify({ loginRedirect: afterLogin })}`;
      history.push(url);
    }
  }

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

    let params = parseURLQueryParams(search);
    if (!authenticated.loggingIn && params.loginRedirect) {
      params = removeQueryParamFromURL('loginRedirect', search);
      return ensureAuthenticated()
        .then(() => {
          window.location.href = decodeURIComponent(params.loginRedirect);
        })
        .catch(() => history.push(`${pathname}${stringify(params)}${hash}`));
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
    const { pathname, search } = this.props.location;
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
    return this.props.children;
  }
}
