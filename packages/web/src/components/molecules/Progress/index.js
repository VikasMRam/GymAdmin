import React from 'react';
import { arrayOf, string } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/common/components/themes';
import { Block } from 'sly/web/components/atoms';
import { textAlign } from 'sly/web/components/helpers/text';

const Bubble = styled.div`
  height: ${size('text.tiny')};
  width: ${size('text.tiny')};
  background-color: ${ifProp(['checked', 'filled'], palette('slate', 'base'), palette('white', 'base'))};
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
        margin-top: calc(${size('text.tiny')}/4);
        margin-left: calc(${size('text.tiny')} - ${size('border.large')});
        background-color: ${ifProp('pathHighlighted', palette('slate', 'base'), palette('grey', 'filler'))};
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

const Progress = ({ steps, currentStep }) => {
  const currentStepIndex = steps.indexOf(currentStep);
  return (
    <Wrapper>
      {steps.map((s, i) => (
        <div key={s}>
          <CenteredBlock
            weight="bold"
            size="tiny"
            palette={i <= currentStepIndex ? 'slate' : 'grey'}
            variation={i <= currentStepIndex ? 'base' : 'filler'}
          >
            {s}
          </CenteredBlock>
          <Bubble
            hasPath={i !== steps.length - 1}
            pathHighlighted={i < currentStepIndex}
            filled={(i === 0 && currentStepIndex === 0) || i < currentStepIndex}
            checked={i <= currentStepIndex}
          />
        </div>
      ))}
    </Wrapper>
  );
};

Progress.propTypes = {
  steps: arrayOf(string).isRequired,
  currentStep: string,
};

export default Progress;
