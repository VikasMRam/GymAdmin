import { string, instanceOf, bool, shape, func, oneOfType, arrayOf } from 'prop-types';
import { Component } from 'react';

export const routes = arrayOf(shape({
  path: string.isRequired,
  component: oneOfType([
    instanceOf(Component),
    func,
    shape({
      render: func,
      preload: func,
      load: func,
    }),
  ]).isRequired,
  exact: bool,
}));
