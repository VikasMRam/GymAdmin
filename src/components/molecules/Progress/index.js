import React from 'react';
import { arrayOf, string } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/components/themes';
import textAlign from 'sly/components/helpers/textAlign';
import { Block } from 'sly/components/atoms';

const Bubble = styled.div`
  height: ${size('icon.tiny')};
  width: ${size('icon.tiny')};
  background-color: ${ifProp('checked', palette('slate', 'base'), palette('white', 'base'))};
  border: ${size('border.large')} solid ${ifProp('checked', palette('slate', 'base'), palette('grey', 'filler'))};
  border-radius: 50%;
  display: inline-block;
  margin-left: calc(${size('element.xHuge')}/2 - ${size('border.large')});

  ${ifProp('hasPath',
    css`
      &:after {
        content: "";
        display: block;
        width: ${size('element.xHuge')};
        height: ${size('border.large')};
        margin-top: calc(${size('icon.tiny')}/4);
        margin-left: calc(${size('icon.tiny')} - ${size('border.large')});
        background-color: ${palette('grey', 'filler')};
      }
    `,
  )}
`;

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, ${size('element.xHuge')});
`;

const CenteredBlock = textAlign(Block);
CenteredBlock.displayName = 'CenteredBlock';

const Progress = ({ steps, currentStep }) => (
  <Wrapper>
    {steps.map((s, i) => (
      <div key={s}>
        <CenteredBlock weight="bold" size="tiny" palette={currentStep === s ? 'slate' : 'grey'} variation={currentStep === s ? 'base' : 'filler'}>{s}</CenteredBlock>
        <Bubble hasPath={i !== steps.length - 1} checked={currentStep === s} />
      </div>
    ))}
  </Wrapper>
);

Progress.propTypes = {
  steps: arrayOf(string).isRequired,
  currentStep: string,
};

export default Progress;
