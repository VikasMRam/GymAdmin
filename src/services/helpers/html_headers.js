import React from 'react';
import Helmet from 'react-helmet';

import { host } from 'sly/config';
import { tocs } from 'sly/services/helpers/search';
import { titleize } from 'sly/services/helpers/strings';
import { getStateAbbr} from 'sly/services/helpers/url';


const stringifyReplacer = (k, v) => {
  if (k === 'hash' || k === 'key') {
    return undefined;
  }
  return v;
};

const getSDForCommunity = ({
  name, url, address, latitude, longitude, propRatings = {}, startingRate, gallery = {},
}) => {
  const { reviewsValue, numReviews } = propRatings;
  const ld = {};
  ld['@context'] = 'http://schema.org';
  ld['@type'] = 'LodgingBusiness';
  ld.name = name;
  ld.url = `${host}${url}`;

  const addressLd = {};
  addressLd['@type'] = 'PostalAddress';
  addressLd.streetAddress = address.line1;
  addressLd.addressLocality = address.city;
  addressLd.addressRegion = address.state;
  addressLd.addressCountry = address.country;
  ld.address = addressLd;

  const geo = {};
  geo['@type'] = 'GeoCoordinates';
  geo.latitude = latitude;
  geo.longitude = longitude;
  ld.geo = geo;

  if (numReviews && numReviews > 0) {
    const aggregatedRating = {};
    aggregatedRating['@type'] = 'AggregateRating';
    (reviewsValue < 1) ? aggregatedRating.ratingValue = 1 : aggregatedRating.ratingValue = reviewsValue;
    aggregatedRating.ratingCount = numReviews;
    ld.aggregateRating = aggregatedRating;
  }

  if (startingRate > 0) {
    ld.priceRange = `From ${startingRate} per month`;
  }


  let imageUrl = null;
  if (gallery.images && gallery.images.length > 0) {
    imageUrl = gallery.images[0].url;
    const imageObj = {};
    imageObj['@type'] = 'ImageObject';
    imageObj.name = `Front Image for ${name}`;
    imageObj.url = imageUrl;
    ld.image = imageObj;
  }

  return ld;
};

const getSDForSearchResource = ({
                             name, url, addressString, latitude, longitude, imageUrl,
                                  reviewsValue, numReviews, startingRate,
                           }) => {
  const ld = {};
  ld['@context'] = 'http://schema.org';
  ld['@type'] = 'LodgingBusiness';
  ld.name = name;
  ld.url = `${host}/${url}`;

  const addressLd = {};
  addressLd['@type'] = 'PostalAddress';
  let [streetAddress, city, state] = addressString.split(',');
  addressLd.streetAddress = streetAddress;
  addressLd.addressLocality = city;
  addressLd.addressRegion = state;
  addressLd.addressCountry ='US';
  ld.address = addressLd;

  const geo = {};
  geo['@type'] = 'GeoCoordinates';
  geo.latitude = latitude;
  geo.longitude = longitude;
  ld.geo = geo;

  if (numReviews && numReviews > 0) {
    const aggregatedRating = {};
    aggregatedRating['@type'] = 'AggregateRating';
    (reviewsValue < 1) ? aggregatedRating.ratingValue = 1 : aggregatedRating.ratingValue = reviewsValue;
    aggregatedRating.ratingCount = numReviews;
    ld.aggregateRating = aggregatedRating;
  }

  if (startingRate > 0) {
    ld.priceRange = `From $${startingRate} per month`;
  }

  if (imageUrl) {
    const imageObj = {};
    imageObj['@type'] = 'ImageObject';
    imageObj.name = `Front Image for ${name}`;
    imageObj.url = imageUrl;
    ld.image = imageObj;
  }

  return ld;
};

