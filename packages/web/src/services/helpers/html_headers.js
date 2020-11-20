import React from 'react';
import Helmet from 'react-helmet';
import { string, arrayOf } from 'prop-types';

import { host } from 'sly/web/config';
import { tocs } from 'sly/web/services/helpers/search';
import { titleize } from 'sly/web/services/helpers/strings';
import { getStateAbbr, getCitySearchUrl } from 'sly/web/services/helpers/url';
import { getImagePath } from 'sly/web/services/images';
import { assetPath } from 'sly/web/components/themes';

const stringifyReplacer = (k, v) => {
  if (k === 'hash' || k === 'key') {
    return undefined;
  }
  return v;
};

const getSDForCommunity = ({
  name, url, address, propRatings = {}, startingRate, gallery = {}, propInfo = {},
}) => {
  const { reviewsValue, numReviews } = propRatings;
  const { communityPhone,
    communityHighlights,
    personalSpace,
    communitySpace,
    nonCareServices,
    languages, } = propInfo;

  const ld = {};
  ld['@context'] = 'http://schema.org';
  ld['@type'] = 'LodgingBusiness';
  ld.name = name;
  ld.url = `${host}${url}`;
  ld.telephone = communityPhone;

  const addressLd = {};
  addressLd['@type'] = 'PostalAddress';
  addressLd.streetAddress = address.line1;
  addressLd.addressLocality = address.city;
  addressLd.addressRegion = address.state;
  addressLd.addressCountry = address.country;
  ld.address = addressLd;

  const geo = {};
  geo['@type'] = 'GeoCoordinates';
  geo.latitude = address.latitude;
  geo.longitude = address.longitude;
  ld.geo = geo;

  if (numReviews && numReviews > 0) {
    const aggregatedRating = {};
    aggregatedRating['@type'] = 'AggregateRating';
    (reviewsValue < 1) ? aggregatedRating.ratingValue = 1 : aggregatedRating.ratingValue = reviewsValue;
    aggregatedRating.ratingCount = numReviews;
    ld.aggregateRating = aggregatedRating;
  }

  if (startingRate > 0) {
    ld.priceRange = `From $${startingRate.toLocaleString()} per month`;
  }


  let imageUrl = null;
  if (gallery.images && gallery.images.length > 0) {
    imageUrl = getImagePath(encodeURI(gallery.images[0].path.replace(/\.jpe?g$/i, '.jpg')));
    const imageObj = {};
    imageObj['@type'] = 'ImageObject';
    imageObj.name = `Front Image for ${name}`;
    imageObj.url = imageUrl;
    ld.image = imageObj;
  }

  // https://schema.org/amenityFeature
  let amenities = [];
  if (communityHighlights) {
    amenities = amenities.concat(communityHighlights)
  }
  if (personalSpace) {
    amenities = amenities.concat(personalSpace)
  }
  if (communitySpace) {
    amenities = amenities.concat(communitySpace)
  }
  if (nonCareServices) {
    amenities = amenities.concat(nonCareServices)
  }
  if (languages) {
    amenities = amenities.concat(languages)
  }
  if (amenities.length > 0 ) {
    ld.amenityFeature = amenities.map(amenity => ({
      '@type': 'LocationFeatureSpecification',
      name: amenity,
      value: 'True',
    }));

  }

  return ld;
};

const getSDForSearchResource = ({
  name, url, addressString, latitude, longitude, gallery,
  reviewsValue, numReviews, startingRate,
}) => {
  // Uses LodgingBusiness schema type
  const ld = {};
  ld['@context'] = 'http://schema.org';
  ld['@type'] = 'LodgingBusiness';
  ld.name = name;
  ld.url = `${host}${url}`;

  const addressLd = {};
  addressLd['@type'] = 'PostalAddress';
  const [streetAddress, city, state] = addressString.split(',');
  addressLd.streetAddress = streetAddress;
  addressLd.addressLocality = city;
  addressLd.addressRegion = state;
  addressLd.addressCountry = 'US';
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
    ld.priceRange = `From $${startingRate.toLocaleString()} per month`;
  }

  if (gallery && gallery.images && gallery.images.length > 0) {
    const imageObj = {};
    imageObj['@type'] = 'ImageObject';
    imageObj.name = `Front Image for ${name}`;
    const [image] = gallery.images;
    imageObj.url = getImagePath(encodeURI(image.path.replace(/\.jpe?g$/i, '.jpg')));

    ld.image = imageObj;
  }

  return ld;
};

