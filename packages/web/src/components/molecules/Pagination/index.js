import React, { Component } from 'react';
import { number, string, bool } from 'prop-types';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { palette as palettePropType } from 'sly/common/propTypes/palette';
import { Block, Button, ToggleButton, space, sx, color } from 'sly/common/system';
import { Chevron } from 'sly/common/icons';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ChevronLink = styled(({ flip, ...props }) => (
  <Button
    variant="neutral"
    pallete="slate"
    onClick={() => window.scrollTo(0, 0)}
    {...props}
  >
    <Chevron
      sx={{
        display: 'block',
        margin: 'auto',
      }}
      rotation={flip ? 270 : 90}
      size="s"
      color="slate"
    />
  </Button>
))`
  margin-right: ${space('m')};
  width: 32px !important;
  height: 32px !important;
  padding: 0 !important;
  min-height:unset !important;
  line-height: normal;
  ${ifProp('collapsedInMobile', sx({
    marginRight: '0',
    '@tablet': {
      marginRight: 'm',
    },
  }))}
`;

const PageLink = styled(ToggleButton)`
  margin-right: ${space('m')};
  width: 32px !important;
  height: 32px !important;
  min-height:unset !important;
  padding: 0 !important;
  &:last-of-type {
    margin-right: 0;
  }
  ${ifProp('collapsedInMobile', sx({
    display: 'none',
    '@tablet': {
      display: 'block',
    },
  }))}
`;

const BreakView = styled(Block)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: ${space('xs')};
  color: ${color('slate.base')};
  border-color: ${color('white.base')};
  cursor: default;
  width: 32px;
  height: 32px;
  margin-right: ${space('spacing.m')};
  ${ifProp('collapsedInMobile', sx({
    display: 'none',
    '@tablet': {
      display: 'block',
    },
  }))}
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
          collapsedInMobile={collapsedInMobile}
          sx$tablet={current === 0 ? {
            display: 'none!important',
          } : null}
        />
      );
    }

    const prevHref = `${basePath}${delim}${pageParam}=${prev}`;
    return <ChevronLink to={prevHref} collapsedInMobile={collapsedInMobile} flip />;
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
          collapsedInMobile={collapsedInMobile}
          sx$tablet={{
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
    return <ChevronLink to={nextHref} collapsedInMobile={collapsedInMobile} />;
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
      current, basePath, pageParam, collapsedInMobile,
    } = this.props;
    const sel = current === index;
    let delim = '?';
    if (basePath && basePath.indexOf(delim) > -1) {
      delim = '&';
    }


    const pageHref = (index === 0) ? basePath : `${basePath}${delim}${pageParam}=${index}`;

    return (
      <PageLink
        kind="label"
        key={index}
        to={pageHref}
        onChange={() => window.scrollTo(0, 0)}
        collapsedInMobile={collapsedInMobile}
        value={sel}
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
            sx$tablet={{
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