export const getHelmetForSearchPage = ({
  url, city, state, toc, latitude, longitude, listSize, communityList
}) => {
  let actualToc = tocs.find(elem => (elem.value === toc));
  if (typeof actualToc === 'undefined') {
    actualToc = {
      label: 'All Communities',
      value: 'retirement-community',
      segment: 'retirement-community',
      seoLabel: 'Retirement Communities',
    };
  }
  const locationStr = city ? `${titleize(city)}, ${getStateAbbr(state)}` : `${titleize(state)}`;
  const numResultsStr = (listSize && listSize > 5) ? `${listSize}` : 'Best';
  const title = `${numResultsStr} ${actualToc.seoLabel} in ${locationStr} `;
  let description = `${numResultsStr} ${actualToc.seoLabel} in ${locationStr}. Find detailed property information, pricing, reviews & local senior care advice for ${locationStr} ${actualToc.label} communities`;
  if (city) {
    description = `Get pricing & read reviews for ${numResultsStr} ${actualToc.seoLabel} in ${locationStr}. Find detailed property information, photos & talk to local ${titleize(city)} senior living experts.`;
  }
  const canonicalUrl = `${host}${url.pathname}`;
  const ld = {};
  ld['@context'] = 'http://schema.org';
  ld['@type'] = 'Webpage';
  ld.url = canonicalUrl;
  const ldCommunities = [];
  if (communityList.length > 0) {
    communityList.map(e => ldCommunities.push(getSDForSearchResource({ ...e })));
  }


  const ldCity = {};
  if (city) {
    ldCity['@context'] = 'http://schema.org';
    ldCity['@type'] = 'City';
    ldCity.name = titleize(city);
    if (latitude && longitude) {
      const geo = {};
      geo['@type'] = 'GeoCoordinates';
      geo.latitude = latitude;
      geo.longitude = longitude;
      ldCity.geo = geo;
    }
  }


  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta content={description} property="og:description" />
      <meta content={`${title} | Seniorly`} property="og:title" />

      <meta content={description} property="twitter:description" />
      <meta content={`${title} | Seniorly`} property="twitter:title" />
      <link rel="canonical" href={canonicalUrl} />

      {
        url.search && url.search.length > 0 && <meta name="robots" content="noindex"/>
      }

      <script type="application/ld+json">{`${JSON.stringify(ld, stringifyReplacer)}`}</script>
      {ldCommunities.length > 0 &&
        <script type="application/ld+json">{`${JSON.stringify(ldCommunities, stringifyReplacer)}`}</script>
      }
      {city && <script type="application/ld+json">{`${JSON.stringify(ldCity, stringifyReplacer)}`}</script>}
    </Helmet>
  );
};