export const getHelmetForSearchPage = ({
  url, city, state, toc, latitude, longitude, listSize, communityList, geoGuide,
}) => {
  let actualToc = tocs.find(elem => (elem.value === toc));
  if (typeof actualToc === 'undefined') {
    actualToc = {
      label: 'Nursing Homes',
      value: 'nursing-homes',
      segment: 'nursing-homes',
      seoLabel: 'Nursing Homes',
    };
  }

  const guideContent = geoGuide.guideContent || {};
  const { seoTitle, seoDescription } = guideContent;

  const locationStr = city ? `${titleize(city)}, ${getStateAbbr(state)}` : `${titleize(state)}`;
  const numResultsStr = (listSize && listSize < 15) ? `THE BEST ${listSize}` : 'THE BEST 15';
  const title = seoTitle || `${numResultsStr} ${actualToc.seoLabel} in ${locationStr} `;

  let description = seoDescription || (city ? `Get pricing & read reviews for ${numResultsStr} ${actualToc.seoLabel} in ${locationStr}. Find detailed property information, photos & talk to local ${titleize(city)} senior living experts.` :
    `${numResultsStr} ${actualToc.seoLabel} in ${locationStr}. Find detailed property information, pricing, reviews & local senior care advice for ${locationStr} ${actualToc.label} communities`);

  if (toc === 'nursing-homes') {
    description = `Search nursing homes in ${locationStr} that range from assisted living facilities, memory care communities and other retirement living options. Compare cost, property highlights and more.`;
  }

  if (toc === 'skilled-nursing-facility') {
    description = `Search skilled nursing facilities in ${locationStr}. Learn about medicare and medicaid options, property highlights and more.`;
  }

  const ld = {};
  ld['@context'] = 'http://schema.org';
  ld['@type'] = 'Webpage';
  ld.url = `${host}${url}`;
  ld.inLanguage = 'EN-US';
  ld.author = author();
  ld.audience = audience();
  ld.name = title;
  ld.description = description;

  const ldIL = {};
  ldIL['@context'] = 'http://schema.org';
  ldIL['@type'] = 'ItemList';
  ldIL.name = title;
  ldIL.description = description;
  // not setting host in this page, as it clashes with Breadcrumbs url in local. should be fine in prod, as url is relative
  ldIL.url = `${url.pathname}`;
  ldIL.itemListElement = [];
  ldIL.numberOfItems = communityList.length;

  const communityUrls = [];
  if (communityList.length > 0) {
    communityList.map((e, index) => {
      const { name, url, gallery } = e;
      communityUrls.push(`${host}${url}`);
      let imageUrl = null;
      if (gallery && gallery.images && gallery.images.length > 0) {
        const [image] = gallery.images;
        imageUrl = getImagePath(encodeURI(image.path.replace(/\.jpe?g$/i, '.jpg')));
      }
      const ldLI = {
        '@type': 'ListItem',
        position: index + 1,
        url: `${url}`,
        image: {
          '@type': 'ImageObject',
          name,
          url: imageUrl,
        },
      };
      return ldIL.itemListElement.push(ldLI);
      // return ldCommunities.push(getSDForSearchResource({ ...e }));
    });
  }

  ld.significantLink = communityUrls.join(', ');

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

  let noindex = false;
  if ((url.search && url.search.length > 0) || (listSize && listSize <= 3)) {
    noindex = true;
  }


  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta content={description} property="og:description" />
      <meta content={`${title} | Seniorly`} property="og:title" />

      <meta content={description} property="twitter:description" />
      <meta content={`${title} | Seniorly`} property="twitter:title" />

      {
        noindex && <meta name="robots" content="noindex" />
      }

      <script type="application/ld+json">{`${JSON.stringify(ld, stringifyReplacer)}`}</script>
      {ldIL.itemListElement.length > 0 &&
        <script type="application/ld+json">{`${JSON.stringify(ldIL, stringifyReplacer)}`}</script>
      }
      {city && <script type="application/ld+json">{`${JSON.stringify(ldCity, stringifyReplacer)}`}</script>}
    </Helmet>
  );
};


