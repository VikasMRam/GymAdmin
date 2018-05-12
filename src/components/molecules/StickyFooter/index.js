import React from 'react';
import styled from 'styled-components';
import { palette } from 'styled-theme';
import { object, func } from 'prop-types';

import { size } from 'sly/components/themes';
import Button from 'sly/components/atoms/Button';

const FullWrapper = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: ${palette('white', 0)};
  width: 100%;
  border: ${size('border.regular')} solid ${palette('grayscale', 2)};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: none;
  }
`;

const FooterWrapper = styled.div`
  padding: ${size('spacing.regular')} ${size('spacing.large')};
  display: flex;
  margin: 0 auto;
  > * {
    flex: 1;
  }

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.mainColumn')};
    display: flex;
    padding: ${size('spacing.large')} 0;
  }

  @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
    width: calc(
      ${size('layout.mainColumn')} + ${size('layout.sideColumn')} +
        ${size('spacing.xLarge')}
    );
    padding-right: ${size('layout.sideColumn')};
  }

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    width: ${size('layout.laptopLarge')};
  }
`;

const FooterDetails = styled.div`
  display: none;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: block;
    width: 50%;
  }
`;

const FooterDetailHeader = styled.div`
  font-size: ${size('text.subtitle')};
  font-weight: bold;
`;

const FooterName = styled.div``;

const StickyFooter = ({ footerInfo, onFooterClick }) => {
  const { title, name, ctaTitle } = footerInfo;
  return (
    <FullWrapper>
      <FooterWrapper>
        <FooterDetails>
          <FooterDetailHeader>{title}</FooterDetailHeader>
          <FooterName>{name}</FooterName>
        </FooterDetails>
        <Button kind="jumbo" onClick={onFooterClick}>{ctaTitle}</Button>
      </FooterWrapper>
    </FullWrapper>
  );
};

StickyFooter.propTypes = {
  footerInfo: object.isRequired,
  onFooterClick: func.isRequired,
};

export default StickyFooter;
