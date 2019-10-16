import React, { Component } from 'react';
import { number, object } from 'prop-types';
import styled from 'styled-components';

import { TemplateContent, TemplateHeader } from 'sly/components/templates/BasePageTemplate';
import { size, palette } from 'sly/components/themes';
import pad from 'sly/components/helpers/pad';
import textAlign from 'sly/components/helpers/textAlign';
import HeaderContainer from 'sly/containers/HeaderContainer';
import Heading from 'sly/components/atoms/Heading';
import Link from 'sly/components/atoms/Link';
import Footer from 'sly/components/organisms/Footer';

const Wrapper = textAlign(styled.div`
  position: relative;
  background-color: ${palette('white', 'base')};
  margin: calc(${size('breakpoint.tablet')}/4) auto;
  content-align: center;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width:${size('breakpoint.tablet')};
  }
`);

const IWrapper = pad(Heading, 'xxLarge');

const getTextError = (errorCode) => {
  // Change to map and add more codeS!
  let text = '';
  switch (errorCode) {
    // TODO: Use Localizable Labels.
    case 404:
      text = 'Sorry, we couldn\'t find that page.';
      break;
    case 500:
      text = 'Sorry, there was an error processing your request.';
      break;
    default:
      text = 'We could not process your request at this time. ';
      break;
  }
  return text;
};

export default class ErrorPage extends Component {
  static contextTypes = {
    router: object,
  };

  static propTypes = {
    errorCode: number.isRequired,
  };

  componentWillMount() {
    const { errorCode } = this.props;
    const { router } = this.context;
    if (router.staticContext) {
      router.staticContext.status = errorCode;
    }
  }

  render() {
    const { errorCode } = this.props;
    return (
      <>
        <TemplateHeader><HeaderContainer /></TemplateHeader>
        <TemplateContent>
          <Wrapper>
            <IWrapper>{getTextError(errorCode)}</IWrapper>
            <div>
              Head back to our
              <Link href="/"> Homepage </Link> or
              <Link href="/contact"> Contact Us </Link>
            </div>
          </Wrapper>
        </TemplateContent>
        <Footer />
      </>
    );
  }
}

