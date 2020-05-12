import React from 'react';
import styled from 'styled-components';
import classes from 'classnames';
import { string } from 'prop-types';

import { size } from 'sly/web/components/themes';
import ModalContainer from 'sly/web/containers/ModalContainer';

export const FullScreenWizard = styled.div`
  .overlayHeader {
  }

  .overlayColumn {
    display: none;
  }

  .overlayBody {
    margin-bottom: ${size('element.xHuge')};

    > * {
      margin-left: ${size('spacing.xLarge')};
      margin-right: ${size('spacing.xLarge')};
      margin-top: ${size('spacing.xxLarge')};

      @media screen and (min-width: ${size('breakpoint.mobile')}) {
        width: ${size('mobileLayout.col4')};
        margin-left: auto;
        margin-right: auto;
      }

      @media screen and (min-width: ${size('breakpoint.tablet')}) {
        width: ${size('tabletLayout.col6')};
      }

      @media screen and (min-width: ${size('breakpoint.laptop')}) {
        width: ${size('layout.col6')};
      }
    }
  }

  .overlayControls {
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: ${size('layout.col5')} auto;
    grid-gap: 0;
    grid-template-rows: ${size('element.xxxLarge')} 1fr auto;

    .overlayHeader {
      grid-column: 1 / 3;
      grid-row: 1;
    }

    .overlayColumn {
      display: inherit;
      grid-column: 1;
      grid-row: 2 / 4;
    }

    .overlayBody {
      display: block;
      grid-column: 2 / 2;
      grid-row: 2 / 2;
      margin-bottom: 0;
      overflow: auto;
    }

    .overlayControls {
      position: static;
      grid-column: 2;
      grid-row: 3;
    }
  }
`;

export const makeHeader = (Component) => {
  function Header({ className, ...props }) {
    return (
      <Component
        className={classes('overlayHeader', className)}
        {...props}
      />
    );
  }
  Header.propTypes = {
    className: string,
  };

  return Header;
};

export const makeColumn = (Component) => {
  function Column({ className, ...props }) {
    return (
      <Component
        className={classes('overlayColumn', className)}
        {...props}
      />
    );
  }
  Column.propTypes = {
    className: string,
  };

  return Column;
};

export const makeBody = (Component) => {
  function Body({ className, ...props }) {
    return (
      <>
        <Component
          className={classes('overlayBody', className)}
          {...props}
        />
        <ModalContainer />
      </>
    );
  }
  Body.propTypes = {
    className: string,
  };

  return Body;
};

export const makeControls = (Component) => {
  function Controls({ className, ...props }) {
    return (
      <Component
        className={classes('overlayControls', className)}
        {...props}
      />
    );
  }
  Controls.propTypes = {
    className: string,
  };

  return Controls;
};
