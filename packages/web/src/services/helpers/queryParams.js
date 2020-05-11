import { objectToURLQueryParams, parseURLQueryParams } from 'sly/services/helpers/url';

export const getQueryParamsSetter = (history, location) => {
  const changeSearchParams = ({ changedParams }) => {
    const { pathname, search } = location;
    const newParams = { ...parseURLQueryParams(search), ...changedParams };
    const path = `${pathname}?${objectToURLQueryParams(newParams)}`;
    history.push(path);
  };

  return function setQueryParams(queryParams) {
    const keysToModify = {};
    Object.keys(queryParams).forEach((key) => {
      const value = queryParams[key];
      if (value === null || value === undefined) {
        keysToModify[key] = undefined;
      } else {
        keysToModify[key] = value;
      }
    });
    if (Object.keys(keysToModify).length > 0) {
      changeSearchParams({ changedParams: keysToModify });
    }
  };
};
