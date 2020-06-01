// https://github.com/diegohaz/arc/wiki/Example-components#icon
import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import Icon from 'sly/web/components/atoms/Icon';
import Block from 'sly/web/components/atoms/Block';
import { palette } from 'sly/web/components/themes';

const getIcons = () => {
  const context = require.context('./icons/', false, /\.svg$/);
  return context
    .keys()
    .map(icon => {
      const result = icon.match(/^\.\/(.+)-regular\.svg$/);
      console.log('result', result);
      return result?.[1];
    })
    .filter(x=>x);
}

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

function Icons () {
  return (
    <Wrapper>
      {getIcons().map(icon => (
        <Card key={icon}>
          <Icon icon={icon} size="large" />
          <Block size="caption">{icon}</Block>
        </Card>
      ))}
    </Wrapper>
  );
}

storiesOf('Atoms|Icon', module)
  .add('default', () => <Icons />)
  .add('palette', () => <Icon icon="star" palette="primary" />)
  .add('star small', () => <Icon icon="star" size="small" />)
  .add('star regular', () => <Icon icon="star" />)
  .add('star large', () => <Icon icon="star" size="large" />)
  .add('star clip', () => <Icon icon="star-clip" size="large" />)
  .add('schedule regular (default) with palette', () => <Icon icon="schedule" palette="primary" />)
  .add('chevron small', () => <Icon icon="chevron" size="small" />)
  .add('chevron regular (default)', () => <Icon icon="chevron" />)
  .add('chevron left', () => <Icon icon="chevron" rotate={1} />)
  .add('chevron large', () => <Icon icon="chevron" size="large" palette="slate" />)
  .add('chevron large flip', () => <Icon flip icon="chevron" size="large" palette="slate" />);
