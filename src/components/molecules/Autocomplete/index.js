import React, { Component } from 'react';
import { string, object } from 'prop-types';

import { Select } from 'sly/components/atoms';
import { normalizeResponse } from 'sly/services/newApi';

export default class Autocomplete extends Component {
  static propTypes = {
    basePath: string,
    column: object.isRequired,
  };

  getValue = (item) => {
    const { column } = this.props;
    const keyArray = column.value.split('.').slice(1);
    const label = keyArray.reduce((assoc, key) => assoc[key], item);
    return {
      value: item.id,
      label,
    };
  };

  loadOptions = (inputValue) => {
    const { column, basePath } = this.props;
    return fetch(`${basePath || ''}${column.typeInfo.api}${inputValue}`)
      .then(normalizeResponse)
      .then(result => result.map(this.getValue));
  };

  render() {
    return (
      <Select
        async
        loadOptions={this.loadOptions}
      />
    );
  }
}
