import React, { Component } from 'react';
import { arrayOf, func } from 'prop-types';

import { reduxForm } from 'redux-form';

import { createValidator, required } from 'sly/services/validation';

import filterPropType from 'sly/propTypes/datatableFilter';
import datatablePropType from 'sly/propTypes/datatable';

const Row = 'div';

export class DatatableFilterRow extends Component {
  static propTypes = {
    onChange: func,
    filter: filterPropType,
    filters: arrayOf(filterPropType),
    datatable: datatablePropType,
  };

  state = {
    field: null,
    operator: null,
    value: null,
  };

  render() {
    const { filters, filter, datatable } = this.props;
    return (
      <Row>

      </Row>
    );
  }
}


const validate = createValidator({
  note: [required],
});

export default reduxForm()(AddNoteForm);
