import React, { Component, Fragment } from 'react';
import { number, func } from 'prop-types';
import styled, { css } from 'styled-components';
import { palette } from 'styled-theme';
import { ifProp } from 'styled-tools';

import { Button, Icon } from 'sly/components/atoms';
import { styles as buttonStyles } from 'sly/components/atoms/Button';
import { size } from 'sly/components/themes';

const Wrapper = styled.div`
  display: flex;
`;

const marginLeftNext = css`
  margin-left: calc(${size('spacing.large')} - ${size('spacing.regular')});
`;

const ChevronButton = styled(({ flip, ...props }) => (
  <Button palette="grayscale" ghost {...props}>
    <Icon 
      flip={flip}
      icon="chevron-left" 
      size="small" 
      palette="grayscale"
    />
  </Button>
))`
  margin-right: ${ifProp('flip', 0, size('spacing.large'))};
  ${ifProp('flip', marginLeftNext, 0)}
`;

const PageButton = styled(Button)`
  margin-right: ${size('spacing.regular')};
  &:last-of-type {
    margin-right: 0;
  }
`;

const BreakView = styled.span`
  ${buttonStyles};
  color: ${palette('grayscale', 0)};
  cursor: default;
  margin-right: ${size('spacing.regular')};
`;

export default class Pagination extends Component {
  static propTypes = {
    current: number.isRequired,
    total: number.isRequired,
    margin: number.isRequired,
    range: number.isRequired,
    onChange: func.isRequired,
  };

  static defaultProps = {
    current: 0,
    margin: 1,
    range: 5,
  };

  prevButton() {
    const { current, total, onChange } = this.props;

    if (current <= 0) return null;

    const prev = () => onChange(current - 1);
    return <ChevronButton onClick={prev} />;
  }

  nextButton() {
    const { current, total, onChange } = this.props;

    if (current >= total - 1) return null;

    const next = () => onChange(current + 1);
    return <ChevronButton onClick={next} flip />
  }

  ellipsis(index) {
    return (
      <BreakView 
        ghost 
        palette="grayscale"
        key={index}
      >
        ...
      </BreakView>
    );
  }

  pageButton(index) {
    const { current, onChange } = this.props;
    const sel = current === index;
    const palette = sel
      ? 'primary'
      : 'grayscale';
    const click = () => !sel && onChange(index);
    return (
      <PageButton 
        key={index}
        ghost={!sel} 
        palette={palette}
        onClick={click}>
          { index + 1 }
      </PageButton>
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

    let leftSide  = (range / 2);
    let rightSide = (range - leftSide);

    if (current > total - range / 2) {
      rightSide = total - current;
      leftSide  = range - rightSide;
    } else if (current < range / 2) {
      leftSide  = current;
      rightSide = range - leftSide;
    }

    let page;
    let breakView;

    const items = [];
    for (let index = 0; index < total; index++) {
      page = index + 1;

      if (page <= margin) {
        items.push(this.pageButton(index));
        continue;
      }

      if (page > total - margin) {
        items.push(this.pageButton(index));
        continue;
      }

      if ((index >= current - leftSide) && (index <= current + rightSide)) {
        items.push(this.pageButton(index));
        continue;
      }

      if (items[items.length - 1] !== breakView) {
        breakView = this.ellipsis(index);
        items.push(breakView);
      }
    }

    return items;
  }
  
  render() {
    const { current, total, onChange } = this.props;

    return (
      <Wrapper>
        { this.prevButton() }
        { this.pagination() }
        { this.nextButton() }
      </Wrapper>
    );
  }
}

