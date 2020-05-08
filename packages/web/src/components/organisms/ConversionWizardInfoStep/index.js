import React from 'react';
import styled from 'styled-components';
import { string, arrayOf, shape, object } from 'prop-types';

import { size } from 'sly/components/themes';
import pad from 'sly/components/helpers/pad';
import shadow from 'sly/components/helpers/shadow';
import { Heading, Button, Block, Box } from 'sly/components/atoms';
import ListItem from 'sly/components/molecules/ListItem';

const ButtonWrapper = styled.div`
  display: grid;
  grid-gap: ${size('spacing.large')};
`;
ButtonWrapper.displayName = 'ButtonWrapper';

const ShadowBox = shadow(Box);

const PaddedHeading = pad(Heading);
PaddedHeading.displayName = 'PaddedHeading';

const PaddedBlock = pad(Block);
PaddedBlock.displayName = 'PaddedBlock';

const PointsWrapper = pad(styled.div``);

const ConversionWizardInfoStep = ({ heading, description, buttons, points }) => (
  <ShadowBox>
    <PaddedHeading size="subtitle" weight="medium">{heading}</PaddedHeading>
    <PaddedBlock weight="medium">{description}</PaddedBlock>
    <PointsWrapper>
      {points.map(p => <ListItem iconPalette="secondary" iconVariation="dark" icon="checkmark-circle" key={p}>{p}</ListItem>)}
    </PointsWrapper>
    <ButtonWrapper>
      {buttons.map(b => <Button {...b.props} ghost key={b.text}>{b.text}</Button>)}
    </ButtonWrapper>
  </ShadowBox>
);

ConversionWizardInfoStep.propTypes = {
  heading: string.isRequired,
  description: string.isRequired,
  buttons: arrayOf(shape({
    text: string.isRequired,
    props: object.isRequired,
  })).isRequired,
  points: arrayOf(string).isRequired,
};

export default ConversionWizardInfoStep;
