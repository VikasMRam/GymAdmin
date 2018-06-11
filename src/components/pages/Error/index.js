import React from 'react';
import styled from "styled-components";
import { palette } from "styled-theme";
import { size } from "sly/components/themes";
import { Component } from "react";
import { number } from 'prop-types';
import Heading from "sly/components/atoms/Heading";

import Link from "sly/components/atoms/Link";
import BasePageTemplate from "sly/components/templates/BasePageTemplate";
import HeaderContainer from 'sly/containers/HeaderContainer';
import Footer from "sly/components/organisms/Footer";


import { filterLinkPath, getSearchParamFromPlacesResponse } from "sly/services/helpers/search";

const Wrapper = styled.div`
  position: relative;
  background-color: ${palette('white', 0)};
  margin: calc(${size('breakpoint.tablet')}/4) auto;
  content-align: center;
  text-align: center;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {    
    width:${size('breakpoint.tablet')};
  }
`;
const IWrapper = styled(Heading)`
  margin-bottom: ${size('spacing.xxLarge')};
  
`;

const getTextError= (errorCode) => {
  //Change to map and add more codeS!
  let text = '';
  switch (errorCode) {
    //TODO: Use Localizable Labels.
    case 404:
      text = 'Sorry, we couldn\'t find that page.';
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

  onLocationSearch = (result) => {
    const { history } = this.props;
    const searchParams = getSearchParamFromPlacesResponse(result);
    const { path } = filterLinkPath(searchParams);
    history.push(path);
    window.location.reload();
  };

  render () {
    const { errorCode } = this.props;

    return (
      <BasePageTemplate header={<HeaderContainer onLocationSearch={this.onLocationSearch} />}  footer={<Footer/>}>
        <Wrapper>
          <IWrapper>{getTextError(errorCode)}</IWrapper>
          <div>
            Head back to our
            <Link href="/"> Homepage </Link> or
            <Link href="/contact"> Contact Us </Link>
          </div>
        </Wrapper>
      </BasePageTemplate>)
  }
}
