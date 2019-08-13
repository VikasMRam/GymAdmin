import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DatatableFilters from '.';

import datatableClient from 'sly/../private/storybook/sample-data/datatable-client.json';

class Container extends Component {
  state = {
    filters: [],
  };

  onChange = (filters) => {
    const { onChange } = this.props;

    onChange(filters);
    this.setState({
      filters,
    });
  };

  render() {
    const { filters } = this.state;
    return (
      <DatatableFilters
        datatable={datatableClient}
        onChange={this.onChange}
        filters={filters}
      />
    );
  }
}

const onChangeAction = action('onChange');

storiesOf('Organisms|DatatableFilters', module)
  .add('default', () => <Container onChange={onChangeAction} />);
