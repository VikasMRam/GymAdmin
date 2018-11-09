import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import classes from 'classnames';

import { size } from 'sly/components/themes';
import HeaderController from 'sly/controllers/HeaderController';


const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: ${size('layout.col5')} auto;
  grid-gap: 10px;
  grid-template-rows: ${size('element.xxLarge')} auto ${size('element.xxxLarge')}; 
  
  .overlayHeader {
    grid-column: 1 / 3;
    grid-row: 1;
    height: ${size('element.xxLarge')};
  } 
  
  .overlayColumn {
    grid-column: 1;
    grid-row: 2 / 4;
  }
  
  .overlayBody {
    grid-column: 2;
    grid-row: 2;
  }
  
  .overlayControls {
    grid-column: 2;
    grid-row: 3;
  }
`;

const Header = styled(({ className, ...props }) => (
  <div
    className={classes('overlayHeader', className)}
    {...props}
  />
))`
  background: red;
`;

const Column = styled(({ className, ...props }) => (
  <div
    className={classes('overlayColumn', className)}
    {...props}
  />
))`
  background: pink;
`;

const Body = styled(({ className, ...props }) => (
  <div
    className={classes('overlayBody', className)}
    {...props}
  />
))`
  background: deeppink;
`;

const Controls = styled(({ className, ...props }) => (
  <div
    className={classes('overlayControls', className)}
    {...props}
  />
))`
  background: lightblue;
`;


export default class BookATourPage extends Component {
  render() {
    return (
      <Overlay>
        <Header><HeaderController /></Header>
        <Column />
        <Body />
        <Controls />
      </Overlay>
    );
  }
}
