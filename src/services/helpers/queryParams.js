import { objectToURLQueryParams, parseURLQueryParams } from 'sly/services/helpers/url';

export const getQueryParamsSetter = (history, location) => {
  const changeSearchParams = ({ changedParams }) => {
    const { pathname, search } = location;
    const newParams = { ...parseURLQueryParams(search), ...changedParams };
    const path = `${pathname}?${objectToURLQueryParams(newParams)}`;
    history.push(path);
  };

  const handleParamsRemove = ({ paramsToRemove }) => {
    const changedParams = paramsToRemove.reduce((obj, p) => {
      const nobj = obj;
      nobj[p] = undefined;
      return nobj;
    }, {});
    changeSearchParams({ changedParams });
  };

  const setQueryParams = (queryParams) => {
    const keysToRemove = [];
    const keysToModify = {};
    Object.keys(queryParams).forEach((key) => {
      const value = queryParams[key];
      if (value === null || value === undefined) {
        keysToRemove.push(key);
      } else {
        keysToModify[key] = value;
      }
    });
    if (Object.keys(keysToModify).length > 0) {
      changeSearchParams({ changedParams: keysToModify });
    }
    if (keysToRemove.length > 0) {
      handleParamsRemove({ paramsToRemove: keysToRemove });
    }
  };

  return setQueryParams;
};
