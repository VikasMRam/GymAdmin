import React, { useCallback, useMemo } from 'react';
import { object } from 'prop-types';
import { Redirect } from 'react-router-dom';
import Helmet from 'react-helmet';

import SlyEvent from 'sly/web/services/helpers/events';
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

const generateTocList = content => content
  .filter(({ __component }) => __component.includes('subtitle'))
  .map(({ value: title, subtitleId: id }) => ({ title, id }));

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

  const handleCurrentLocation = useCallback((addresses, { /* latitude, longitude **/ }) => {
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

  return (
    <>
      <Helmet>
        <title>{result[0].title}</title>
        <meta name="description" content={result[0].description} />
        {faqs && faqPage(faqs)}
        {tocSiteNavigationLD(`https://www.seniorly.com/${match.params.hub}`, generateTocList(result[0].content))}
        {guideLD(result[0].title, result[0].description, `https://www.seniorly.com/${match.params.hub}`)}
      </Helmet>

      <HubHeader
        imagePath={result?.[0]?.mainImg?.path}
        toc={result[0].toc || result[0].title.toLowerCase()}
        heading={result[0].title}
        label={result[0].subTitle}
        showSearch={result[0].showSearch}
        onCurrentLocation={handleCurrentLocation}
        onLocationSearch={handleOnLocationSearch}
        mobileBGGradientPalette={result[0].headerGradientPalette}
        mobileBGGradientVariation={result[0].headerGradientVariation}
        laptopBBGradientPalette={result[0].headerGradientPalette}
        laptopBBGradientVariation={result[0].headerGradientVariation}
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
