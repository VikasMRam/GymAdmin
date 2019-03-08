import React, { Component, createRef } from 'react';
import styled from 'styled-components';
import { array, shape, number, arrayOf } from 'prop-types';
import { ifProp } from 'styled-tools';

import { size, getKey } from 'sly/components/themes';

// ref: https://codepen.io/LasseStilvang/pen/BrpqKx
const Parent = styled.div`
  column-width: ${p => p.width}px;
  column-gap: ${size('spacing.xLarge')};
  visibility: ${ifProp('width', 'visible', 'hidden')};
`;

const Child = styled.div`
  width: ${p => p.width}px;
  break-inside: avoid-column;
  margin-bottom: ${size('spacing.xLarge')};
`;

export default class Masonry extends Component {
  static propTypes = {
    children: array,
    columnCounts: arrayOf(shape({
      from: number,
      to: number,
      count: number,
    })),
  };

  static defaultProps = {
    columnCounts: [],
  };

  state = { width: 0 };

  componentDidMount() {
    this.computeWidths();
    window.addEventListener('resize', this.computeWidths);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.computeWidths);
  }

  ref = createRef();

  computeWidths = () => {
    const { columnCounts } = this.props;
    let columnsPerRows = 0;
    const i = columnCounts.find(cc => window.innerWidth >= cc.from && window.innerWidth <= cc.to);

    if (i) {
      columnsPerRows = i.count;
    } else {
      // equally divide available space
      const half = this.ref.current.children.length / 2;
      const rows = this.ref.current.children.length / half;
      columnsPerRows = this.ref.current.children.length / rows;
    }
    const availableWidth = this.ref.current.clientWidth - (getKey('sizes.spacing.xLarge').replace('rem', '') * 16 * (columnsPerRows === 1 ? 0 : columnsPerRows));
    const columnWidth = Math.floor(availableWidth / columnsPerRows);

    this.setState({
      width: columnWidth,
    });
  }

  render() {
    const { width } = this.state;

    return (
      <Parent innerRef={this.ref} width={width}>
        {this.props.children.map((child, i) => (
          <Child key={i} width={width}>
            {child}
          </Child>
        ))}
      </Parent>
    );
  }
}
