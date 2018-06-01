import { Component } from 'react';
import { object, node } from 'prop-types';
import { withRouter } from 'react-router-dom';
import SlyEvent from "sly/services/helpers/events";

// https://stackoverflow.com/questions/36904185/react-router-scroll-to-top-on-every-transition
class Router extends Component {
  static propTypes = {
    location: object,
    children: node,
  }

  componentDidMount(nextProps) {
    const { pathname, search } = this.props.location;
    SlyEvent.getInstance().sendPageView(pathname, search);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location !== nextProps.location) {
      const { pathname, search } = nextProps.location;
      SlyEvent.getInstance().sendPageView(pathname, search);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window && window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(Router);
