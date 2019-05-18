import { string, instanceOf, bool, shape, func, oneOfType, arrayOf } from 'prop-types';
import { Component } from 'react';

export const routes = arrayOf(shape({
  path: string.isRequired,
  component: oneOfType([
    shape({
      loadable: func,
      lazy: func,
    }),
    instanceOf(Component),
    func,
  ]).isRequired,
  exact: bool,
}));

