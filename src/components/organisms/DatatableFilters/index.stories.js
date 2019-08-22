import React, { Fragment, Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { stringify } from 'query-string';

import DatatableFilters from '.';

import datatableClient from 'sly/../private/storybook/sample-data/datatable-client.json';
import { makeQuerystringFilters } from 'sly/services/helpers/datatable';

class Container extends Component {
  // state = {
  //   filters: [],
  //   logicalOperator: 'and',
  // };

  state = {
    filters: [{
      column: 'name',
      operator: 'eq',
      value: 'adsf',
    }, {

    }],
    logicalOperator: 'and',
  };

  onChange = (state) => {
    const { onChange } = this.props;

    onChange(state);
    console.log('state', state);
    this.setState(state);
  };

  render() {
    return (
      <Fragment>
        <pre>?{decodeURIComponent(stringify(makeQuerystringFilters(this.state)))}</pre>
        <DatatableFilters
          datatable={datatableClient}
          onChange={this.onChange}
          filterState={this.state}
        />
      </Fragment>
    );
  }
}

const onChangeAction = action('onChange');

storiesOf('Organisms|DatatableFilters', module)
  .add('default', () => <Container onChange={onChangeAction} />);