export const getHelmetForCommunityPage = (community, location) => {
  const {
    name, mainImage, address, propInfo, propRatings, similarProperties, startingRate, url, gallery = {}, videoGallery = {}, reviews, questions,
  } = community;
  const { search } = location;
  const {
    line1, city, state, country, zip, latitude, longitude,
  } = address;
  const { websiteUrl, websiteTitle, websiteMetaDescription, communityPhone } = propInfo;
  const { numReviews, reviewsValue } = propRatings;

  // const ratesProvided = (rates && rates === 'Provided' && startingRate > 0);

  let toc = tocs.find(elem => (elem.label === propInfo.typeCare[0]));
  if (typeof toc === 'undefined') {
    toc = {
      label: 'Nursing Homes',
      value: 'nursing-homes',
      segment: 'nursing-homes',
    };
  }

  const title = websiteTitle || `${name} - Pricing, Photos and Floor Plans in ${titleize(address.city)}, ${titleize(address.state)}`;

  const article = ((toc.label === 'Assisted Living' || toc.label === 'Independent Living') ? 'an' : 'a');

  const description = websiteMetaDescription || `${name} is ${article} ${toc.label} community located at ${address.line1} in ${titleize(address.city)}, ${titleize(address.state)}. See pricing, photos & reviews on Seniorly.com!`;

  let imageUrl = null;
  if (gallery.images && gallery.images.length > 0) {
    imageUrl = gallery.images[0].url;
  }
  let videoUrl = null;

  if (videoGallery.videos && videoGallery.videos.length > 0) {
    videoUrl = videoGallery.videos[0].url;
  }

  const ldWP = {};
  ldWP['@context'] = 'http://schema.org';
  ldWP['@type'] = 'Webpage';
  ldWP.url = `${host}${url}`;
  ldWP.inLanguage = 'EN-US';
  ldWP.author = author();
  ldWP.audience = audience();
  ldWP.name = title;
  ldWP.description = description;
  ldWP.hasPart = 'CollectionPage';

  let significantLinks = [];
  const spUrls = similarProperties.map(p => `${host}${p.url}`);
  significantLinks = significantLinks.concat(spUrls);
  const searchPageUrl = getCitySearchUrl({ propInfo, address });
  significantLinks.push(`${host}${searchPageUrl}`);
  ldWP.significantLink = significantLinks.join(', ');

  const ld = getSDForCommunity({ ...community });

  const criticReviewsJsonLDs = reviews && reviews.filter(review => review.isCriticReview === true).map((criticReview) => {
    const result = {
      '@context': 'https://schema.org',
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: criticReview.author,
      },
      url: `${host}${url}`,
      datePublished: criticReview.updatedAt,
      publisher: {
        '@type': 'Organization',
        name: 'Seniorly',
        sameAs: host,
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
        telephone: communityPhone,
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
      result.itemReviewed.priceRange = `From $${startingRate.toLocaleString()} per month`;
    }
    return (<script key={`helmet_critic-review_${criticReview.author + name}`} type="application/ld+json">{`${JSON.stringify(result, stringifyReplacer)}`}</script>);
  });


  const getQAAnswerLDObj = (answer, question) => {
    return {
      '@type': 'Answer',
      text: answer.contentData,
      dateCreated: answer.createdAt,
      upvoteCount: 1,
      url: `${host}/resources/questions/${question.url}`,
      author: {
        '@type': 'Person',
        name: answer.creator,
      },
    };
  };

  // TODO: Check whether we want to filter out questions without answers
  const qaPageLdObjs = questions && questions.filter(question => question.contents.length > 0).map((question) => {
    const answers = question.contents.slice();
    const firstAnswer = answers.shift();
    const acceptedAnswer = getQAAnswerLDObj(firstAnswer, question);
    const suggestedAnswer = answers.map(answer => getQAAnswerLDObj(answer, question));
    const result = {
      '@context': 'https://schema.org',
      '@type': 'QAPage',
      mainEntity: {
        '@type': 'Question',
        name: question.contentData,
        text: question.contentData,
        answerCount: question.contents.length,
        upvoteCount: 1,
        dateCreated: question.createdAt,
        author: {
          '@type': 'Person',
          name: question.creator,
        },
        acceptedAnswer,
        suggestedAnswer: suggestedAnswer.length > 0 ? suggestedAnswer : undefined,
      },
    };
    return (<script key={`helmet_question_${question.creator + question.createdAt}`} type="application/ld+json">{`${JSON.stringify(result, stringifyReplacer)}`}</script>);
  });

  const webPageLD = {};
  webPageLD['@context'] = 'http://schema.org';
  webPageLD['@type'] = 'Webpage';
  webPageLD.url = `${host}${url}`,
  webPageLD.inLanguage = 'EN-US';
  webPageLD.author = author();
  webPageLD.audience = audience();
  webPageLD.name = title;
  webPageLD.description = description;


  // https://schema.org/ShareAction
  const shareActionLD = {};
  shareActionLD['@context'] = 'http://schema.org';
  shareActionLD['@type'] = 'ShareAction';
  shareActionLD.object = {
    '@type': 'LodgingBusiness',
    name,
    url: `${host}${url}`,
    image: ld.image,
    address: ld.address,
    priceRange: ld.priceRange,
    telephone: ld.telephone,
  };

  // https://schema.org/Map
  // https://schema.org/docs/hotels.html
  ld.hasMap = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  // https://schema.org/MediaGallery
  // https://github.com/schemaorg/schemaorg/issues/1769
  let imagesLD = null;
  if (gallery.images && gallery.images.length > 0) {
    imagesLD = {
      '@context': 'http://schema.org',
      '@type': 'CollectionPage',
      '@id': `${host}${url}`,
      url: `${host}${url}`,
      isPartOf: `${host}${url}`,
      description: `Images for ${name}`,
      mainEntityOfPage: {
        '@type': 'ImageGallery',
        image: gallery.images.map((image) => {
          return {
            '@type': 'ImageObject',
            url: getImagePath(encodeURI(image.path.replace(/\.jpe?g$/i, '.jpg'))),
          };
        }),
      },
    };
  }

  // https://schema.org/VideoObject
  // https://developers.google.com/search/docs/data-types/video
  // Data from src/components/organisms/HowSlyWorksVideo/index.js
  const videoObjectLD = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'How Seniorly Works',
    description: 'This Video explains you how Seniorly Works',
    thumbnailUrl: [
      'https://d354o3y6yz93dt.cloudfront.net/images/768x512/react-assets/how-sly-works-video-thumbnail.jpg',
    ],
    uploadDate: '2020-03-04T08:00:00+08:00', // Date on which the component was created on S3
    // duration: 'PT1M54S',
    contentUrl: 'https://d1qiigpe5txw4q.cloudfront.net/appassets/hiw_captions.mp4',
    // embedUrl: 'https://www.example.com/embed/123',
    // interactionStatistic: {
    //   '@type': 'InteractionCounter',
    //   interactionType: { '@type': 'http://schema.org/WatchAction' },
    //   userInteractionCount: 5647018
    // },
  };

  // TODO Add Image and Video and structured data.
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta content="Seniorly" property="author" />
      <meta content="English" property="language" />
      <link rel="canonical" href={url} />

      <meta content={description} property="og:description" />
      <meta content={`${title} | Seniorly`} property="og:title" />
      <meta content={url} property="og:url" />
      {imageUrl && <meta content={imageUrl} property="og:image" /> }
      {videoUrl && <meta content={videoUrl} property="og:video" /> }

      <meta content={description} property="twitter:description" />
      <meta content={`${title} | Seniorly`} property="twitter:title" />
      {imageUrl && <meta content={imageUrl} property="twitter:image:src" /> }
      <link rel="shortcut icon" type="image/x-icon" href={assetPath('favicon.ico')} />

      <script type="application/ld+json">{`${JSON.stringify(ld, stringifyReplacer)}`}</script>
      <script type="application/ld+json">{`${JSON.stringify(ldWP, stringifyReplacer)}`}</script>
      <script type="application/ld+json">{`${JSON.stringify(shareActionLD, stringifyReplacer)}`}</script>
      {imagesLD && <script type="application/ld+json">{`${JSON.stringify(imagesLD, stringifyReplacer)}`}</script>}
      <script type="application/ld+json">{`${JSON.stringify(videoObjectLD, stringifyReplacer)}`}</script>
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
      <meta name="description" content="Seniorly partners with over 300 Local Senior Living Experts nationwide who provide a personalized approach to finding pricing, availability, amenities and more for thousands of senior care communities." />
    </Helmet>
  );
};

