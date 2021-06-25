import React, { Component, useCallback, useMemo } from 'react';
import { object, func } from 'prop-types';
import { Redirect } from 'react-router-dom';
import Helmet from 'react-helmet';

import SlyEvent from 'sly/web/services/helpers/events';
import AssistedLivingNearMePage from 'sly/web/components/pages/AssistedLivingNearMePage';
import MemoryCareNearMePage from 'sly/web/components/pages/MemoryCareNearMePage';
import SeniorLivingNearMePage from 'sly/web/components/pages/SeniorLivingNearMePage';
import BNCNearMePage from 'sly/web/components/pages/BNCNearMePage';
import NursingHomesNearMePage from 'sly/web/components/pages/NursingHomesNearMePage';
import SNFNearMePage from 'sly/web/components/pages/SNFNearMePage';
import CCRCNearMePage from 'sly/web/components/pages/CCRCNearMePage';
import IndependentLivingNearMePage from 'sly/web/components/pages/IndependentLivingNearMePage';
import HomeCareNearMePage from 'sly/web/components/pages/HomeCareNearMePage';
import RespiteCareNearMePage from 'sly/web/components/pages/RespiteCareNearMePage';
import VeteransBenefitAssistedLivingPage from 'sly/web/components/pages/VeteransBenefitAssistedLivingPage';
import ActiveAdultNearMePage from 'sly/web/components/pages/ActiveAdultNearMePage';
import { parseURLQueryParams, generateCityPathSearchUrl } from 'sly/web/services/helpers/url';
import { usePrefetch } from 'sly/web/services/api';
import HubHeader from 'sly/web/components/molecules/HubHeader';
import CMSDynamicZone from 'sly/web/components/organisms/CMSDynamicZone';
import Block from 'sly/common/system/Block';
import Flex from 'sly/common/system/Flex';
import Image from 'sly/common/system/Image';
import { assetPath } from 'sly/web/components/themes';
import PhoneCTAFooter from 'sly/web/components/molecules/PhoneCTAFooter';
import Footer from 'sly/web/components/organisms/Footer';
import { faqPage, guideLD, tocSiteNavigationLD } from 'sly/web/services/helpers/html_headers';

const getSearchParams = (location, match) => {
  const qs = parseURLQueryParams(location.search);
  const { params } = match;
  const { hub } = params;
  const sp = {};

  sp.nearme = 'true';
  sp.toc = hub;

  if (hub === 'senior-living') {
    sp.toc = 'nursing-homes';
  }

  if (hub === 'respite-care') {
    sp.toc = 'assisted-living';
  }

  if (qs && qs['page-number']) {
    sp['page-number'] = qs['page-number'];
  }

  return {
    searchParams: sp,
  };
};

const NewNearMePageContainer = ({ history, location, match }) => {
  const searchParams = useMemo(() => getSearchParams(location, match), [location, match]);

  const { requestInfo: { result, hasFinished } } = usePrefetch('getHubPage', { slug: match.params.hub });

  const faqs = useMemo(
    () => result?.[0]?.content
      ?.filter(({ __component }) => __component.split('.')[1] === 'faq')
      .map(({ title, description }) => ({ question: title, answer: description })),
    [result],
  );

  const handleOnLocationSearch = useCallback((result) => {
    const event = { action: 'submit', category: `nearMeHeroSearch_${searchParams.toc}`, label: result.displayText };
    SlyEvent.getInstance().sendEvent(event);

    history.push(`${result.url}${result.url.includes('?') ? '&' : '?'}toc=${searchParams.toc}`);
  }, [searchParams]);

  const handleCurrentLocation = useCallback((addresses, { latitude, longitude }) => {
    const event = { action: 'submit', category: `nearMeHeroSearch_${searchParams.toc}`, label: 'currentLocation' };
    SlyEvent.getInstance().sendEvent(event);

    addresses.length && history.push(`/${searchParams.toc}/${generateCityPathSearchUrl(addresses[0])}`); // ?geo=${latitude},${longitude},10`;
  }, []);

  if (!hasFinished) {
    return (
      <Flex
        height="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <Image src={assetPath('images/homebase/loader.svg')} />
      </Flex>
    );
  }

  if (hasFinished && !result?.length) {
    return <Redirect to="/" />;
  }

  console.log('result?.[0]?.mainImg?.path', result?.[0]?.mainImg?.path);

  return (
    <>
      <Helmet>
        <title>{result[0].title}</title>
        <meta name="description" content={result[0].description} />
        {faqs && faqPage(faqs)}
        {/* {tocSiteNavigationLD("https://www.seniorly.com/in-home-care", tocList)} */}
        {guideLD(result[0].title, result[0].description, `https://www.seniorly.com/${match.params.hub}`)}
      </Helmet>

      <HubHeader
        imagePath={result?.[0]?.mainImg?.path}
        toc="nursing homes"
        heading="What is a Nursing Home?"
        label="Use our free search to find nursing homes nearby"
        onCurrentLocation={handleCurrentLocation}
        onLocationSearch={handleOnLocationSearch}
      />

      {result[0].content && (
        <Block mt="l" sx$tablet={{ mt: 'xl' }}>
          <CMSDynamicZone content={result[0].content} />
        </Block>
      )}

      <PhoneCTAFooter />
      <Footer />
    </>
  );
};

