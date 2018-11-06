import React from 'react';
import styled from 'styled-components';

import { object, func } from 'prop-types';

import { size, palette, key } from 'sly/components/themes';
import Button from 'sly/components/atoms/Button';

const FullWrapper = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: ${palette('white', 0)};
  width: 100%;
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  z-index: ${key('zIndexes.stickySections')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: none;
  }
`;

const FooterWrapper = styled.div`
  padding: ${size('spacing.large')};
  display: flex;
  margin: 0 auto;
  > * {
    flex: 1;
  }

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.col8')};
    display: flex;
    padding: ${size('spacing.large')} 0;
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.col12')};
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
  const { title, name, ctaTitle, link } = footerInfo;
  return (
    <FullWrapper>
      <FooterWrapper>
        <FooterDetails>
          <FooterDetailHeader>{title}</FooterDetailHeader>
          <FooterName>{name}</FooterName>
        </FooterDetails>
        <Button kind="jumbo" href={link} onClick={onFooterClick}>{ctaTitle}</Button>
      </FooterWrapper>
    </FullWrapper>
  );
};

StickyFooter.propTypes = {
  footerInfo: object.isRequired,
  onFooterClick: func.isRequired,
};

export default StickyFooter;
