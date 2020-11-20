import queryString from 'query-string';

import { getPaginationData } from 'sly/web/services/helpers/pagination';

export const getPagination = (requestInfo, location, currentFilters) => {
  const requestMeta = requestInfo.meta;
  let current;
  let total;
  let start;
  let end;
  let count;
  if (requestMeta) {
    ({ current, total } = getPaginationData(requestMeta));
    count = requestMeta['filtered-count'];
    const present = (requestMeta['page-number'] * requestMeta['page-size']);
    start = present + 1;
    end = (present + requestMeta['page-size']  > count ? count : present + requestMeta['page-size']);
  }
  const qs = queryString.stringify(currentFilters);
  let basePath = location.pathname;
  if (qs.length > 0) {
    basePath = `${basePath}?${qs}`;
  }
  return {
    current,
    total,
    start,
    end,
    count,
    basePath,
  };
};

