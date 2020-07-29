import React, { Component } from 'react';
import { object } from 'prop-types';
import loadable from '@loadable/component';

import { getAutocompleteValues } from 'sly/web/services/datatable/helpers';
import { normalizeResponse } from 'sly/web/services/api';

const Select = loadable(() => import(/* webpackChunkName: "chunkAtomSelect" */'sly/web/components/atoms/Select'));

export default class Autocomplete extends Component {
  static propTypes = {
    column: object.isRequired,
  };

  loadOptions = (inputValue) => {
    const { column } = this.props;
    return fetch(`${column.typeInfo.api}${inputValue}`, {
      credentials: 'include'
    })
      .then(r => r.json())
      .then(normalizeResponse)
      .then(getAutocompleteValues(column))
      // FIXME: no error handling
      // eslint-disable-next-line no-console
      .catch(console.error);
  };

  render() {
    const { column, ...props } = this.props;
    return (
      <Select
        async
        isSearchable
        isClearable
        pageSize={10}
        loadOptions={this.loadOptions}
        {...props}
      />
    );
  }
}
