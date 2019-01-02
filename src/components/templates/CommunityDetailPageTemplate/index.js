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
  margin: auto;
  width: 100%;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('tabletLayout.col8')};
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: grid;
    width: ${size('layout.col12')};
    grid-template-columns: ${size('layout.col8')} auto;
    grid-gap: 0 ${size('layout.gutter')};
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
`;

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
