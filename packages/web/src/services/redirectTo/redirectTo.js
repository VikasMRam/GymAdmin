import isPathInRoutes from 'sly/services/helpers/isPathInRoutes';

export default (routes, history) => (path, replace) =>  {
  if (isPathInRoutes(routes, path)) {
    if (replace) {
      history.replace(path);
    } else {
      history.push(path);
    }
  } else if (replace) {
    window.location.replace(path);
  } else {
    window.location.assign(path);
  }
};
