import React, { Component } from 'react';
import { object } from 'prop-types';

import { Select } from 'sly/components/atoms';
import { normalizeResponse } from 'sly/services/newApi';

export default class Autocomplete extends Component {
  static propTypes = {
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
    const { column } = this.props;
    return fetch(`${column.typeInfo.api}${inputValue}`)
      .then(r => r.json())
      .then(normalizeResponse)
      .then((result) => {
        const options = result.map(this.getValue);
        return options;
      })
      .catch(e => console.log(e));
  };

  render() {
    const { column, ...props } = this.props;
    return (
      <Select
        async
        loadOptions={this.loadOptions}
        {...props}
      />
    );
  }
}
