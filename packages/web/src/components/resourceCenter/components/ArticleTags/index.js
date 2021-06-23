import React, { useCallback } from 'react';
import { array, node, object } from 'prop-types';
import { useHistory } from 'react-router';

import Block from 'sly/common/system/Block';
import Flex from 'sly/common/system/Flex';
import { RESOURCE_CENTER_PATH } from 'sly/web/dashboard/dashboardAppPaths';
import { urlize } from 'sly/web/services/helpers/url';

const Tag = ({ children, ...rest }) => (
  <Block
    display="inline-block"
    font="label"
    paddingX="xs"
    paddingY="xxs"
    border="round"
    background="viridian.base"
    color="white.base"
    textTransform="uppercase"
    maxWidth="max-content"
    whiteSpace="nowrap"
    textOverflow="ellipsis"
    sx={{
      cursor: 'pointer',
      '&:hover': {
        background: 'viridian.darker-20',
      },
      '&:active': {
        background: 'viridian.darker-40',
      },
    }}
    {...rest}
  >
    {children}
  </Block>
);

Tag.propTypes = {
  children: node,
};

const ArticleTags = ({ topic, tagsList }) => {
  const { push } = useHistory();
  const onClick = useCallback(tag => (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    push(`${RESOURCE_CENTER_PATH}/${topic.slug}${tag ? `?tag-name=${tag}` : ''}`);
  }, [topic]);

  return (
    <>
      {tagsList?.filter(({ value }) => value).length && (
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
                onClick={onClick(urlize(value))}
                height="max-content"
                width="100%"
                marginRight="xxs"
                marginTop="xxs"
                {...(idx !== 0 && { overflow: 'hidden' })}
              >
                {value.replace(/_/g, ' ')}
              </Tag>
            ))}
        </Flex>
      )}
      {topic && (
        <Tag
          width="max-content"
          marginTop="auto"
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
