import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { Icon } from 'sly/components/atoms';

const ListItemWrapper = styled.li`
  display: flex;
  margin-bottom: ${size('spacing.regular')};
`;

const ListItemIconDiv = styled.div`
  padding-right: ${size('spacing.regular')}
`;

const ListItem = ({
  children,
}) => (
  <ListItemWrapper>
    <ListItemIconDiv>
      <Icon icon="star" />
    </ListItemIconDiv>
    {children}
  </ListItemWrapper>
);

ListItem.propTypes = {
  children: PropTypes.node,
};

export default ListItem;
