import { any, arrayOf, object, shape } from 'prop-types';
import React from 'react';

export const apiContextPropType = shape({
  promises: arrayOf(object),
});

export class ApiContextProvider extends React.Component {
  static propTypes = {
    context: apiContextPropType,
    children: any,
  };

  static childContextTypes = {
    apiContext: apiContextPropType,
  };

  getChildContext = () => ({
    apiContext: this.props.context,
  });

  render = () => this.props.children;
}

