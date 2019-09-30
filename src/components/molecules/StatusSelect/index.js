import React, { Component } from 'react';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import Field from 'sly/components/molecules/Field';

const options = [
  { label: 'Active',    icon: 'active',     palette: 'green',  value: 'Active' },
  { label: 'Hot',       icon: 'hot',        palette: 'yellow', value: 'Active' },
  { label: 'Long Term', icon: 'hourglass',  palette: 'purple', value: 'Long Term' },
  { label: 'On Pause',  icon: 'pause',      palette: 'danger', value: 'On Pause' },
  { label: 'Archived',  icon: 'archived',   palette: 'slate',  value: 'Archived' },
  { label: 'Deleted',   icon: 'trash-fill', palette: 'grey',   value: 'Deleted' },
];

const StyledField = styled(Field)`
  text-transform: uppercase;
  & .react-select__single-value, & .react-select__option {
    font-weight: ${size('weight.bold')};
  }
`;

export default class StatusSelect extends Component {
  render() {
    const { ...props } = this.props;
    return (
      <StyledField
        type="choice"
        size="tiny"
        options={options}
        {...props}
      />
    );
  }
}
