import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { array, func, object } from 'prop-types';

import { host } from 'sly/config';
import { size, assetPath, palette } from 'sly/components/themes';
import pad from 'sly/components/helpers/pad';
import { getBreadCrumbsForGuides } from 'sly/services/helpers/url';
import HeaderContainer from 'sly/containers/HeaderContainer';
import { TemplateHeader, TemplateContent } from 'sly/components/templates/BasePageTemplate';
import { Image, Label, Heading, Paragraph, Link } from 'sly/components/atoms';
import Footer from 'sly/components/organisms/Footer';
import SearchBoxContainer from 'sly/containers/SearchBoxContainer';
import SeoLinks from 'sly/components/organisms/SeoLinks';
import { ALSeoCities, ALSeoStates } from 'sly/services/helpers/homepage';
import BreadCrumb from 'sly/components/molecules/BreadCrumb';

const HeroWrapper = styled.div`
  position: relative;
  background-color: ${palette('slate', 'stroke')};
  height: ${size('header.home.heroImage.mobileHeight')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    height: calc(0.5 * ${size('header.home.heroImage.height')});
  }
`;
const StyledImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  z-index: 0;
  display: block;
`;
const SearchBoxWrapper = styled.div`
  margin: auto;
  width: 90%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('header.home.heroSearchBox.width')};
  }
`;
const Wrapper = styled.div`
  margin-bottom: ${size('spacing.large')};
`;

const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.regular')};
`;

const StyledLink = pad(styled(Link)`
  display: flex;
  color: ${palette('slate', 'base')};

  span {
    margin-right: ${size('spacing.small')};
  }
`, 'regular');

const StyledLabel = styled(Label)`
  text-align: center;
  font-size: ${size('text.subtitle')};
  margin-bottom: ${size('spacing.large')};
`;

const StyledArticle = styled.article`
  margin-bottom: ${size('spacing.xLarge')};
  &:last-of-type {
    margin-bottom: 0;
    p {
      margin-bottom: ${size('spacing.regular')};
    }
  }
`;

const CareTypeGuidePage = ({
  onLocationSearch,
  guideList,
  searchParams,
}) => {
  const HeaderContent = (
    <>
      <HeaderContainer />
      <HeroWrapper>
        <StyledImage src={assetPath('images/home/cover4.jpg')} alt="A Home To Love" />
        <SearchBoxWrapper>
          <StyledHeading level="hero" size="hero" palette="white">
            Assisted Living City Guides
          </StyledHeading>
          <StyledLabel palette="white">
            Find the best assisted living near you.
          </StyledLabel>
          <SearchBoxContainer layout="homeHero" onLocationSearch={onLocationSearch} />
        </SearchBoxWrapper>
      </HeroWrapper>
    </>
  );

  const title = ' Assisted Living City Guides ';
  const description = ' Learn everything about assisted living facilities in the United States. Understand cost, compare retirement living communities and options, and find city specific resources for senior residents.';
  const canonicalUrl = `${host}/assisted-living-guide`;
  return (
    <>
      <TemplateHeader>{HeaderContent}</TemplateHeader>
      <TemplateContent>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <link rel="canonical" href={canonicalUrl} />
        </Helmet>
        <BreadCrumb items={getBreadCrumbsForGuides(searchParams)} />
        {guideList &&
          <Wrapper>
            <Paragraph>
              This page includes all the assisted living city guides currently available. Each city guide provides comprehensive details on assisted living in that city. From understanding cost, comparing with other care types, to details specific to senior residents living in the city, these retirement living guides are your go-to resource for learning everything about assisted living in the United States.
            </Paragraph>
            <StyledHeading level="title" size="title">
              List of Guides
            </StyledHeading>
            <Paragraph>
              {guideList.map(gg => (
                <StyledLink href={gg.url}>
                  {gg.title}
                </StyledLink>
              ))}
            </Paragraph>
          </Wrapper>
        }
        <StyledArticle><SeoLinks title="Find Assisted Living Near You by City" links={ALSeoCities} /></StyledArticle>
        <StyledArticle><SeoLinks title="Find Assisted Living Near You by State" links={ALSeoStates} /></StyledArticle>
      </TemplateContent>
      <Footer />
    </>

  );
};

CareTypeGuidePage.propTypes = {
  onLocationSearch: func,
  guideList: array.isRequired,
  searchParams: object.isRequired,
};

export default CareTypeGuidePage;
