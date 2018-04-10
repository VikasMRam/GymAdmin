import React, { Component } from 'react';
import { string, number } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes'
import Icon from 'sly/components/atoms/Icon';

const ListItemDiv = styled.div`
  display: flex;
`;

const ListItemIconDiv = styled.div`
  padding-right: ${size('spacing.regular')}
`;

const ListItemTextDiv = styled.div`
  padding-top: ${size('spacing.small')}
`;


export default class ListItem extends Component {
  static propTypes = {
    text: string.isRequired,
  }
  render() {
    const { text } = this.props;
    return (
      <ListItemDiv>
        <ListItemIconDiv>
          <Icon icon="star" />
        </ListItemIconDiv>
        <ListItemTextDiv>{text}</ListItemTextDiv>
      </ListItemDiv>
    );
  }
}
