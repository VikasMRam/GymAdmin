import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { prop } from 'styled-tools';

import { size } from 'sly/components/themes';
import { Heading } from 'sly/components/atoms';
import ListItem from 'sly/components/molecules/ListItem';

const ListWrapper = styled.ul`
  margin: 0;
  padding: 0;
  margin-bottom: ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    column-count: ${prop('columns')};
  }

  li {
    break-inside: avoid-column;
    overflow: hidden;
  }
`;

const List = ({
  columns, heading, items,
}) => (
  <div>
    {heading &&
      <Heading level="subtitle">{heading}</Heading>
    }
    <ListWrapper columns={columns}>
      {items.map((item, i) => (<ListItem key={i}>{item}</ListItem>))}
    </ListWrapper>
  </div>
);

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node),
  columns: PropTypes.number,
  heading: PropTypes.string,
};

List.defaultProps = {
  columns: 2,
};

export default List;
