import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { object, func } from 'prop-types';

import { host } from 'sly/web/config';
import { size, palette } from 'sly/common/components/themes';
import { assetPath } from 'sly/web/components/themes';
import { getBreadCrumbsForGuides, stateNames } from 'sly/web/services/helpers/url';
import HeaderContainer from 'sly/web/containers/HeaderContainer';
import { TemplateHeader, TemplateContent } from 'sly/web/components/templates/BasePageTemplate';
import { Image, Label, Heading } from 'sly/web/components/atoms';
import Footer from 'sly/web/components/organisms/Footer';
import SearchBoxContainer from 'sly/web/containers/SearchBoxContainer';
import SeoLinks from 'sly/web/components/organisms/SeoLinks';
import BreadCrumb from 'sly/web/components/molecules/BreadCrumb';
import pad from 'sly/web/components/helpers/pad';

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

const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.regular')};
`;

const StyledLabel = styled(Label)`
  text-align: center;
  font-size: ${size('text.subtitle')};
  margin-bottom: ${size('spacing.large')};
`;

const LegacyContent = pad(styled.div`
  a {
    text-decoration: none;
    color: ${palette('base')};

    &:hover {
      color: ${palette('filler')};
      cursor: pointer;
    }

    &:active {
      color: ${palette('base')};
    }

    &:focus {
      outline: none;
    }
  }
`, 'large');
LegacyContent.defaultProps = {
  palette: 'primary',
};
const CareTypeRegionGuidePage = ({
  onLocationSearch,
  geoGuide,
  searchParams,
}) => {
  const HeaderContent = (
    <>
      <HeaderContainer />
      <HeroWrapper>
        <StyledImage src={assetPath('images/home/cover4.jpg')} alt="A Home To Love"  height={320} />
        <SearchBoxWrapper>
          <StyledHeading level="hero" size="hero" palette="white">
            {searchParams.tocg ==='assisted-living-guide' ? 'Assisted Living' : 'Memory Care'} Guide For {geoGuide.city}, {stateNames[geoGuide.state]}
          </StyledHeading>
          <StyledLabel palette="white">
            Find the best {searchParams.tocg ==='assisted-living-guide' ? 'assisted living' : 'memory care'} near you.
          </StyledLabel>
          <SearchBoxContainer layout="homeHero" onLocationSearch={onLocationSearch} />
        </SearchBoxWrapper>
      </HeroWrapper>
    </>
  );

  const BreadCrumbContent = () => {
    searchParams.regionName = `${geoGuide.city}, ${geoGuide.state}`;
    return (
      <BreadCrumb pad="large" items={getBreadCrumbsForGuides(searchParams)} />
    );
  };

  const HelmetContent = () => {
    const { title, url } = geoGuide;
    const description = searchParams.tocg === 'assisted-living-guide' ?
      `Learn everything about ${geoGuide.city}, ${geoGuide.state} ${geoGuide.caretype} facilities. Understand cost, compare retirement living communities and options, and find ${geoGuide.city} resources for senior residents.` :
      `Learn everything about ${geoGuide.city}, ${geoGuide.state} ${geoGuide.caretype} facilities. Understand cost, compare retirement living communities and options, and find ${geoGuide.city} resources for senior residents with Alzheimer’s disease or other dementia related diagnoses.`;

    const canonicalUrl = `${host}${url}`;

    return (
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />

      </Helmet>
    );
  };


  const ListContent = () => {
    /**
     * Order of appearance as in editor :
     * description, <p>1</p>
     guide, <p>2</p>
     articles, <p>3</p>
     resources, <p>4</p>
     neighborhoods, <p>5</p>
     hospitals, <p>6</p>
     reviews, <p>7</p>
     */
    if (geoGuide && geoGuide.guideContent) {
      const additionalDivs = [];
      const gg = geoGuide.guideContent;
      ['description', 'guide', 'articles', 'resources',
        'neighborhoods', 'hospitals', 'reviews'].forEach((p) => {
        if (gg[p]) {
          additionalDivs.push(<LegacyContent dangerouslySetInnerHTML={{ __html: gg[p] }} key={p} />);
        }
      });
      if (gg.seoLinks) {
        additionalDivs.push(<SeoLinks key="seoLinks" title="Assisted Living in Nearby Cities" links={gg.seoLinks} />);
      }

      return (
        <>
          {additionalDivs}
        </>
      );
    }
    return (<div />);
  };

  return (
    <>
      <TemplateHeader>{HeaderContent}</TemplateHeader>
      <TemplateContent>
        {geoGuide && geoGuide.guideContent && BreadCrumbContent()}
        {geoGuide && geoGuide.guideContent && HelmetContent()}
        {geoGuide && geoGuide.guideContent && ListContent()}
      </TemplateContent>
      <Footer />
    </>

  );
};

CareTypeRegionGuidePage.propTypes = {
  onLocationSearch: func,
  geoGuide: object.isRequired,
  searchParams: object.isRequired,
};

export default CareTypeRegionGuidePage;
