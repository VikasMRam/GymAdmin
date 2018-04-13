import React, { Component } from 'react';
import { string, number } from 'prop-types';
import styled from 'styled-components';
import { palette } from 'styled-theme';

import { size } from 'sly/components/themes';

const HRStyled = styled.hr`
  border: 0;
  padding: 0;
  margin: 0;
  margin-bottom: ${size('spacing.xLarge')};
  border-top: 1px solid ${palette(2)};
`;

class Hr extends Component {
  static propTypes = {
    palette: string,
  };
  static defaultProps = {
    palette: 'grayscale',
  };
  render() {
    return <HRStyled {...this.props} />;
  }
}

export default Hr;
