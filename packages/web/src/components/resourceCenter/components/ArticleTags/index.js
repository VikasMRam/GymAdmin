import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';
import { array, object } from 'prop-types';
import { useHistory } from 'react-router';

import Block from 'sly/common/components/atoms/Block';
import { withBorder, withDisplay } from 'sly/common/components/helpers';
import { RESOURCE_CENTER_PATH } from 'sly/web/constants/dashboardAppPaths';
import { urlize } from 'sly/web/services/helpers/url';

const Tag = styled(Block)(
  withBorder,
  css`
    text-transform: uppercase;
    max-width: max-content;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
);

const TagsWrap = styled(Block)(
  withDisplay,
  css`
    z-index: 1;
  `,
);

const ArticleTags = ({ topic, tagsList }) => {
  const { push } = useHistory();
  const onClick = useCallback(tag => (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    push(`${RESOURCE_CENTER_PATH}/${topic.slug}${tag ? `?tag-name=${tag}` : ''}`);
  }, [topic]);

  return (
    <>
      {tagsList?.filter(({ value }) => value).length ? (
        <TagsWrap display="flex" flexWrap="nowrap" flexGrow={1} alignItems="flex-end" alignContent="flex-end">
          {tagsList
            .sort(({ value: firstValue }, { value: secondValue }) => firstValue.length - secondValue.length)
            .map(({ value, id }, idx) => (
              <Tag
                key={id}
                display="inline-block"
                width="100%"
                font="label"
                paddingX="xs"
                paddingY="xxs"
                height="max-content"
                marginTop="xxs"
                marginRight="xxs"
                borderRadius="small"
                background="viridian.base"
                palette="white"
                overflow={idx !== 0 && 'hidden'}
                onClick={onClick(urlize(value))}
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
          onClick={onClick()}
        >
          {topic.name}
        </Tag>
      )}
    </>
  );
};

ArticleTags.propTypes = {
  topic: object,
  tagsList: array,
};

export default ArticleTags;
