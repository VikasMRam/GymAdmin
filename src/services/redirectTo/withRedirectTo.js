import React from 'react';
import { object } from 'prop-types';
import hoistNonReactStatic from 'hoist-non-react-statics';
import withRouter from "react-router/withRouter";

import {routes as routesPropType} from 'sly/propTypes/routes';
import redirectTo from './redirectTo';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';
}

export default function withRedirectTo(InnerComponent) {
  @withRouter
  class Wrapper extends React.Component {
    static displayName = `withRedirectTo(${getDisplayName(InnerComponent)})`;
    static WrappedComponent = InnerComponent;
    static contextTypes = {
      routes: routesPropType,
    };
    static propTypes = {
      history: object,
    };

    render() {
      const { routes } = this.context;
      return (<InnerComponent redirectTo={redirectTo(routes, this.props.history)} {...this.props} />);
    }
  }

  hoistNonReactStatic(Wrapper, InnerComponent);

  return Wrapper;
}
