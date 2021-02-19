import React from 'react';
import styled, { css } from 'styled-components';
import { string } from 'prop-types';

import { topics } from 'sly/web/components/resourceCenter/helper';
import Block from 'sly/common/components/atoms/Block';
import { withBorder } from 'sly/common/components/helpers';

const Topic = styled(Block)(
  withBorder,
  css`
    text-transform: uppercase;
  `,
);

const TopicTag = ({ topic }) => (
  <Topic
    display="inline-block"
    width="max-content"
    font="label"
    paddingX="xs"
    paddingY="xxs"
    marginTop="auto"
    borderRadius="small"
    background="viridian.base"
    palette="white"
  >
    {topics.find(({ label }) => label === topic)?.value}
  </Topic>
);

TopicTag.propTypes = {
  topic: string,
};

export default TopicTag;
