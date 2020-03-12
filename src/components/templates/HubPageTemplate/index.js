import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import classes from 'classnames';

import { size, palette } from 'sly/components/themes';
import { withHydration } from 'sly/services/partialHydration';
import { TemplateHeader } from 'sly/components/templates/BasePageTemplate';

export const HubPageTemplate = styled.main`
  .overlayWrapper {
    margin: auto;
    width: 100%;
    padding: 0 ${size('spacing.large')};

    @media screen and (min-width: ${size('breakpoint.tablet')}) {
      padding: 0;
      width: ${size('layout.col9')};

      > section {
        width: ${size('tabletLayout.col8')};
        margin: auto;
      }
    }
    @media screen and (min-width: ${size('breakpoint.laptop')}) {
      width: ${size('layout.col12')};

      > section {
        width: auto;
        margin: auto;
      }
    }
  }

  .overlayGallery {
    margin: 0 -${size('spacing.large')};
    @media screen and (min-width: ${size('breakpoint.tablet')}) {
      width: ${size('layout.col9')};
      margin-left: -${size('tabletLayout.gutter')};
    }
    @media screen and (min-width: ${size('breakpoint.laptop')}) {
      width: auto;
      margin: 0;
    }
  }

  .overlayHeader {
    grid-row: 1;
  }

  .overlayTwoColumn {
    @media screen and (min-width: ${size('breakpoint.tablet')}) {
      width: ${size('mobileLayout.col4')};
    }
    @media screen and (min-width: ${size('breakpoint.tablet')}) {
      width: ${size('tabletLayout.col8')};
      margin: auto;
    }
    @media screen and (min-width: ${size('breakpoint.laptop')}) {
      width: auto;
      display: grid;
      grid-template-columns: ${size('layout.col8')} auto;
      grid-gap: 0 ${size('layout.gutter')};
    }
  }

  .overlayBody {
    grid-row: 3;

    @media screen and (min-width: ${size('breakpoint.laptop')}) {
      grid-row: 2;
      grid-column: 1 / 2;
    }
  }

  .overlayColumn {
    grid-row: 2;

    @media screen and (min-width: ${size('breakpoint.laptop')}) {
      grid-column: 2 / 2;
    }
  }
  
  .overlayStickToTop {
    background-color: ${palette('white', 'base')};
    padding: ${size('spacing.xLarge')} ${size('spacing.xLarge')} ${size('spacing.regular')} ${size('spacing.xLarge')};
    line-height: ${size('lineHeight.body')};
    border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
    border-radius: ${size('spacing.small')};
    margin-bottom: ${size('spacing.large')};
    @media screen and (min-width: ${size('breakpoint.laptop')}) {
      position: sticky;
      top: 24px;
      margin-top: calc(2 * -${size('spacing.huge')});
    }
  }
  
  .overlayArticle {
    margin-bottom: ${size('spacing.xLarge')};
  }
  
  .overlayTable {
    border-collapse: collapse;
    width: 100%;
    border: ${size('border.regular')} solid ${palette('grey', 'stroke')};
    margin-bottom: ${size('spacing.large')};
    thead {
      background-color: ${palette('slate', 'stroke')};
      padding: ${size('spacing.regular')} ${size('spacing.large')};
      color: ${palette('grey', 'base')};
      text-align: left;
    };
    tr {
      border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
      text-align: left;
    };
    td, th {
      padding: ${size('spacing.regular')} ${size('spacing.large')};
      border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
      font-weight: normal;
      text-align: left;
  
    };
    table-layout: fixed;
    font-size: ${size('text.tiny')};
    @media screen and (min-width: ${size('breakpoint.tablet')}) {
      font-size: ${size('text.body')};
    }
  }
  
  .overlayOneColumnListWrapper {
    padding: ${size('spacing.xLarge')} ${size('spacing.xLarge')};
    line-height: ${size('lineHeight.body')};
    border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
    border-radius: ${size('spacing.small')};
    margin-bottom: ${size('spacing.large')};
    display: grid;
    grid-template-columns: 100%;
    grid-row-gap: ${size('spacing.large')};
  }
  
  .overlayTwoColumnListWrapper {
    padding: ${size('spacing.xLarge')} ${size('spacing.xLarge')};
    line-height: ${size('lineHeight.body')};
    border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
    border-radius: ${size('spacing.small')};
    margin-bottom: ${size('spacing.large')};
    display: grid;
    grid-template-columns: 100%;
    grid-row-gap: ${size('spacing.large')};
  
    @media screen and (min-width: ${size('breakpoint.laptop')}) {
      grid-template-columns: 50% 50%;
      grid-column-gap: ${size('layout.gutter')};
    }
  }
`;


export const makeWrapper = (Component) => {
  function Wrapper({ className, ...props }) {
    return (
      <Component
        className={classes('overlayWrapper', className)}
        {...props}
      />
    );
  }
  Wrapper.propTypes = {
    className: string,
  };

  return Wrapper;
};

export const makeTwoColumn = (Component) => {
  function TwoColumn({ className, ...props }) {
    return (
      <Component
        className={classes('overlayTwoColumn', className)}
        {...props}
      />
    );
  }
  TwoColumn.propTypes = {
    className: string,
  };

  return TwoColumn;
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
      <Component
        className={classes('overlayBody', className)}
        {...props}
      />
    );
  }
  Body.propTypes = {
    className: string,
  };

  return Body;
};

export const makeStickToTop = (Component) => {
  function StickToTop({ className, ...props }) {
    return (
      <Component
        className={classes('overlayStickToTop', className)}
        {...props}
      />
    );
  }
  StickToTop.propTypes = {
    className: string,
  };

  return StickToTop;
};

export const makeArticle = (Component) => {
  function Article({ className, ...props }) {
    return (
      <Component
        className={classes('overlayArticle', className)}
        {...props}
      />
    );
  }
  Article.propTypes = {
    className: string,
  };

  return Article;
};

export const makeTable = (Component) => {
  function Table({ className, ...props }) {
    return (
      <Component
        className={classes('overlayTable', className)}
        {...props}
      />
    );
  }
  Table.propTypes = {
    className: string,
  };

  return Table;
};

export const makeOneColumnListWrapper = (Component) => {
  function OneColumnListWrapper({ className, ...props }) {
    return (
      <Component
        className={classes('overlayOneColumnListWrapper', className)}
        {...props}
      />
    );
  }
  OneColumnListWrapper.propTypes = {
    className: string,
  };

  return OneColumnListWrapper;
};

export const makeTwoColumnListWrapper = (Component) => {
  function TwoColumnListWrapper({ className, ...props }) {
    return (
      <Component
        className={classes('overlayTwoColumnListWrapper', className)}
        {...props}
      />
    );
  }
  TwoColumnListWrapper.propTypes = {
    className: string,
  };

  return TwoColumnListWrapper;
};
