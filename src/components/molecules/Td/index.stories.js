import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import { TextTd, LinkTd, StageTd, DoubleLineTd, TextIconTd } from 'sly/components/molecules/Td';

const FixedWidthWrapper = styled.div`
  width: 200px;
`;

storiesOf('Atoms|Td', module)
  .add('default', () => (
    <TextTd>Kendrick Chaimberlain</TextTd>
  ))
  .add('Link', () => (
    <LinkTd href="/">Taylor Kennedy</LinkTd>
  ))
  .add('Stage', () => (
    <StageTd text="New" currentStage={1} />
  ))
  .add('DoubleLine', () => (
    <DoubleLineTd firstLine="Sent another message through app" secondLine="10/10/2019" />
  ))
  .add('Text Overflow', () => (
    <FixedWidthWrapper>
      <TextTd>Dominique Dominguez Drommelders</TextTd>
    </FixedWidthWrapper>
  ))
  .add('disabled default', () => (
    <TextTd disabled>Kendrick Chaimberlain</TextTd>
  ))
  .add('disabled Link', () => (
    <LinkTd href="/" disabled>Taylor Kennedy</LinkTd>
  ))
  .add('disabled Stage', () => (
    <StageTd text="Active Tours" currentStage={2} disabled />
  ))
  .add('disabled DoubleLine', () => (
    <DoubleLineTd firstLine="Harry is out of the country for the month for some performances" secondLine="10/10/2019" disabled />
  ))
  .add('disabled TextIconTd', () => (
    <FixedWidthWrapper>
      <TextIconTd icon="pause" iconPalette="danger" disabled>Harry Erik Sámuel Weisz Houdini</TextIconTd>
    </FixedWidthWrapper>
  ));
