import React, { Component, Fragment } from 'react';
import { number, func } from 'prop-types';
import styled from 'styled-components';

import { Button, Icon } from 'sly/components/atoms';
import IconButton from 'sly/components/molecules/IconButton';

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

`;

export default class Pagination extends Component {
  static propTypes = {
    current: number.isRequired,
    total: number.isRequired,
    onChange: func.isRequired,
  };

  static defaultProps = {
    current: 0,
  };

  prevButton() {
    const { current, total, onChange } = this.props;

    if (current <= 0) {
      return null;
    }

    const prev = () => onChange(current - 1);

    return <ChevronButton />;
  }

  nextButton() {
    const { current, total, onChange } = this.props;

    if (current >= total - 1) {
      return null;
    }

    const next = () => onChange(current + 1);

    return <ChevronButton onChange={next} flip />
  }

  render() {
    const { current, total, onChange } = this.props;

    return (
      <Fragment>
        { this.prevButton() }
        { this.nextButton() }
      </Fragment>
    );
  }
}

