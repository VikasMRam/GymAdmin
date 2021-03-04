import React from 'react';
import styled, { css } from 'styled-components';
import { array, string } from 'prop-types';

import { topics } from 'sly/web/components/resourceCenter/helper';
import Block from 'sly/common/components/atoms/Block';
import { withBorder, withDisplay } from 'sly/common/components/helpers';

const Tag = styled(Block)(
  withBorder,
  css`
    text-transform: uppercase;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
);

const TagsWrap = styled(Block)(withDisplay);

const ArticleTags = ({ topic, tagsList }) => (
  <>
    {tagsList?.filter(({ value }) => value).length ? (
      <TagsWrap display="flex" flexWrap="wrap" flexGrow={1} alignItems="flex-end" alignContent="flex-end">
        {tagsList.map(({ value, id }) => (
          <Tag
            key={id}
            display="inline-block"
            width="max-content"
            font="label"
            paddingX="xs"
            paddingY="xxs"
            height="max-content"
            marginTop="xxs"
            marginRight="xxs"
            borderRadius="small"
            background="viridian.base"
            palette="white"
          >
            {value.replace(/_/g, ' ')}
          </Tag>
        ))}
      </TagsWrap>
    ) : (
      <Tag
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
      </Tag>
    )}
  </>
);

ArticleTags.propTypes = {
  topic: string,
  tagsList: array,
};

export default ArticleTags;
