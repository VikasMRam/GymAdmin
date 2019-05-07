import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import { node } from 'prop-types';

import { TextTd, LinkTd, StageTd, DoubleLineTd, TextIconTd, DoubleLineDiv } from 'sly/components/molecules/Td';

const TdWrapper = ({ children }) => (
  <table>
    <tbody>
      <tr>
        {children}
      </tr>
    </tbody>
  </table>
);

TdWrapper.propTypes = {
  children: node,
};

const FixedWidthWrapper = styled.tr`
  width: 200px;
`;

const FixedWidthTdWrapper = ({ children }) => (
  <table>
    <tbody>
      <FixedWidthWrapper>
        {children}
      </FixedWidthWrapper>
    </tbody>
  </table>
);

FixedWidthTdWrapper.propTypes = {
  children: node,
};

storiesOf('Molecules|Td', module)
  .add('default', () => (
    <TdWrapper><TextTd>Kendrick Chaimberlain</TextTd></TdWrapper>
  ))
  .add('Link', () => (
    <TdWrapper><LinkTd href="/">Taylor Kennedy</LinkTd></TdWrapper>
  ))
  .add('Stage', () => (
    <TdWrapper><StageTd text="New" currentStage={1} /></TdWrapper>
  ))
  .add('DoubleLine', () => (
    <TdWrapper><DoubleLineTd firstLine="Sent another message through app" secondLine="10/10/2019" /></TdWrapper>
  ))
  .add('Text Overflow', () => (
    <FixedWidthTdWrapper>
      <TextTd clip>Dominique Dominguez Drommelders</TextTd>
    </FixedWidthTdWrapper>
  ))
  .add('disabled default', () => (
    <TdWrapper><TextTd disabled>Kendrick Chaimberlain</TextTd></TdWrapper>
  ))
  .add('disabled Link', () => (
    <TdWrapper><LinkTd href="/" disabled>Taylor Kennedy</LinkTd></TdWrapper>
  ))
  .add('disabled Stage', () => (
    <TdWrapper><StageTd text="Active Tours" currentStage={2} disabled /></TdWrapper>
  ))
  .add('disabled DoubleLine', () => (
    <TdWrapper>
      <DoubleLineTd firstLine="Harry is out of the country for the month for some performances" secondLine="10/10/2019" disabled />
    </TdWrapper>
  ))
  .add('disabled TextIconTd with clip', () => (
    <FixedWidthTdWrapper>
      <TextIconTd icon="pause" iconPalette="danger" disabled clip>Harry Erik Sámuel Weisz Houdini</TextIconTd>
    </FixedWidthTdWrapper>
  ))
  .add('DoubleLineDiv', () => (
    <DoubleLineDiv firstLine="Sent another message through app" secondLine="10/10/2019" />
  ))
  .add('disabled DoubleLineDiv', () => (
    <DoubleLineDiv firstLine="Harry is out of the country for the month for some performances" secondLine="10/10/2019" disabled />
  ));
