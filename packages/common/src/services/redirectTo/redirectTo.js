import isPathInRoutes from 'sly/common/services/helpers/isPathInRoutes';

const makeRedirectTo = (routes, history) => (path, replace) =>  {
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

export default makeRedirectTo;
