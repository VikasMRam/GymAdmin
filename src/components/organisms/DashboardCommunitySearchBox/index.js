import React, { Component, Fragment } from 'react';
import { bool,func } from 'prop-types';
import styled from 'styled-components';
import { size } from 'sly/components/themes';

import { Box,  Button } from 'sly/components/atoms';

import Field from 'sly/components/molecules/Field';




const Form = styled.form``;
Form.displayName = 'Form';

const StyledField = styled(Field)`
  display: inline-flex;
  margin-right: ${size('spacing.xLarge')}
`;

export default class DashboardCommunitySearchBox extends Component {
  static propTypes = {
    handleSubmit: func.isRequired,
  };

  // TODO : Notify Error and Info are not present
  render() {
    const { handleSubmit } = this.props;
    return (
      <Box>
        <Form onSubmit={handleSubmit}>
          <StyledField name="name" label={"Name"}/>
          <StyledField name="zip" label={"ZipCode"}/>
          <Button type="submit"> Search</Button>
        </Form>
      </Box>
    );
  }
}
