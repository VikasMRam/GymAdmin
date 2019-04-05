import React from 'react';
import { string, number, bool } from 'prop-types';
import styled, { css } from 'styled-components';
import { prop, ifProp } from 'styled-tools';

import { size, palette } from 'sly/components/themes';
import { Block } from 'sly/components/atoms';

const Wrapper = styled.span`
`;

const TextBlock = styled(Block)`
  margin-bottom: ${size('spacing.regular')};
  ${ifProp('disabled', css`
    color: ${palette('slate', 'filler')};
  `)}
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
  text, totalStage, currentStage, palette, disabled,
}) => {
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
    <Wrapper>
      <TextBlock size="caption" disabled={disabled}>{text}</TextBlock>
      <Indicators>{indicators}</Indicators>
    </Wrapper>
  );
};

Stage.propTypes = {
  text: string.isRequired,
  currentStage: number.isRequired,
  totalStage: number,
  palette: string,
  disabled: bool,
};

Stage.defaultProps = {
  totalStage: 5,
  palette: 'primary',
};

export default Stage;
