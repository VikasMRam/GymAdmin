import React from 'react';
import { bool, func } from 'prop-types';
import styled from 'styled-components';
import { palette } from 'styled-theme';

import { size } from 'sly/components/themes';
import Icon from 'sly/components/atoms/Icon';
import Input from 'sly/components/atoms/Input';
import Hr from 'sly/components/atoms/Hr';

const HeaderWrapper = styled.div`
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 60px;
  margin-bottom: 16px;
  border-bottom: ${size('border.regular')} solid ${palette('grayscale', 2)};

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    padding: 10px 24px;
    margin-bottom: 24px;
    height: 72px;
  }
`;

const SeniorlyFullIcon = styled(Icon)`
  display: none;

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    display: block;
    width: 87px;
    height: 52px;
    margin-right: 16px;
  }
`;

const SeniorlyIconMenu = styled.div`
  display: flex;
  width: 88px;
  border-right: ${size('border.regular')} solid ${palette('grayscale', 2)};

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    display: none;
  }
`;

const SeniorlyIcon = styled(Icon)`
  margin: 12px 8px 12px 16px;
`;

const MenuArrowIcon = styled(Icon)`
  margin: 24px 16px 0px 0px;
`;

const MenuIcon = styled(Icon)`
  display: none;

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    display: block;
    margin: 16px;
    cursor: pointer;
  }
`;

const SearchBar = styled.div`
  display: flex;
  width: 100%;

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    width: 344px;
    height: 40px;
    margin-top: 5px;
    border: ${size('border.regular')} solid ${palette('grayscale', 2)};
  }
`;

const SearchTextBox = styled(Input)`
  height: 100%;
  border: none;
`;

const SearchButton = styled.div`
  height: 100%;
  padding: 18px 16px;
  cursor: pointer;

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    padding: 6px 16px;
    background-color: ${palette('secondary', 0)};
  }
`;

const HeaderMenu = styled.div`
  width: 100%;
  position: absolute;
  top: 70px;
  background: white;
  z-index: 101;
`;

const HeaderMenuItem = styled.div`
  width: 100%;
  padding: 16px;
`;

const MarginnedHR = styled(Hr)`
  margin: 24px 16px;

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    margin: 24px 32px;
  }
`;

const HeaderItems = styled.div`
  display: flex;
  margin-left: auto; // For Float Right in Flex
`;

const HeaderItem = styled.a`
  display: none;

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    display: block;
    color: ${palette('slate', 0)};
    text-align: center;
    padding: 16px 8px;
    margin-left: 16px;
    text-decoration: none;
    font-size: 14px;
  }
`;

const Header = ({ menuOpen, onMenuIconClick }) => (
  <div>
    <HeaderWrapper>
      <SeniorlyFullIcon icon="logo" size="regular" onClick={onMenuIconClick} />
      <SeniorlyIconMenu onClick={onMenuIconClick}>
        <SeniorlyIcon icon="seniorlyLogo" size="button" />
        {!menuOpen && <MenuArrowIcon icon="arrow-down" size="small" />}
        {menuOpen && <MenuArrowIcon icon="arrow-up" size="small" />}
      </SeniorlyIconMenu>
      <SearchBar>
        <SearchTextBox placeholder="Search by city or zip code" />
        <SearchButton>
          <Icon icon="search-white" size="regular" />
        </SearchButton>
      </SearchBar>
      <HeaderItems>
        <HeaderItem>List on Seniorly</HeaderItem>
        <HeaderItem>Help Center</HeaderItem>
        <HeaderItem>Saved</HeaderItem>
        <HeaderItem>Sign Up</HeaderItem>
        <HeaderItem>Login</HeaderItem>

        <MenuIcon icon="menu" size="medium" />
      </HeaderItems>
    </HeaderWrapper>
    {menuOpen && (
      <HeaderMenu>
        <HeaderMenuItem>Assisted Living</HeaderMenuItem>
        <HeaderMenuItem>Alzheimer's Care</HeaderMenuItem>
        <HeaderMenuItem>Assisted Living</HeaderMenuItem>
        <HeaderMenuItem>Respite Care</HeaderMenuItem>
        <MarginnedHR />
        <HeaderMenuItem>About Us</HeaderMenuItem>
        <HeaderMenuItem>Contact</HeaderMenuItem>
        <HeaderMenuItem>Careers</HeaderMenuItem>
        <HeaderMenuItem>List on Seniorly</HeaderMenuItem>
        <MarginnedHR />
        <HeaderMenuItem>Sign Out</HeaderMenuItem>
        <HeaderMenuItem />
      </HeaderMenu>
    )}
  </div>
);

Header.propTypes = {
  menuOpen: bool,
  onMenuIconClick: func,
};

export default Header;
