import React, { Component } from 'react';
import Field from 'sly/components/molecules/Field';


const options = [
  { label: 'Active',    color: 'green',  value: 'Active' },
  { label: 'On Pause',  color: 'red',    value: 'On Pause' },
  { label: 'Long Term', color: 'purple', value: 'Long Term' },
  { label: 'Archived',  color: 'grey',   value: 'Archived' },
  { label: 'Deleted',   color: '',       value: 'Deleted' },
];

export default class StatusSelect extends Component {
  render() {
    const { ...props } = this.props;
    return (
      <Field type="choice" options={options} {...props} />
    );
  }
}
