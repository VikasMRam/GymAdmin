import React, { useState, useCallback } from 'react';
import { oneOf } from 'prop-types';
import styled, { css } from 'styled-components';

import { upTo, startingWith } from 'sly/common/components/helpers';
import Block from 'sly/common/components/atoms/Block';
import { withSpacing, withMedia, withDisplay, withColor, withElementSize, withText } from 'sly/common/components/helpers';
import Radio from 'sly/web/components/molecules/Radio';
import Checkbox from 'sly/web/components/molecules/Checkbox';
import { size, palette } from 'sly/common/components/themes';

const Row = styled.div(
  withSpacing,
  withElementSize,
  css`
    display: flex;
    align-items: center;
    cursor: pointer;
    > * {
      flex-grow: 0;
    }
  `,
);

const Label = styled.label(
  withText,
  withSpacing,
  withColor,
  withMedia,
  css`
    display: block;
    flex-grow: 1;
    ${upTo('tablet', css`
      margin-right: ${size('spacing.large')};
    `)}
    ${startingWith('tablet', css`
      margin-left: ${size('spacing.large')};
      order: 1;
    `)}
  `,
);

const Title = styled.div(
  withSpacing,
  withColor,
);

const CheckboxRow = ({ checked, label, ...props }) => (
  <Row
    marginBottom="regular"
    elementSize="regular"
    {...props}
  >
    <Label size="caption">
      {label}
    </Label>
    <Checkbox checked={checked} />
  </Row>
);

const RadioRow = ({ label, description, checked, ...props }) => (
  <Row
    marginBottom={!description ? 'regular' : 'xLarge'}
    {...props}
  >
    <Label palette="slate.lighter-30" size="caption">
      <Title
        palette="slate.base"
        marginBottom={!description ? 'none' : 'small'}
      >
        {label}
      </Title>
      {description}
    </Label>
    <Radio
      checked={checked}
      marginRight="0"
    />
  </Row>
);

const FilterChoice = ({ type, filter, options, onChange, value = [], ...props }) => {
  if (!Array.isArray(value)) {
    value = [value];
  }

  const change = useCallback((checked, optionValue) => {
    if (checked) {
      onChange(filter, value.filter(x => x !== optionValue));
    } else {
      const currentValue = type === 'radio'
        ? []
        : [...value];
      onChange(filter, [...currentValue, optionValue]);
    }
  }, [value, onChange]);

  return (
    <Block
      padding="xLarge 0"
    >
      {options.map(({ label, value: optionValue, description }) => {
        const Row = type === 'checkbox'
          ? CheckboxRow
          : RadioRow;
        const checked = value.includes(optionValue);
        return (
          <Row
            key={optionValue}
            onClick={() => change(checked, optionValue)}
            checked={checked}
            label={label}
            description={description}
          />
        );
      })}
    </Block>
  );
};

FilterChoice.propTypes = {
  type: oneOf(['checkbox', 'radio']).isRequired,
};

export default FilterChoice;
