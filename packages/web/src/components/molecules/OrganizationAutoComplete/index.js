import React, { Component } from 'react';
import { func, oneOf } from 'prop-types';
import loadable from '@loadable/component';

import { apiUrl } from 'sly/web/config';
import { getUserAutocompleteValues } from 'sly/web/services/datatable/helpers'; // Org and users work the same way
import { normalizeResponse } from 'sly/web/services/api';
import { CUSTOMER_ROLE_PARAM, PROVIDER_ROLE_PARAM, AGENT_ROLE_PARAM, ADMIN_ROLE_PARAM } from 'sly/common/constants/roles';

const Select = loadable(() => import(/* webpackChunkName: "chunkAtomSelect" */'sly/web/components/atoms/Select'));
const OrgFilterApiEndpoint = '/platform/organizations?';

export default class OrganizationAutoComplete extends Component {
  static propTypes = {
    onChange: func,
    onBlur: func,
  };

  loadOptions = (inputValue) => {
    return fetch(`${apiUrl}${OrgFilterApiEndpoint}&filter[name]=${inputValue}`, {
      credentials: 'include',
    })
      .then(r => r.json())
      .then(normalizeResponse)
      .then(getUserAutocompleteValues)
      // FIXME: no error handling
      // eslint-disable-next-line no-console
      .catch(console.error);
  };

  render() {
    // taking onBlur out to avoid clearing on blur
    const { onBlur, ...props } = this.props;

    return (
      <Select
        async
        isSearchable
        loadOptions={this.loadOptions}
        onBlur={() => {}}
        {...props}
      />
    );
  }
}
