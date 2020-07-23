import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';

import DatatableFilters from '.';

import datatableClient from 'sly/storybook/sample-data/datatable-client.json';
import { makeQuerystringFilters, parseQuerystringFilters, simpleQSParse } from 'sly/web/services/datatable/helpers';
import PopoverPortal from 'sly/web/components/molecules/PopoverPortal';
import ButtonLink from 'sly/common/components/molecules/ButtonLink';
import Button from 'sly/web/components/atoms/Button';

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
    // console.log(queryString, simpleQSParse(queryString));
    this.setState({ filterState: parseQuerystringFilters(simpleQSParse(queryString)) });
  };

  render() {
    const datatable = {
      filterState: this.state.filterState,
      onFilterChange: this.onChange,
      clearFilters: () => {},
      columns: datatableClient.columns,
    };

    const filterTitle = 'Filters (10)';
    const filterSubtitle = '10 Results';

    const clearButton = (
      <ButtonLink
        palette="primary"
        weight="medium"
        size="caption"
        onClick={datatable.clearFilters}
      >
        Clear filters
      </ButtonLink>
    );

    const filterButton = <Button />;

    const autocompleteFilters = {};

    return (
      <>
        <StyledInput
          onChange={this.onInputChange}
          value={makeQuerystringFilters(this.state.filterState)}
        />
        <PopoverPortal isOpen headerButton={clearButton} title={filterTitle} subtitle={filterSubtitle} button={filterButton}>
          <DatatableFilters datatable={datatable} autocompleteFilters={autocompleteFilters} />
        </PopoverPortal>
      </>
    );
  }
}

const onChangeAction = action('onChange');

storiesOf('Organisms|DatatableFilters', module)
  .add('default', () => <Container onChange={onChangeAction} />);
