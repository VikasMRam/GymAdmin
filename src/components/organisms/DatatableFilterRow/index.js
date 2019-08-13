import React, { Component } from 'react';
import { arrayOf, func } from 'prop-types';

import filterPropType from 'sly/propTypes/datatableFilter';
import datatablePropType from 'sly/propTypes/datatable';
import IconButton from 'sly/components/molecules/IconButton';
import Field from 'sly/components/molecules/Field';

const Row = 'form';

export default class DatatableFilterRowForm extends Component {
  static propTypes = {
    onRemove: func,
    onChange: func,
    filter: filterPropType,
    filters: arrayOf(filterPropType),
    datatable: datatablePropType,
  };

  onFieldChange = ({ value }, { name }) => {
    const { filter, onChange } = this.props;
    onChange(filter, { [name]: value });
  };

  render() {
    const { onRemove, filter, datatable } = this.props;
    return (
      <Row>
        <IconButton onClick={() => onRemove(filter)} icon="clear" />

        <Field
          name="column"
          value={filter.column}
          type="select"
          onChange={this.onFieldChange}
          options={datatable.columns}
        />
      </Row>
    );
  }
}


