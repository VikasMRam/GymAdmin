import React from 'react';
import styled from 'styled-components';
import { func, bool } from 'prop-types';

import pad from 'sly/components/helpers/pad';
import { size } from 'sly/components/themes';
import { Box, Block } from 'sly/components/atoms';
import IconButton from 'sly/components/molecules/IconButton';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Heading = pad(Block, 'regular');
Heading.displayName = 'Heading';

const Desc = styled(Block)`
  margin-right: ${size('spacing.xLarge')};
`;

const PutFamilyOnPause = ({ onTogglePause, isPaused }) => (
  <Box>
    <Heading size="caption">Put family on Pause</Heading>
    <Wrapper>
      <Desc palette="grey" size="tiny">Place a family on Pause when you are still working with them but they temporarily need to pause their search.</Desc>
      <IconButton
        icon="toggle-off"
        iconSize="regular"
        palette={isPaused ? 'primary' : 'grey'}
        transparent
        onClick={onTogglePause}
      />
    </Wrapper>
  </Box>
);

PutFamilyOnPause.propTypes = {
  onTogglePause: func,
  isPaused: bool,
};

export default PutFamilyOnPause;
