import React, { Component } from 'react';
import loadable from '@loadable/component';

import { getCommunityAutocompleteValues } from 'sly/services/datatable/helpers';
import { normalizeResponse } from 'sly/services/api';

const Select = loadable(() => import(/* webpackChunkName: "chunkAtomSelect" */'sly/components/atoms/Select'));
const CommunityFilterApiEndpoint = "/v0/marketplace/communities/find?fields=name&filter[name]=";

export default class CommunityAutoComplete extends Component {

  loadOptions = (inputValue) => {
    return fetch(`${CommunityFilterApiEndpoint}${inputValue}`)
      .then(r => r.json())
      .then(normalizeResponse)
      .then(getCommunityAutocompleteValues)
      // FIXME: no error handling
      // eslint-disable-next-line no-console
      .catch(console.error);
  };

  render() {
    const { ...props } = this.props;
    return (
      <Select
        async
        isSearchable
        loadOptions={this.loadOptions}
        {...props}
      />
    );
  }
}
