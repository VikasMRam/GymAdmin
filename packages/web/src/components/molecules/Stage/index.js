import React from 'react';
import { string, number, oneOf, oneOfType } from 'prop-types';
import styled from 'styled-components';
import { prop, ifProp } from 'styled-tools';

import { size, palette } from 'sly/web/components/themes';
import Block from 'sly/web/components/atoms/Block';
import { getStageDetails } from 'sly/web/services/helpers/stage';
import { getTaskStatusDetails } from 'sly/web/services/helpers/task';

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
  stage, stageLabel, totalStage, className, stageType,
}) => {
  let currentStage;
  let palette;
  if (stageType === 'family') {
    ({ level: currentStage, palette } = getStageDetails(stage));
  } else {
    ({ level: currentStage, palette, totalStage } = getTaskStatusDetails(stage));
  }

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
      <TextBlock size="caption">{stageLabel || stage}</TextBlock>
      <Indicators>{indicators}</Indicators>
    </div>
  );
};

Stage.propTypes = {
  stage: oneOfType([string, number]).isRequired,
  stageLabel: string,
  totalStage: number,
  className: string,
  stageType: oneOf(['family', 'task']),
};

Stage.defaultProps = {
  totalStage: 5,
  stageType: 'family',
};

export default Stage;
