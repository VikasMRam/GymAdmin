import React from 'react';
import styled from "styled-components";
import { palette } from "styled-theme";
import { size } from "sly/components/themes";
import { Component } from "react";
import { number } from 'prop-types';
import Heading from "sly/components/atoms/Heading";

import Link from "sly/components/atoms/Link";
import BasePageTemplate from "sly/components/templates/BasePageTemplate";
import Footer from "sly/components/organisms/Footer";

import HeaderContainer from 'sly/containers/HeaderContainer';
import { filterLinkPath, getSearchParamFromPlacesResponse } from "sly/services/helpers/search";

const Wrapper = styled.div`
  position: relative;
  padding: calc(${size('header.home.heroImage.height')}/4);
  background-color: ${palette('white', 0)};
  height: calc(${size('header.home.heroImage.height')}/2);

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    height: ${size('header.home.heroImage.height')};
    padding: calc(${size('header.home.heroImage.height')}/4);
  }
`;

const getTextError= (errorCode) => {
  //Change to map and add more codeS!
  let text = '';
  switch (errorCode) {
    case 404:
      text = 'Sorry, we couldn\'t find the page.';
      break;
    case 500:
      text = 'Sorry, there was an error processing your request.';
      break;
    default:
      text = 'We could not process your request at this time. ';
      break;
  };
  return text;
};

export default class ErrorPage extends Component {
  static propTypes = {
    errorCode:number.isRequired,
  };

  handleOnLocationSearch = (result) => {
    const { location } = this.props;
    const searchParams = getSearchParamFromPlacesResponse(result);
    const { path } = filterLinkPath(searchParams);
    location.push(path);
  };

  render () {
    const { errorCode } = this.props;

    return (
      <BasePageTemplate header={<HeaderContainer onLocationSearch={this.handleOnLocationSearch} />} footer={<Footer/>}>
        <Wrapper>
          <Heading>{getTextError(errorCode)}</Heading>
          <div>
            Please head back to our
            <Link href="/"> Homepage </Link> or
            <Link href="/contact"> Contact Us </Link>
          </div>
        </Wrapper>
      </BasePageTemplate>)
  }
}
