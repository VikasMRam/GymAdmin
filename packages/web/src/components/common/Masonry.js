/* eslint-disable react/no-array-index-key */
import React, { Component, createRef } from 'react';
import styled, { css } from 'styled-components';
import { array, shape, number, arrayOf } from 'prop-types';
import { ifProp, prop } from 'styled-tools';

import { size, getKey, remToPx } from 'sly/web/components/themes';

// ref: https://medium.com/@andybarefoot/a-masonry-style-layout-using-css-grid-8c663d355ebb
const Parent = styled.div`
  visibility: ${ifProp('width', 'visible', 'hidden')};
  display: grid;
  grid-gap: ${size('spacing.xLarge')};
  grid-template-columns: repeat(auto-fill, minmax(${p => p.width}px, 1fr));
`;

const Child = styled.div`
  ${ifProp('span', css`grid-row-end: span ${prop('span')};`, '')};
  ${ifProp('isLastItem', 'grid-row-start: 1;', '')};
  order: ${prop('order')};
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
    rowSpans: {},
  };

  componentDidMount() {
    this.onScreenSizeChange();
    window.addEventListener('load', this.onScreenSizeChange);
    window.addEventListener('resize', this.onScreenSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onScreenSizeChange);
    window.removeEventListener('load', this.onScreenSizeChange);
  }

  ref = createRef();

  onScreenSizeChange = () => {
    const { width, columnsPerRows, rowSpans } = this.computeWidthsAndSpans();
    this.setDimensions(width, columnsPerRows, rowSpans);
  };

  setDimensions = (width, columnsPerRows, rowSpans) => {
    this.setState({
      width,
      rowSpans,
    });
  };

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
    const rowGap = remToPx(getKey('sizes.spacing.xLarge'));
    const rowHeight = 1;
    const availableWidth = this.ref.current.clientWidth - (rowGap * (columnsPerRows === 1 ? 0 : columnsPerRows));
    const width = Math.floor(availableWidth / columnsPerRows);

    if (columnsPerRows > 1) {
      for (let x = 0; x < this.ref.current.children.length; x++) {
        const span = Math.ceil((this.ref.current.children[x].firstChild.clientHeight + rowGap) /
          (rowHeight + rowGap));
        rowSpans[x] = span;
      }
    }

    return {
      width,
      columnsPerRows,
      rowSpans,
    };
  };

  render() {
    const { width, rowSpans } = this.state;

    return (
      <Parent ref={this.ref} width={width}>
        {this.props.children.map((child, i) => (
          <Child key={i} order={i + 1} span={rowSpans[i]} isLastItem={i === this.props.children.length - 1}>
            {child}
          </Child>
        ))}
      </Parent>
    );
  }
}
