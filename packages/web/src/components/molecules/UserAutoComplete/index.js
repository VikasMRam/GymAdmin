import React, { Component } from 'react';
import { func, oneOf } from 'prop-types';
import loadable from '@loadable/component';

import { apiUrl } from 'sly/web/config';
import { getUserAutocompleteValues } from 'sly/web/services/datatable/helpers';
import { normalizeResponse } from 'sly/web/services/api';
import { CUSTOMER_ROLE_PARAM, PROVIDER_ROLE_PARAM, AGENT_ROLE_PARAM, ADMIN_ROLE_PARAM } from 'sly/web/constants/roles';

const Select = loadable(() => import(/* webpackChunkName: "chunkAtomSelect" */'sly/web/components/atoms/Select'));
const UserFilterApiEndpoint = '/v0/platform/users?filter[role]=';

export default class UserAutoComplete extends Component {
  static propTypes = {
    role: oneOf([CUSTOMER_ROLE_PARAM, PROVIDER_ROLE_PARAM, AGENT_ROLE_PARAM, ADMIN_ROLE_PARAM]),
    onChange: func,
    onBlur: func,
  };

  static defaultProps = {
    role: CUSTOMER_ROLE_PARAM,
  };

  loadOptions = (inputValue) => {
    const { role } = this.props;
    return fetch(`${apiUrl}${UserFilterApiEndpoint}${role}&filter[name]=${inputValue}`)
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
