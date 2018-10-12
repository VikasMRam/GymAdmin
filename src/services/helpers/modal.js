import { objectToURLQueryParams, parseURLQueryParams } from 'sly/services/helpers/url';

export const getSetModal = ({ history, location }) => {
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

  const setModal = (value) => {
    if (value) {
      changeSearchParams({ changedParams: { modal: value } });
    } else {
      handleParamsRemove({ paramsToRemove: ['modal'] });
    }
  };

  return setModal;
};
