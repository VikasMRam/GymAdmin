import React, { Component } from 'react';

import Field from 'sly/components/molecules/Field';


const options = [
  { label: 'Active',    palette: 'green',  value: 'Active' },
  // { label: 'Hot',       palette: 'yellow',  value: 'Active' },
  { label: 'Long Term', palette: 'purple', value: 'Long Term' },
  { label: 'On Pause',  palette: 'red',    value: 'On Pause' },
  { label: 'Archived',  palette: 'slate',   value: 'Archived' },
  { label: 'Deleted',   palette: 'grey',       value: 'Deleted' },
];

export default class StatusSelect extends Component {
  render() {
    const { ...props } = this.props;
    return (
      <Field value="On Pause" type="choice" options={options} {...props} />
    );
  }
}
