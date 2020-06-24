import React from 'react';
import styled from 'styled-components';
import { bool, number, string } from 'prop-types';
import { prop } from 'styled-tools';

import { size, palette, key } from 'sly/web/components/themes';
import { palette as palettePropType } from 'sly/web/propTypes/palette';
import pad from 'sly/web/components/helpers/pad';
import Block from 'sly/web/components/atoms/Block';

const Wrapper = styled.div`
  background-color: ${palette('filler')};
  border-radius: ${size('spacing.xLarge')};
`;

const Bar = styled.div`
  background-color: ${palette('base')};
  height: ${size('spacing.small')};
  width: ${prop('width')}%;
  transition: width ${key('transitions.slow.inOut')};
  border-radius: ${size('spacing.xLarge')};
`;

const PaddedBlock = pad(Block, 'medium');
PaddedBlock.displayName = 'PaddedBlock';

const getBarWidth = (current, limit) => (current / limit) * 100;

const ProgressBar = ({ label, palette, totalSteps, currentStep, className }) => (
  <div className={className}>
    {label && <PaddedBlock size="tiny" weight="bold" palette="grey">{currentStep} OF {totalSteps}</PaddedBlock>}
    <Wrapper palette={palette}>
      <Bar palette={palette} width={getBarWidth(currentStep, totalSteps)} />
    </Wrapper>
  </div>
);

ProgressBar.propTypes = {
  palette: palettePropType,
  totalSteps: number.isRequired,
  currentStep: number.isRequired,
  label: bool,
  className: string,
};

ProgressBar.defaultProps = {
  palette: 'primary',
  currentStep: 1,
};

export default ProgressBar;