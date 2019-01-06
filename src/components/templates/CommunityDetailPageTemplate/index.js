import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import classes from 'classnames';

import { size } from 'sly/components/themes';
import HeaderContainer from 'sly/containers/HeaderContainer';
import { TemplateHeader } from 'sly/components/templates/BasePageTemplate';
import FooterOrganism from 'sly/components/organisms/Footer';
import BannerNotification from 'sly/components/molecules/BannerNotification';

export const CommunityDetailPageTemplate = styled.main`
  .overlayTwoColumnBody, .overlayOneColumnBody {
    margin: auto;
    width: 100%;
    padding: 0 ${size('spacing.large')};

    @media screen and (min-width: ${size('breakpoint.tablet')}) {
      padding: 0;
      width: ${size('tabletLayout.col8')};
    }
    @media screen and (min-width: ${size('breakpoint.laptop')}) {
      width: ${size('layout.col12')};
    }
  }

  .overlayHeader {
    grid-row: 1;
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

  .overlayTwoColumnBody {
    @media screen and (min-width: ${size('breakpoint.laptop')}) {
      display: grid;
      grid-template-columns: ${size('layout.col8')} auto;
      grid-gap: 0 ${size('layout.gutter')};
    }
  }

  .overlayFullWidthBody {

  }

  .overlayOneColumnBody {

  }
`;

export const makeTwoColumnBody = (Component) => {
  function TopTwoColumnBody({ className, ...props }) {
    return (
      <Component
        className={classes('overlayTwoColumnBody', className)}
        {...props}
      />
    );
  }
  TopTwoColumnBody.propTypes = {
    className: string,
  };

  return TopTwoColumnBody;
};

export const makeOneColumnBody = (Component) => {
  function TopOneColumnBody({ className, ...props }) {
    return (
      <Component
        className={classes('overlayOneColumnBody', className)}
        {...props}
      />
    );
  }
  TopOneColumnBody.propTypes = {
    className: string,
  };

  return TopOneColumnBody;
};

export const makeFullWidthBody = (Component) => {
  function TopFullWidthBody({ className, ...props }) {
    return (
      <Component
        className={classes('overlayFullWidthBody', className)}
        {...props}
      />
    );
  }
  TopFullWidthBody.propTypes = {
    className: string,
  };

  return TopFullWidthBody;
};

export const makeHeader = (bannerNotification) => {
  function Header({ className, ...props }) {
    return (
      <TemplateHeader
        className={classes('overlayHeader', className)}
        {...props}
      >
        <HeaderContainer />
        {bannerNotification && <BannerNotification>{bannerNotification}</BannerNotification>}
      </TemplateHeader>
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
      <FooterOrganism
        className={classes('overlayFooter', className)}
        {...props}
      />
    );
  }
  Footer.propTypes = {
    className: string,
  };

  return Footer;
};
