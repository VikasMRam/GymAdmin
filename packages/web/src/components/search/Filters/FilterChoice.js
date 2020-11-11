import React, { useState, useCallback } from 'react';
import { oneOf } from 'prop-types';
import styled, { css } from 'styled-components';

import Block from 'sly/common/components/atoms/Block';
import { withSpacing, withDisplay, withColor } from 'sly/common/components/helpers';
import Radio from 'sly/web/components/molecules/Radio';
import Checkbox from 'sly/web/components/molecules/Checkbox';
import { palette } from 'sly/common/components/themes';

const Row = styled.div(
  withSpacing,
  css`
    display: flex;
    > * {
      flex-grow: 0;
    }
  `,
);

const Label = styled.label(
  withColor,
  css`
    display: block;
    flex-grow: 1;
  `
);

const Title = styled.div`
  color: ${palette('slate.base')};
`;

const CheckboxRow = ({ checked, label, description }) => (
  <Row marginBottom="regular">
    <Checkbox checked={checked} />
    <Label color="slate">{label}</Label>
  </Row>
);

const RadioRow = ({ label, description, checked }) => (
  <Row
    marginBottom={!description ? 'regular' : 'xLarge'}
  >
    <Label color="slate.lighter-30">
      <Title>{label}</Title>
      {description}
    </Label>
    <Radio checked={checked} />
  </Row>
);


const FilterChoice = ({ type, options, onChange, value = [], ...props }) => {
  if (!Array.isArray(value)) {
    value = [value];
  }

  console.log('options', options, value);
  const change = useCallback((checked, optionValue) => {
    if (checked) {
      onChange(value.filter(x => x !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  }, [value, onChange]);

  return (
    <Block
      padding="xLarge"
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
