/* eslint-disable react/no-array-index-key */
import React, { Component, createRef } from 'react';
import styled, { css } from 'styled-components';
import { array, shape, number, arrayOf } from 'prop-types';
import { ifProp } from 'styled-tools';

import { size, getKey } from 'sly/components/themes';

// ref: https://medium.com/@andybarefoot/a-masonry-style-layout-using-css-grid-8c663d355ebb
const Parent = styled.div`
  visibility: ${ifProp('width', 'visible', 'hidden')};
  display: grid;
  grid-gap: ${size('spacing.xLarge')};
  grid-template-columns: repeat(auto-fill, ${p => p.width}px);
  ${ifProp('hasSpans', css`grid-auto-rows: ${size('spacing.nano')}}`, '')};
`;

const Child = styled.div`
  ${ifProp('span', css`grid-row-end: span ${p => p.span};`, '')};
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

  state = {
    width: 0,
    columnsPerRows: 0,
    rowSpans: {},
  };

  componentDidMount() {
    this.computeWidthsAndSpans();
    window.addEventListener('load', this.computeWidthsAndSpans);
    window.addEventListener('resize', this.computeWidthsAndSpans);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.computeWidthsAndSpans);
    window.removeEventListener('load', this.computeWidthsAndSpans);
  }

  ref = createRef();

  remToPx = (rem) => {
    return rem.replace('rem', '') * 16;
  }

  computeWidthsAndSpans = () => {
    const { columnCounts } = this.props;
    let columnsPerRows = 0;
    const i = columnCounts.find(cc => window.innerWidth >= cc.from && window.innerWidth <= cc.to);
    const rowSpans = {};

    if (i) {
      columnsPerRows = i.count;
    } else {
      // equally divide available space
      const half = this.ref.current.children.length / 2;
      const rows = this.ref.current.children.length / half;
      columnsPerRows = this.ref.current.children.length / rows;
    }
    const rowGap = this.remToPx(getKey('sizes.spacing.xLarge'));
    const rowHeight = this.remToPx(getKey('sizes.spacing.nano'));
    const availableWidth = this.ref.current.clientWidth - (rowGap * (columnsPerRows === 1 ? 0 : columnsPerRows));
    const columnWidth = Math.floor(availableWidth / columnsPerRows);

    if (columnsPerRows > 1) {
      for (let x = 0; x < this.ref.current.children.length; x++) {
        const span = Math.ceil((this.ref.current.children[x].firstChild.clientHeight + rowGap) /
          (rowHeight + rowGap));
        rowSpans[x] = span;
      }
    }

    this.setState({
      width: columnWidth,
      columnsPerRows,
      rowSpans,
    });
  }

  render() {
    const { width, rowSpans, columnsPerRows } = this.state;

    return (
      <Parent innerRef={this.ref} width={width} hasSpans={columnsPerRows > 1}>
        {this.props.children.map((child, i) => (
          <Child key={i} span={rowSpans[i]}>
            {child}
          </Child>
        ))}
      </Parent>
    );
  }
}
