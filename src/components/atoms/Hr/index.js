import React, { Component } from 'react';
import { string, number } from 'prop-types';
import styled from 'styled-components';
import { palette } from 'styled-theme';

const HRStyled = styled.hr`
  color: ${palette(2)};
`;

class Hr extends Component {
  static propTypes = {
    palette: string,
  };
  static defaultProps = {
    palette: 'greyscale',
  };
  render() {
    return <HRStyled {...this.props} />;
  }
}

export default Hr;
