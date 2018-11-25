import React, { Component } from 'react';
import { number, string } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { Link, Icon } from 'sly/components/atoms';
import { styles as buttonStyles } from 'sly/components/atoms/Button';
import { size, palette } from 'sly/components/themes';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: ${size('spacing.regular')}
`;

const marginLeftNext = css`
  margin-left: calc(${size('spacing.large')} - ${size('spacing.regular')});
`;
const StyledLink = styled(Link)`
  ${buttonStyles};
`;
const ChevronLink = styled(({ flip, ...props }) => (
  <StyledLink
    ghost
    palette="slate"
    kind="label"
    {...props}
  >
    <Icon
      flip={flip}
      icon="chevron-left"
      size="small"
      palette="slate"
    />
  </StyledLink>
))`
  margin-right: ${ifProp('flip', 0, size('spacing.large'))};
  ${ifProp('flip', marginLeftNext, 0)};
`;

const PageLink = styled(Link)`
 ${buttonStyles};
  margin-right: ${size('spacing.regular')};
  margin-bottom: ${size('spacing.regular')};
  &:last-of-type {
    margin-right: 0;
  }
`;

const BreakView = styled.span`
  ${buttonStyles};
  color: ${palette('slate', 'filler')};
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
  };

  static defaultProps = {
    current: 0,
    margin: 1,
    range: 5,
  };

  prevButton() {
    const { current, basePath, pageParam } = this.props;

    if (current <= 0) return null;

    let delim = '?';
    if (basePath.indexOf(delim) > -1) {
      delim = '&';
    }
    const prev = current - 1;
    if (prev === 0) {
      return <ChevronLink href={basePath} />;
    }

    const prevHref = `${basePath}${delim}${pageParam}=${prev}`;
    return <ChevronLink href={prevHref} />;
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
    return <ChevronLink href={nextHref} flip />;
  }

  ellipsis = index => (
    <BreakView
      ghost
      kind="label"
      palette="slate"
      key={index}
    >
      ...
    </BreakView>
  );

  pageButton(index) {
    const { current, basePath, pageParam } = this.props;
    const sel = current === index;
    let delim = '?';
    if (basePath && basePath.indexOf(delim) > -1) {
      delim = '&';
    }
    const palette = sel
      ? 'primary'
      : 'slate';

    const pageHref = (index === 0) ? basePath : `${basePath}${delim}${pageParam}=${index}`;

    return (
      <PageLink
        kind="label"
        key={index}
        ghost={!sel}
        palette={palette}
        href={pageHref}
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
    return (
      <Wrapper>
        { this.prevButton() }
        { this.pagination() }
        { this.nextButton() }
      </Wrapper>
    );
  }
}
