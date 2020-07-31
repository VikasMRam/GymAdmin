import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import Icon from '.';

import { palette } from 'sly/common/components/themes';
import Block from 'sly/web/components/atoms/Block';

const getIcons = () => {
  const context = require.context('./icons/', false, /\.svg$/);
  return context
    .keys()
    .map((icon) => {
      const result = icon.match(/^\.\/(.+)-regular\.svg$/);
      return result?.[1];
    })
    .filter(x => x);
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Card = styled.div`
  background: ${palette('grey', 'background')};
  border: 1px solid ${palette('grey', 'base')};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  margin: 10px;
  padding: 5px;

  > ${Icon} {
    border: 1px solid ${palette('grey', 'base')};
    background: white;
    border-radius: 2px;
  }

  > ${Block} {
    margin-top: 10px;
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

function Icons() {
  return (
    <Wrapper>
      {getIcons().map(icon => (
        <Card title={icon} key={icon}>
          <Icon icon={icon} size="title" />
          <Block size="caption">{icon}</Block>
        </Card>
      ))}
    </Wrapper>
  );
}

storiesOf('Common|Atoms/Icon', module)
  .add('default', () => <Icons />);
