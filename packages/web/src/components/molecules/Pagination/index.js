import React, { Component } from 'react';
import { number, string, bool } from 'prop-types';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { palette as palettePropType } from 'sly/common/propTypes/palette';
import { size, palette } from 'sly/common/components/themes';
import { upTo } from 'sly/common/components/helpers';
import { Button, Icon, Block } from 'sly/common/components/atoms';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
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
      rotate={flip ? 2 : 0}
      icon="chevron"
      size="caption"
      palette="slate"
    />
  </Button>
))`
  margin-right: ${size('spacing.large')};
  width: 32px;
  height: 32px;
  padding: 0;
  line-height: normal;
`;

const PageLink = styled(Button)`
  margin-right: ${size('spacing.large')};
  width: 32px;
  height: 32px;
  padding: 0;
  line-height: normal;
  font-weight: normal;
  &:last-of-type {
    margin-right: 0;
  }
  ${ifProp('collapsedInMobile', upTo('tablet', 'display: none!important;'))}
`;

const BreakView = styled(Block)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: ${size('element.regular')};
  color: ${palette('slate', 'base')};
  border-color: ${palette('white', 'base')};
  cursor: default;
  width: 32px;
  height: 32px;
  margin-right: ${size('spacing.large')};
  ${ifProp('collapsedInMobile', upTo('tablet', 'display: none!important;'))}
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
    collapsedInMobile: bool,
  };

  static defaultProps = {
    current: 0,
    margin: 1,
    range: 5,
    palette: 'primary',
  };

  prevButton() {
    const {
      current, basePath, pageParam, collapsedInMobile,
    } = this.props;

    if (current <= 0 && !collapsedInMobile) return null;

    let delim = '?';
    if (basePath.indexOf(delim) > -1) {
      delim = '&';
    }
    const prev = current - 1;
    if (prev < 1) {
      return (
        <ChevronLink
          to={basePath}
          flip
          startingWithTablet={current === 0 ? {
            display: 'none!important',
          } : null}
        />
      );
    }

    const prevHref = `${basePath}${delim}${pageParam}=${prev}`;
    return <ChevronLink to={prevHref} flip />;
  }

  nextButton() {
    const {
      current, total, basePath, pageParam, collapsedInMobile,
    } = this.props;

    if (current >= total - 1) {
      if (!collapsedInMobile) return null;
      return (
        <ChevronLink
          to={basePath}
          startingWithTablet={{
            display: 'none!important',
          }}
        />
      );
    }

    let delim = '?';
    if (basePath && basePath.indexOf(delim) > -1) {
      delim = '&';
    }

    const next = current + 1;
    const nextHref = `${basePath}${delim}${pageParam}=${next}`;
    return <ChevronLink to={nextHref} />;
  }

  ellipsis = (index) => {
    const { collapsedInMobile } = this.props;

    return (
      <BreakView
        ghost
        palette="slate"
        key={index}
        collapsedInMobile={collapsedInMobile}
      >
        ...
      </BreakView>
    );
  }

  pageButton(index) {
    const {
      current, basePath, pageParam, palette: paletteProp, collapsedInMobile,
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
        collapsedInMobile={collapsedInMobile}
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
    const { className, current, total, collapsedInMobile } = this.props;

    return (
      <Wrapper className={className}>
        { this.prevButton() }
        { this.pagination() }
        {collapsedInMobile && (
          <Block
            startingWithTablet={{
              display: 'none!important',
            }}
            css={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '242px',
            }}
          >
            Page {current + 1} of {Math.ceil(total)}
          </Block>
        )}
        { this.nextButton() }
      </Wrapper>
    );
  }
}