export const getHelmetForCommunityPage = (community, location) => {
  const {
    name, mainImage, address, propInfo, propRatings, rates, startingRate, url, gallery = {}, videoGallery = {}, reviews, questions,
  } = community;
  const {
    search, pathname,
  } = location;
  const {
    line1, city, state, country, zip, latitude, longitude,
  } = address;
  const { websiteUrl } = propInfo;
  const { numReviews, reviewsValue } = propRatings;

  const ratesProvided = (rates && rates === 'Provided');
  const canonicalUrl = `${host}${pathname}`;

  let toc = tocs.find(elem => (elem.label === propInfo.typeCare[0]));
  if (typeof toc === 'undefined'){
    toc = {
      label: 'Retirement',
      value: 'retirement-community',
      segment: 'retirement-community',
    };
  }
  const title = (ratesProvided ? `${name} - Price starting at $${startingRate}/mo` : `${name} - Pricing, Photos and Floor Plans in ${titleize(address.city)}, ${titleize(address.state)}`);

  const article = ((toc.label === 'Assisted Living ' || toc.label === 'Memory Care') ? 'an' : 'a');

  const description = `${name} is ${article} ${toc.label} community located at ${address.line1} in ${titleize(address.city)}, ${titleize(address.state)}. See pricing, photos & reviews on Seniorly.com!`;

  let imageUrl = null;
  if (gallery.images && gallery.images.length > 0) {
    imageUrl = gallery.images[0].url;
  }
  let videoUrl = null;

  if (videoGallery.videos && videoGallery.videos.length > 0) {
    videoUrl = videoGallery.videos[0].url;
  }

  const ld = getSDForCommunity({ ...community });

  const criticReviews = reviews.filter(review => review.isCriticReview === true);
  const criticReviewsJsonLDs = criticReviews.map((criticReview) => {
    const result = {
      '@context': 'https://schema.org',
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: criticReview.author,
      },
      url: `https://www.seniorly.com${url}`,
      datePublished: criticReview.updatedAt,
      publisher: {
        '@type': 'Organization',
        name: 'Seniorly',
        sameAs: 'https://www.seniorly.com',
      },
      description: criticReview.comments,
      inLanguage: 'en',
      itemReviewed: {
        '@type': 'LocalBusiness',
        name,
        sameAs: websiteUrl,
        image: mainImage,
        address: {
          '@type': 'PostalAddress',
          streetAddress: line1,
          addressLocality: city,
          addressRegion: state,
          postalCode: zip,
          addressCountry: country,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude,
          longitude,
        },
        // telephone: communityPhone, // We use slyPhone as communityProfile, so no need to set
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: reviewsValue,
          bestRating: 5,
          ratingCount: numReviews,
        },
      },
      reviewRating: {
        '@type': 'Rating',
        worstRating: 1,
        bestRating: 5,
        ratingValue: criticReview.value,
      },
    };
    // logic copied from getSDForCommunity
    if (startingRate > 0) {
      result.itemReviewed.priceRange = `From ${startingRate} per month`;
    }
    return (<script type="application/ld+json">{`${JSON.stringify(result, stringifyReplacer)}`}</script>);
  });

  const getQAAnswerLDObj = (answer) => {
    return {
      '@type': 'Answer',
      text: answer.contentData,
      dateCreated: answer.createdAt,
      // upvoteCount: 1337,
      // url: 'https://example.com/question1#acceptedAnswer',
      author: {
        '@type': 'Person',
        name: answer.creator,
      },
    };
  };

  // TODO: Check whether we want to filter out questions without answers
  const qaPageLdObjs = questions.filter(question => question.contents.length > 0).map((question) => {
    const answers = question.contents.slice();
    const firstAnswer = answers.shift();
    const acceptedAnswer = getQAAnswerLDObj(firstAnswer);
    const suggestedAnswer = answers.map(answer => getQAAnswerLDObj(answer));
    const result = {
      '@context': 'https://schema.org',
      '@type': 'QAPage',
      mainEntity: {
        '@type': 'Question',
        name: question.contentData,
        // text: 'I have taken up a new interest in baking and keep running across directions in ounces and pounds. I have to translate between them and was wondering how many ounces are in a pound?',
        answerCount: question.contents.length,
        // upvoteCount: 26,
        dateCreated: question.createdAt,
        author: {
          '@type': 'Person',
          name: question.creator,
        },
        acceptedAnswer,
        suggestedAnswer: suggestedAnswer.length > 0 ? suggestedAnswer : undefined,
      },
    };
    return (<script type="application/ld+json">{`${JSON.stringify(result, stringifyReplacer)}`}</script>);
  });
  // TODO Add Image and Video and structured data.
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta content={description} property="og:description" />
      <meta content={`${title} | Seniorly`} property="og:title" />
      <meta content={url} property="og:url" />
      {imageUrl && <meta content={imageUrl} property="og:image" /> }
      {videoUrl && <meta content={videoUrl} property="og:video" /> }

      <meta content={description} property="twitter:description" />
      <meta content={`${title} | Seniorly`} property="twitter:title" />
      {imageUrl && <meta content={imageUrl} property="twitter:image:src" /> }


      <link rel="canonical" href={canonicalUrl} />
      {
        search && search.length > 0 && <meta name="robots" content="noindex"/>
      }
      <script type="application/ld+json">{`${JSON.stringify(ld, stringifyReplacer)}`}</script>
      {criticReviewsJsonLDs}
      {qaPageLdObjs}
    </Helmet>
  );
};

export const getHelmetForAgentsPage = () => {
  const description = 'Talk to our senior living advisors and partner agents at Seniorly. Connect with a local senior living advisor for personalized senior housing support!';
  return (
    <Helmet>
      <title>Find Senior Living Advisors | Seniorly Partner Agents</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export const getHelmetForPartnersPage = () => {
  return (
    <Helmet>
      <title>Partner Agent Program</title>
    </Helmet>
  );
};

export const getHelmetForAgentProfilePage = ({agent}) => {
  const { info } = agent;
  const {displayName, citiesServed} = info;
  const firstName = displayName.split(' ')[0];
  const firstThreeCities = citiesServed.slice(3).join(', ');
  const description = `Talk to expert senior living advisor ${info.displayName}. ${firstName} helps families find senior housing in ${firstThreeCities}& more locations!`;
  const title = `${info.displayName} Senior Living Advisor | Seniorly Partner Agents`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export const getHelmetForAgentsRegionPage = ({locationName}) => {
  const description = `Talk to local senior living advisors and partner agents in the ${locationName} region. Find a ${locationName} senior living advisor for personalized support!`;
  const title = `${locationName} Senior Living Advisors | Seniorly Partner Agents`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};
