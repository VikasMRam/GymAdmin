import React from 'react';
import { func, string } from 'prop-types';
import styled from 'styled-components';

import { size, assetPath } from 'sly/components/themes';
import pad from 'sly/components/helpers/pad';
import { Button, Box, ResponsiveImage, Block } from 'sly/components/atoms';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-gap: ${size('spacing.xxLarge')};
`;

const PaddedBlock = pad(Block);

const AskAgentAdTile = ({
  title, description, onAskExpertQuestionClick, className,
}) => (
  <Box className={className}>
    <Wrapper>
      <ResponsiveImage src={assetPath('images/agents.png')} />
      <div>
        <PaddedBlock weight="medium" size="subtitle">{title}</PaddedBlock>
        {description && <PaddedBlock>{description}</PaddedBlock>}
        <Button onClick={onAskExpertQuestionClick}>Ask Our Experts A Question</Button>
      </div>
    </Wrapper>
  </Box>
);

AskAgentAdTile.propTypes = {
  onAskExpertQuestionClick: func,
  title: string.isRequired,
  description: string,
  className: string,
};

export default AskAgentAdTile;
