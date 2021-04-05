import React, { useCallback, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import SearchInput from 'sly/common/system/SearchInput';
import { RESOURCE_CENTER_PATH } from 'sly/web/constants/dashboardAppPaths';


const ArticlesSearchContainer = () => {
  const { push } = useHistory();
  const { searchBy } = useParams();

  const [value, setValue] = useState(searchBy || '');

  const onSubmit = useCallback(() =>
    value.trim() &&
    push(`${RESOURCE_CENTER_PATH}/search/${value.trim()}`),
  [value]);

  return (
    <SearchInput
      placeholder="Search the blog"
      value={value}
      onChange={evt => setValue(evt.target.value)}
      onKeyDown={evt => evt.keyCode === 13 && onSubmit()}
      sx={{
        width: '100%',
      }}
      inputStyles={{ width: 'auto', flexGrow: 1 }}
    />
  );
};

export default ArticlesSearchContainer;
