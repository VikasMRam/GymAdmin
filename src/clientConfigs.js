import cloneDeep from 'lodash/cloneDeep';
import parseUrl from 'parseurl';
import pathToRegexp from 'path-to-regexp';

import careTypes from 'sly/constants/careTypes';

const configs = [
  {
    bundle: 'external',
    ssr: false,
    path: '/external*',
  },
  {
    bundle: 'community-details',
    ssr: true,
    path: `/:toc(${careTypes.join('|')})/:state/:city/:communitySlug`,
  },
  {
    bundle: 'main',
    ssr: true,
    path: '*',
  },
];

export const clientConfigsMiddleware = () => {
  configs.forEach((config) => {
    config.regexp = pathToRegexp(config.path);
  });
  return (req, res, next) => {
    const path = parseUrl(req).pathname;
    for (let i = 0; i < configs.length; i++) {
      const config = configs[i];
      if (path.match(config.regexp)) {
        // we are going to modify this object in subsequent middlewares
        req.clientConfig = cloneDeep(config);
        break;
      }
    }
    next();
  };
};


export default configs;
