import React from 'react';
import { string, number } from 'prop-types';
import styled from 'styled-components';
import { prop, ifProp } from 'styled-tools';

import { size, palette } from 'sly/components/themes';
import Block from 'sly/components/atoms/Block';
import { getStageDetails } from 'sly/services/helpers/stage';

const TextBlock = styled(Block)`
  margin-bottom: ${size('spacing.regular')};
  white-space: nowrap;
`;

const Indicator = styled.span`
  width: ${size('spacing.xLarge')};
  padding: ${size('spacing.tiny')};
  margin-right: ${size('spacing.tiny')};
  margin-bottom: ${size('spacing.small')};
  background-color: ${ifProp('palette', palette(prop('palette'), 'base'), palette('slate', 'stroke'))}
`;

const Indicators = styled.span`
  display: flex;
`;

const Stage = ({
  stage, totalStage, className,
}) => {
  const { level: currentStage, palette } = getStageDetails(stage);
  const indicators = [];
  for (let i = 0; i < totalStage; i += 1) {
    let indicatorPalette = null;
    if (i < currentStage) {
      indicatorPalette = palette;
    }
    indicators.push((
      <Indicator key={`indicator_${i}`} palette={indicatorPalette} />
    ));
  }
  return (
    <div className={className}>
      <TextBlock size="caption">{stage}</TextBlock>
      <Indicators>{indicators}</Indicators>
    </div>
  );
};

Stage.propTypes = {
  stage: string.isRequired,
  totalStage: number,
  palette: string,
  className: string,
};

Stage.defaultProps = {
  totalStage: 5,
  palette: 'primary',
};

export default Stage;
