import React from 'react';
import { object, bool } from 'prop-types';
import loadable from '@loadable/component';

import { getAutocompleteValues } from 'sly/web/services/datatable/helpers';
import { normalizeResponse } from 'sly/web/services/api';

const Select = loadable(() => import(/* webpackChunkName: "chunkAtomSelect" */'sly/web/components/atoms/Select'));

const Autocomplete = ({ column, createable, ...props })  => {
  const loadOptions = (inputValue) => {
    return fetch(`${column.typeInfo.api}${inputValue}`, {
      credentials: 'include',
    })
      .then(r => r.json())
      .then(normalizeResponse)
      .then(getAutocompleteValues(column))
      // FIXME: no error handling
      // eslint-disable-next-line no-console
      .catch(console.error);
  };


  return (
    <>
      <Select
        async
        isSearchable
        isClearable
        createable={createable}
        pageSize={10}
        loadOptions={loadOptions}
        {...props}
      />
    </>
  );
};

Autocomplete.propTypes = {
  column: object.isRequired,
  createable: bool,
};

Autocomplete.defaultProps = {
  createable: false,
};

export default Autocomplete;
