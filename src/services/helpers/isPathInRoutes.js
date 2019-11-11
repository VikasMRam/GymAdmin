import {matchPath} from 'react-router-dom';

export default function isPathInRoutes(routes, path) {
  if (!routes) return false;

  const pathName = path.replace(/(\?|#).*/, '');
  return routes.some(route => matchPath(pathName, route));
};
