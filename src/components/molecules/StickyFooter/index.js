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
  background-color: white;
  width: 100%;
  border: ${size('border.regular')} solid ${palette('grayscale', 2)};

  @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
    display: none;
  }
`;

const FooterWrapper = styled.div`
  padding: ${size('spacing.regular')} ${size('spacing.large')};
  display: flex;
  margin: 0 auto;

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

const ContactButton = styled(Button)`
  width: 100%;
  height: 52px;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: 50%;
  }
`;

const ContactDetails = styled.div`
  display: none;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: block;
    width: 50%;
  }
`;

const ContactDetailHeader = styled.div`
  font-size: ${size('text.subtitle')};
  font-weight: bold;
`;

const ContactName = styled.div``;

const StickyFooter = ({ community, onContactClick }) => {
  const { contacts } = community;
  const agentName = contacts.length > 0 ? 'Agent Name' : 'Seniorly Conceirge';
  return (
    <FullWrapper>
      <FooterWrapper>
        <ContactDetails>
          <ContactDetailHeader>Contact Property Manager</ContactDetailHeader>
          <ContactName>{agentName}</ContactName>
        </ContactDetails>
        <ContactButton onClick={onContactClick}>Contact</ContactButton>
      </FooterWrapper>
    </FullWrapper>
  );
};

StickyFooter.propTypes = {
  community: object.isRequired,
  onContactClick: func.isRequired,
};

export default StickyFooter;
