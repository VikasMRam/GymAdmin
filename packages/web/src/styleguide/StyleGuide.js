import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Menu from './Menu';

import Block from 'sly/common/system/Block';
import Grid from 'sly/common/system/Grid';
import Span from 'sly/common/system/Span';
import Logo from 'sly/common/icons/Logo';
import Colors from 'sly/web/styleguide/pages/Colors';
import Layout from 'sly/web/styleguide/pages/Layout';
import Typography from 'sly/web/styleguide/pages/Typography';
import Icon from 'sly/web/styleguide/pages/Icon';
import Button from 'sly/web/styleguide/pages/Button';
import Input from 'sly/web/styleguide/pages/Input';
import Table from 'sly/web/styleguide/pages/Table';
import BlockPage from 'sly/web/styleguide/pages/Block';
import Border from 'sly/web/styleguide/pages/Border';


const StyleGuide = () => (
  <Grid
    gridTemplateRows="5rem auto"
    gridTemplateColumns={['col1 auto', 'col2 auto']}
    gridTemplateAreas={`
      'header header'
      'menu content'
    `}
  >
    <Block
      gridArea="header"
      sx={{
        color: 'viridian.base',
        borderBottom: 's',
        borderColor: 'slate.lighter-90',
        fontSize: '1.5rem',
        lineHeight: '2rem',
        display: 'flex',
        alignItems: 'center',
        pl: 'gutter',
      }}
    >
      <Logo size="xxl" mr="xs" />
      <Span><b>seniorly</b> styleguide</Span>
    </Block>
    <Menu
      gridArea="menu"
      sx={{
        borderRight: 's',
        borderColor: 'slate.lighter-90',
      }}
    />
    <Switch>
      <Route path="/styleguide/border">
        <Border gridArea="content" />
      </Route>
      <Route path="/styleguide/Block">
        <BlockPage gridArea="content" />
      </Route>
      <Route path="/styleguide/colors">
        <Colors gridArea="content" />
      </Route>
      <Route path="/styleguide/layout">
        <Layout gridArea="content" />
      </Route>
      <Route path="/styleguide/typography">
        <Typography gridArea="content" />
      </Route>
      <Route path="/styleguide/button">
        <Button gridArea="content" />
      </Route>
      <Route path="/styleguide/icon">
        <Icon gridArea="content" />
      </Route>
      <Route path="/styleguide/input">
        <Input gridArea="content" />
      </Route>
      <Route path="/styleguide/table">
        <Table gridArea="content" />
      </Route>
    </Switch>
  </Grid>
);

export default StyleGuide;
