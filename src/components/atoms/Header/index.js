import React from 'react';
import styled from 'styled-components';
import { palette } from 'styled-theme';

import { size } from 'sly/components/themes';
import Icon from 'sly/components/atoms/Icon';
import Input from 'sly/components/atoms/Input';
import Button from 'sly/components/atoms/Button';

const HeaderWrapper = styled.div`
  display: flex;
  overflow: hidden;
  height: 60px;
  margin-bottom: 16px;

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    overflow: hidden;
    border: ${size('border')} solid ${palette('grayscale', 2)};
    padding: 10px 24px;
    margin-bottom: 24px;
  }
`;

const SeniorlyFullIcon = styled(Icon)`
  display: none;

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    display: block;
    float: left;
    width: 87px;
    height: 52px;
  }
`;

const SeniorlyIconMenu = styled.div`
  display: flex;
  width: 88px;
  border: ${size('border')} solid ${palette('grayscale', 2)};
`;

const SeniorlyIcon = styled(Icon)`
  float: left;
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
    float: right;
    cursor: pointer;
  }
`;

const SearchBar = styled.div`
  display: flex;
  width: 100%;
  border: ${size('border')} solid ${palette('grayscale', 2)};
`;

const SearchTextBox = styled(Input)`
  height: 100%;
  border: none;
`;

const SearchButton = styled.div`
  height: 100%;
  padding: 18px 16px;
  cursor: pointer;
`;

const HeaderItem = styled.a`
  display: none;

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    display: block;
    float: right;
    color: ${palette('slate', 0)};
    text-align: center;
    padding: 16px 8px;
    margin-left: 16px;
    text-decoration: none;
    font-size: 14px;
  }
`;

const Header = () => (
  <HeaderWrapper>
    <SeniorlyFullIcon icon="logo" />
    <SeniorlyIconMenu>
      <SeniorlyIcon icon="seniorlyLogo" size="button" />
      <MenuArrowIcon icon="arrow-down" size="small" />
    </SeniorlyIconMenu>
    <SearchBar>
      <SearchTextBox placeholder="Search by city or zip code" />
      <SearchButton>
        <Icon icon="star" size="regular" />
      </SearchButton>
    </SearchBar>
    <MenuIcon icon="menu" size="medium" />
    <HeaderItem>Login</HeaderItem>
    <HeaderItem>Sign Up</HeaderItem>
    <HeaderItem>Saved</HeaderItem>
    <HeaderItem>Help Center</HeaderItem>
    <HeaderItem>List on Seniorly</HeaderItem>
  </HeaderWrapper>
);

export default Header;
