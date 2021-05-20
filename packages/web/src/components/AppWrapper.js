import React from 'react';
import loadable from '@loadable/component';

const App = loadable(() => import(/* webpackChunkName: "chunkApp" */ 'sly/web/components/App'));

export default function AppWrapper(props) {
  return <App {...props } />;
};

