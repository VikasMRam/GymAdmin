import React, { Component } from 'react';
import { number, string } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { palette as palettePropType } from 'sly/web/propTypes/palette';
import { Button, Icon } from 'sly/web/components/atoms';
import { size, palette } from 'sly/web/components/themes';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const marginLeftNext = css`
  margin-left: calc(${size('spacing.large')} - ${size('spacing.regular')});
`;
const ChevronLink = styled(({ flip, ...props }) => (
  <Button
    ghost
    kind="label"
    palette="slate"
    borderPalette="slate"
    {...props}
  >
    <Icon
      rotate={flip ? -1 : 1}
      icon="chevron"
      size="caption"
      palette="slate"
    />
  </Button>
))`
  margin-right: ${ifProp('flip', 0, size('spacing.large'))};
  ${ifProp('flip', marginLeftNext, 0)};
`;

const PageLink = styled(Button)`
  background-color: ${ifProp('selected', palette('background'))};
  margin-right: ${size('spacing.regular')};
  &:last-of-type {
    margin-right: 0;
  }
`;

const BreakView = styled.span`
  display: inline-flex;
  align-items: center;
  height: ${size('element.regular')};
  color: ${palette('slate', 'base')};
  border-color: ${palette('white', 'base')};
  cursor: default;
  margin-right: ${size('spacing.regular')};
`;

export default class Pagination extends Component {
  static propTypes = {
    current: number.isRequired,
    total: number.isRequired,
    margin: number.isRequired,
    range: number.isRequired,
    basePath: string.isRequired,
    pageParam: string.isRequired,
    className: string,
    palette: palettePropType,
  };

  static defaultProps = {
    current: 0,
    margin: 1,
    range: 5,
    palette: 'primary',
  };

  prevButton() {
    const {
      current, basePath, pageParam,
    } = this.props;

    if (current <= 0) return null;

    let delim = '?';
    if (basePath.indexOf(delim) > -1) {
      delim = '&';
    }
    const prev = current - 1;
    if (prev === 0) {
      return <ChevronLink to={basePath} />;
    }

    const prevHref = `${basePath}${delim}${pageParam}=${prev}`;
    return <ChevronLink to={prevHref} />;
  }

  nextButton() {
    const {
      current, total, basePath, pageParam,
    } = this.props;

    if (current >= total - 1) return null;

    let delim = '?';
    if (basePath && basePath.indexOf(delim) > -1) {
      delim = '&';
    }

    const next = current + 1;
    const nextHref = `${basePath}${delim}${pageParam}=${next}`;
    return <ChevronLink to={nextHref} flip />;
  }

  ellipsis = index => (
    <BreakView
      ghost
      palette="slate"
      key={index}
    >
      ...
    </BreakView>
  );

  pageButton(index) {
    const {
      current, basePath, pageParam, palette: paletteProp,
    } = this.props;
    const sel = current === index;
    let delim = '?';
    if (basePath && basePath.indexOf(delim) > -1) {
      delim = '&';
    }
    const palette = sel
      ? paletteProp
      : 'slate';
    const borderPalette = sel ? paletteProp : 'slate';

    const pageHref = (index === 0) ? basePath : `${basePath}${delim}${pageParam}=${index}`;

    return (
      <PageLink
        kind="label"
        key={index}
        ghost
        to={pageHref}
        palette={palette}
        borderPalette={borderPalette}
        selected={sel}
      >
        {index + 1}
      </PageLink>
    );
  }

  pagination() {
    // loop inspired by react-paginate
    const {
      current,
      range,
      total,
      margin,
    } = this.props;

    let leftSide = (range / 2);
    let rightSide = (range - leftSide);

    if (current > total - (range / 2)) {
      rightSide = total - current;
      leftSide = range - rightSide;
    } else if (current < range / 2) {
      leftSide = current;
      rightSide = range - leftSide;
    }

    let page;
    let breakView;

    const items = [];
    for (let index = 0; index < total; index += 1) {
      page = index + 1;

      if (page <= margin) {
        items.push(this.pageButton(index));
      } else if (page > total - margin) {
        items.push(this.pageButton(index));
      } else if ((index >= current - leftSide) && (index <= current + rightSide)) {
        items.push(this.pageButton(index));
      } else if (items[items.length - 1] !== breakView) {
        breakView = this.ellipsis(index);
        items.push(breakView);
      }
    }

    return items;
  }

  render() {
    const { className } = this.props;

    return (
      <Wrapper className={className}>
        { this.prevButton() }
        { this.pagination() }
        { this.nextButton() }
      </Wrapper>
    );
  }
}
