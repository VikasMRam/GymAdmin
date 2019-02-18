import { Component } from 'react';
import { object, node, bool } from 'prop-types';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

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

export class Router extends Component {
  static propTypes = {
    location: object,
    children: node,
    enableEvents: bool,
  };

  static defaultProps = {
    enableEvents: true,
  };

  componentDidMount() {
    const { pathname, search } = this.props.location;
    const { enableEvents } = this.props;
    if (enableEvents) {
      SlyEvent.getInstance().sendPageView(pathname, search);
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

    const qs = queryString.parse(search);
    const prevQs = queryString.parse(prevSearch);

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

export default withRouter(Router);
