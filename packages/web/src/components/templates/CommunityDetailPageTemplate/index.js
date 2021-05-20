import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import classes from 'classnames';

import { size } from 'sly/common/components/themes';
import { withHydration } from 'sly/web/services/partialHydration';
import { TemplateHeader } from 'sly/web/components/templates/BasePageTemplate';
import FooterOrganism from 'sly/web/components/organisms/Footer/communityFooter';

const HeaderContainer = withHydration(/* #__LOADABLE__ */ () => /* webpackChunkName: "chunkModalContainer" */ import('sly/web/containers/HeaderContainer'));
const ModalContainer = withHydration(/* #__LOADABLE__ */ () => /* webpackChunkName: "chunkModalContainer" */ import('sly/web/containers/ModalContainer'), { alwaysHydrate: true });

export const CommunityDetailPageTemplate = styled.main`
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
    grid-row: 2;

    @media screen and (min-width: ${size('breakpoint.laptop')}) {
      grid-column: 1 / 2;
    }
  }

  .overlayColumn {
    grid-row: 2;
    grid-column: 2 / 2;
    display: none;

    @media screen and (min-width: ${size('breakpoint.laptop')}) {
      display: block;
    }
  }
`;

export const makeHeader = () => {
  function Header({ className, ...props }) {
    return (
      <TemplateHeader
        className={classes('overlayHeader', className)}
        {...props}
      >
        <HeaderContainer />
      </TemplateHeader>
    );
  }
  Header.propTypes = {
    className: string,
  };

  return Header;
};

export const makeGallery = (Component) => {
  function Gallery({ className, ...props }) {
    return (
      <Component
        className={classes('overlayGallery', className)}
        {...props}
      />
    );
  }
  Gallery.propTypes = {
    className: string,
  };

  return Gallery;
};

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

export const makeFooter = () => {
  function Footer({ className, ...props }) {
    return (
      <>
        <FooterOrganism
          className={classes('overlayFooter', className)}
          {...props}
        />
        <ModalContainer />
      </>
    );
  }
  Footer.propTypes = {
    className: string,
  };

  return Footer;
};
