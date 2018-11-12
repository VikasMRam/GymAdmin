import React from 'react';

import styled from 'styled-components';
import classes from 'classnames';

import { size } from 'sly/components/themes';

export const FullScreenWizard = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: ${size('layout.col5')} auto;
  grid-gap: 0;
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

export const makeHeader = Component => function Header({ className, ...props }) {
  return (
    <Component
      className={classes('overlayHeader', className)}
      {...props}
    />
  );
};

export const makeColumn = Component => function Column({ className, ...props }) {
  return (
    <Component
      className={classes('overlayColumn', className)}
      {...props}
    />
  );
};

export const makeBody = Component => function Body({ className, ...props }) {
  return (
    <Component
      className={classes('overlayBody', className)}
      {...props}
    />
  );
};

export const makeControls = Component => function Controls({ className, ...props }) {
  return (
    <Component
      className={classes('overlayControls', className)}
      {...props}
    />
  );
};

