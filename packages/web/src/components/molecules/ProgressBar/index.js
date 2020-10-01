import React from 'react';
import { bool, number } from 'prop-types';

import { getKey } from 'sly/common/components/themes';
import { palette as palettePropType } from 'sly/common/propTypes/palette';
import { Block } from 'sly/common/components/atoms';

const getBarWidth = (current, limit) => (current / limit) * 100;

const ProgressBar = ({ label, palette, totalSteps, currentStep, ...props }) => (
  <Block {...props}>
    {label && (
      <Block
        pad="medium"
        size="tiny"
        weight="bold"
        palette="grey"
        data-testid="Label"
      >
        {currentStep} OF {totalSteps}
      </Block>
    )}
    <Block palette={palette} background={palette} backgroundVariation="filler" borderRadius="xLarge">
      <Block
        background={palette}
        borderRadius="small"
        height={getKey('sizes.spacing.small')}
        width={`${getBarWidth(currentStep, totalSteps)}%`}
        transition="width"
        speed="slow.inOut"
        data-testid="Bar"
      />
    </Block>
  </Block>
);

ProgressBar.propTypes = {
  palette: palettePropType,
  totalSteps: number.isRequired,
  currentStep: number.isRequired,
  label: bool,
};

ProgressBar.defaultProps = {
  palette: 'primary',
  currentStep: 1,
};

export default ProgressBar;
