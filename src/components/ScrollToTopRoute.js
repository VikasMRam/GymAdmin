import { Component } from 'react';
import { object, node } from 'prop-types';
import { withRouter } from 'react-router-dom';

// https://stackoverflow.com/questions/36904185/react-router-scroll-to-top-on-every-transition
class ScrollToTop extends Component {
  static propTypes = {
    location: object,
    children: node,
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
