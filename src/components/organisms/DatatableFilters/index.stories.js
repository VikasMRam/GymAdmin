import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DatatableFilters from '.';

import datatableClient from 'sly/../private/storybook/sample-data/datatable-client.json';

class Container extends Component {
  state = {
    filters: [],
    logicalOperator: 'and',
  };

  onChange = (state) => {
    const { onChange } = this.props;

    onChange(state);
    this.setState(state);
  };

  render() {
    return (
      <DatatableFilters
        datatable={datatableClient}
        onChange={this.onChange}
        filterState={this.state}
      />
    );
  }
}

const onChangeAction = action('onChange');

storiesOf('Organisms|DatatableFilters', module)
  .add('default', () => <Container onChange={onChangeAction} />);
