import React, { forwardRef, useCallback } from 'react';
import { oneOf } from 'prop-types';
import styled from 'styled-components';

import { Radio, Checkbox } from 'sly/common/icons';
import { Block } from 'sly/common/system';


const Row = styled(Block)`
    display: flex;
    align-items: center;
    cursor: pointer;
    > * {
      flex-grow: 0;
    }
`;

const Label = forwardRef(({ children, ...props }, ref) => (
  <Block
    flexGrow="1 !important"
    marginRight="m"
    sx$tablet={{
     marginLeft: 'm',
     marginRight: 'unset',
     order: 1,
   }}
    as="label"
    {...props}
    ref={ref}
  >
    {children}
  </Block>
));


// const Label = styled(Block)`
//     display: block;
//     flex-grow: 1;
//     ${upTo('tablet', css`
//       margin-right: ${size('spacing.large')};
//     `)}
//     ${startingWith('tablet', css`
//       margin-left: ${size('spacing.large')};
//       order: 1;
//     `)}
//   `


const CheckboxRow = ({ checked, label, ...props }) => (
  <Row
    marginBottom="xs"
    height="2.5rem"
    {...props}
  >
    <Label
      sx$laptop={{
        cursor: 'pointer',
      }}
      font="body-s"
    >
      {label}
    </Label>
    <Checkbox
      minWidth="24px"
      hoverColor="viridian.lighter-90"
      color="viridian.base"
      active={checked}
      size="m"
    />
  </Row>
);

const RadioRow = ({ label, description, checked, ...props }) => (
  <Row
    marginBottom="l"
    {...props}
  >
    <Label
      sx$laptop={{
        cursor: 'pointer',
      }}
      color="slate.lighter-30"
      font="body-s"
    >
      <Block
        color="slate.base"
        marginBottom={!description ? 'none' : 'xxs'}
      >
        {label}
      </Block>
      {description}
    </Label>
    <Radio
      minWidth="24px"
      size="m"
      hoverColor="viridian.lighter-90"
      color="viridian.base"
      active={checked}
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
    <>
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
    </>
  );
};

FilterChoice.propTypes = {
  type: oneOf(['checkbox', 'radio']).isRequired,
};

export default FilterChoice;
