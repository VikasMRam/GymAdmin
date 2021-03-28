import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';
import { array, object } from 'prop-types';
import { useHistory } from 'react-router';

import Block from 'sly/common/system/Block';
import Flex from 'sly/common/system/Flex';
import { RESOURCE_CENTER_PATH } from 'sly/web/constants/dashboardAppPaths';
import { urlize } from 'sly/web/services/helpers/url';

const Tag = styled(Block)`
  text-transform: uppercase;
  max-width: max-content;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
`;

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
        <Flex 
          sx={{
            flexWrap: 'nowrap',
            flexGrow: 1,
            alignItems: 'flex-end',
            alignContent: 'flex-end',
            zIndex: 1,
          }}
        >
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
                border="round"
                background="viridian.base"
                color="white.base"
                onClick={onClick(urlize(value))}
                {...(idx !== 0 && { overflow: 'hidden' })}
              >
                {value.replace(/_/g, ' ')}
              </Tag>
            ))}
        </Flex>
      ) : (
        <Tag
          display="inline-block"
          width="max-content"
          font="label"
          paddingX="xs"
          paddingY="xxs"
          marginTop="auto"
          border="round"
          background="viridian.base"
          color="white"
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
