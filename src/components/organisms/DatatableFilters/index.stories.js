import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';

import DatatableFilters from '.';

import datatableClient from 'sly/../private/storybook/sample-data/datatable-client.json';
import { makeQuerystringFilters, parseQuerystringFilters, simpleQSParse } from 'sly/services/datatable/helpers';

const StyledInput = styled.input`
  width: 100%;
`;

class Container extends Component {
  // state = {
  //   filters: [],
  //   logicalOperator: 'and',
  // };

  state = {
    filterState: {
      filters: [{
        column: 'name',
        operator: 'eq',
        value: 'adsf',
      },
        // {},
      ],
      logicalOperator: 'and',
    },
  };

  onChange = (filterState) => {
    const { onChange } = this.props;

    onChange(filterState);
    this.setState({ filterState });
  };

  onInputChange = ({ target }) => {
    const queryString = target.value;
    console.log(queryString, simpleQSParse(queryString));
    this.setState({ filterState: parseQuerystringFilters(simpleQSParse(queryString)) });
  };

  render() {
    return (
      <>
        <StyledInput
          onChange={this.onInputChange}
          value={makeQuerystringFilters(this.state.filterState)}
        />
        <DatatableFilters
          datatable={datatableClient}
          onChange={this.onChange}
          filterState={this.state.filterState}
        />
      </>
    );
  }
}

const onChangeAction = action('onChange');

storiesOf('Organisms|DatatableFilters', module)
  .add('default', () => <Container onChange={onChangeAction} />);