export const getHelmetForCommunityPartnersPage = () => {
  return (
    <Helmet>
      <title>Senior Housing Rental Advertising & Marketing</title>
      <meta name="description" content="Create and manage your community profile &amp; inventory that is listed on Seniorly." />
    </Helmet>
  );
};

export const getHelmetForAgentProfilePage = ({ agent }) => {
  const { info } = agent;
  const { displayName, citiesServed } = info;
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

export const getHelmetForAgentsRegionPage = ({ locationName }) => {
  const description = `Talk to local senior living advisors and partner agents in the ${locationName} region. Find a ${locationName} senior living advisor for personalized support!`;
  const title = `${locationName} Senior Living Advisors | Seniorly Partner Agents`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export const faqPage = (faqs) => {
  const ld = {};
  ld['@context'] = 'http://schema.org';
  ld['@type'] = 'FAQPage';
  const ldFAQs = [];
  if (faqs.length > 0) {
    faqs.map(e => ldFAQs.push(questionLD(e)));
  }
  ld.mainEntity = ldFAQs;
  return (<script type="application/ld+json">{`${JSON.stringify(ld, stringifyReplacer)}`}</script>);
};

const questionLD = (faq) => {
  const question = {};
  question['@type'] = 'Question';
  question.name = faq.question;
  const answer = {};
  answer['@type'] = 'Answer';
  answer.text = faq.answer;
  question.acceptedAnswer = answer;
  return question;
};

export const tocSiteNavigationLD = (baseUrl, links) => {
  const ld = {};
  ld['@context'] = 'http://schema.org';
  const ldLinks = [];
  if (links.length > 0) {
    links.map(e => ldLinks.push(
      {
        '@context': 'https://schema.org',
        '@type': 'SiteNavigationElement',
        '@id': baseUrl,
        name: e.title,
        url: `${baseUrl}#${e.id}`,
      },
    ));
  }
  ld['@graph'] = ldLinks;
  return (<script type="application/ld+json">{`${JSON.stringify(ld, stringifyReplacer)}`}</script>);
};

export const guideLD = (title, description, url) => {
  const ld = {};
  ld['@context'] = 'http://schema.org';
  ld['@type'] = 'Guide';
  ld.headline = title;
  ld.description = description;
  ld.url = url;
  ld.audience = audience();
  ld.author = author();
  return (<script type="application/ld+json">{`${JSON.stringify(ld, stringifyReplacer)}`}</script>);
};

const author = () => {
  return {
    '@type': 'Organization',
    name: 'Seniorly Inc.',
  };
};

const audience = () => {
  return {
    '@type': 'Audience',
    name: 'Care Givers, Seniors, Adult Children, Senior Care Providers, Senior Housing',
  };
};

export const getHelmetForHomePage = ({ canonicalUrl, significantLinks }) => {
  const ld = {};
  ld['@context'] = 'http://schema.org';
  ld['@type'] = 'Webpage';
  ld.url = host;
  ld.inLanguage = 'EN-US';
  ld.author = author();
  ld.audience = audience();
  ld.contentLocation = {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'San Francisco',
      addressRegion: 'CA',
    },
  };
  ld.significantLink = significantLinks.map(link => `${host}${link}`).join(', ');
  return (
    <Helmet>
      <title>Assisted Living Cost & Reviews | Senior Living Advisors</title>
      <meta name="description" content="Find the best assisted living and other senior living like nursing homes, memory care, respite care, CCRC, skilled nursing facilities, independent living and more." />
      <link rel="canonical" href={canonicalUrl} />
      <script type="application/ld+json">{`${JSON.stringify(ld, stringifyReplacer)}`}</script>
    </Helmet>
  );
};

getHelmetForHomePage.propTypes = {
  canonicalUrl: string.isRequired,
  significantLinks: arrayOf(string).isRequired,
};