NewNearMePageContainer.propTypes = {
  history: object.isRequired,
  location: object.isRequired,
  match: object.isRequired,
};

export default NewNearMePageContainer;

// @withProps(({ match, location }) => {
//   const qs = parseURLQueryParams(location.search);
//   const { params } = match;
//   const { hub } = params;
//   const sp = {};
//
//   sp.nearme = 'true';
//   sp.toc = hub;
//
//   if (hub === 'senior-living') {
//     sp.toc = 'nursing-homes';
//   }
//
//   if (hub === 'respite-care') {
//     sp.toc = 'assisted-living';
//   }
//
//   if (qs && qs['page-number']) {
//     sp['page-number'] = qs['page-number'];
//   }
//
//   return {
//     searchParams: sp,
//   };
// })
//
// @query('searchCommunities', 'getSearchResources')

// class NearMePageContainer extends Component {
//   static propTypes = {
//     setLocation: func,
//     searchParams: object.isRequired,
//     history: object.isRequired,
//     searchCommunities: func,
//     location: object.isRequired,
//     redirectTo: func.isRequired,
//   };
//
//   componentDidMount() {
//     console.log('this.props', this.props);
//   }
//
//
//   handleOnLocationSearch = (result) => {
//     const { searchParams } = this.props;
//     const event = {
//       action: 'submit', category: `nearMeHeroSearch_${searchParams.toc}`, label: result.displayText,
//     };
//     SlyEvent.getInstance().sendEvent(event);
//
//     const { history } = this.props;
//     let joiner = '?';
//
//     if (result.url.includes('?')) {
//       joiner = '&';
//     }
//
//     history.push(`${result.url}${joiner}toc=${searchParams.toc}`);
//   };
//
//   handleCurrentLocation = (addresses, { latitude, longitude }) => {
//     const { searchParams, history } = this.props;
//
//     const event = {
//       action: 'submit', category: `nearMeHeroSearch_${searchParams.toc}`, label: 'currentLocation',
//     };
//     SlyEvent.getInstance().sendEvent(event);
//
//     if (addresses.length) {
//       const path = `/${searchParams.toc}/${generateCityPathSearchUrl(addresses[0])}`; // ?geo=${latitude},${longitude},10`;
//       history.push(path);
//     }
//   };
//
//   render() {
//     const {
//       match,
//     } = this.props;
//
//     const { params } = match;
//     const { hub } = params;
//
//     if (hub === 'nursing-homes') {
//       return (
//         <NursingHomesNearMePage
//           onLocationSearch={this.handleOnLocationSearch}
//           handleAnchor={handleClick}
//         />
//       );
//     }
//     if (hub === 'skilled-nursing-facility') {
//       return (
//         <SNFNearMePage
//           onLocationSearch={this.handleOnLocationSearch}
//           handleAnchor={handleClick}
//         />
//       );
//     }
//     if (hub === 'memory-care') {
//       return (
//         <MemoryCareNearMePage
//           onLocationSearch={this.handleOnLocationSearch}
//           handleAnchor={handleClick}
//         />
//       );
//     }
//     if (hub === 'independent-living') {
//       return (
//         <IndependentLivingNearMePage
//           onLocationSearch={this.handleOnLocationSearch}
//           handleAnchor={handleClick}
//         />
//       );
//     }
//     if (hub === 'senior-living') {
//       return (
//         <SeniorLivingNearMePage
//           onLocationSearch={this.handleOnLocationSearch}
//           handleAnchor={handleClick}
//         />
//       );
//     }
//     if (hub === 'board-and-care-home') {
//       return (
//         <BNCNearMePage
//           onLocationSearch={this.handleOnLocationSearch}
//           handleAnchor={handleClick}
//         />
//       );
//     }
//     if (hub === 'continuing-care-retirement-community') {
//       return (
//         <CCRCNearMePage
//           onLocationSearch={this.handleOnLocationSearch}
//           handleAnchor={handleClick}
//         />
//       );
//     }
//     if (hub === 'in-home-care') {
//       return (
//         <HomeCareNearMePage
//           handleAnchor={handleClick}
//         />
//       );
//     }
//     if (hub === 'respite-care') {
//       return (
//         <RespiteCareNearMePage
//           handleAnchor={handleClick}
//         />
//       );
//     }
//     if (hub === 'veterans-benefit-assisted-living') {
//       return (
//         <VeteransBenefitAssistedLivingPage
//           handleAnchor={handleClick}
//         />
//       );
//     }
//     if (hub === 'active-adult') {
//       return (
//         <ActiveAdultNearMePage
//           onLocationSearch={this.handleOnLocationSearch}
//           handleAnchor={handleClick}
//         />
//       );
//     }
//     return (
//       <AssistedLivingNearMePage
//         onLocationSearch={this.handleOnLocationSearch}
//         handleAnchor={handleClick}
//         onCurrentLocation={this.handleCurrentLocation}
//       />
//     );
//   }
// }
