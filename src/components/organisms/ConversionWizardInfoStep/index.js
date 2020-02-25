import React from 'react';
import styled from 'styled-components';
import { string, func, arrayOf } from 'prop-types';

import { size } from 'sly/components/themes';
import pad from 'sly/components/helpers/pad';
import shadow from 'sly/components/helpers/shadow';
import { Heading, Button, Block, Box } from 'sly/components/atoms';
import ListItem from 'sly/components/molecules/ListItem';

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-gap: ${size('spacing.large')};
`;
ButtonWrapper.displayName = 'ButtonWrapper';

const ShadowBox = shadow(Box);

const PaddedHeading = pad(Heading);
PaddedHeading.displayName = 'PaddedHeading';

const PaddedBlock = pad(Block);
PaddedBlock.displayName = 'PaddedBlock';

const PointsWrapper = pad(styled.div``);

const ConversionWizardInfoStep = ({ heading, description, button1Text, button2Text, onButton1Click, onButton2Click, points }) => (
  <ShadowBox>
    <PaddedHeading size="subtitle" weight="medium">{heading}</PaddedHeading>
    <PaddedBlock weight="medium">{description}</PaddedBlock>
    <PointsWrapper>
      {points.map(p => <ListItem iconPalette="secondary" iconVariation="dark" icon="checkmark-circle" key={p}>{p}</ListItem>)}
    </PointsWrapper>
    <ButtonWrapper>
      <Button onClick={onButton1Click} ghost>{button1Text}</Button>
      <Button onClick={onButton2Click} ghost>{button2Text}</Button>
    </ButtonWrapper>
  </ShadowBox>
);

ConversionWizardInfoStep.propTypes = {
  heading: string.isRequired,
  description: string.isRequired,
  button1Text: string.isRequired,
  button2Text: string.isRequired,
  onButton1Click: func,
  onButton2Click: func,
  points: arrayOf(string).isRequired,
};

export default ConversionWizardInfoStep;
