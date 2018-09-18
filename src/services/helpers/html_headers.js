import React from 'react';
import Helmet from 'react-helmet';

import { host } from 'sly/config';
import { tocs } from 'sly/services/helpers/search';
import { titleize } from 'sly/services/helpers/strings';


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
    aggregatedRating.ratingValue = reviewsValue;
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
    aggregatedRating.ratingValue = reviewsValue;
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
  url, city, state, toc, listSize, communityList
}) => {
  let actualToc = tocs.find(elem => (elem.value === toc));
  if (typeof actualToc === 'undefined'){
    actualToc = {
      label: 'All Communities',
      value: 'retirement-community',
      segment: 'retirement-community',
    };
  }

  let locationStr = city ? `${titleize(city)}, ${titleize(state)}` : `${titleize(state)}`;
  let numResultsStr = (listSize && listSize > 0) ? `${listSize} results` : `results`;
  const title = `${actualToc.label} in ${locationStr} - Price & Compare ${numResultsStr} `;

  const description = `Find ${numResultsStr} for ${actualToc.label} in  ${locationStr}. Get pricing information, see picture, read reviews and get help from local senior care service experts.`;
  const canonicalUrl = `${host}${url.pathname}`;
  const ld = {};
  ld['@context'] = 'http://schema.org';
  ld['@type'] = 'Webpage';
  ld['@headline'] = title;
  ld.url = canonicalUrl;
  const ldCommunities = [];
  if (communityList.length > 0) {
    communityList.map(e => ldCommunities.push(getSDForSearchResource({ ...e })));
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
    </Helmet>
  );
};


export const getHelmetForCommunityPage = (community) => {
  const {
    name, address, propInfo, url, gallery = {}, videoGallery = {},
  } = community;
  let toc = tocs.find(elem => (elem.label === propInfo.typeCare[0]));
  if (typeof toc === 'undefined'){
    toc = {
      label: 'All Communities',
      value: 'retirement-community',
      segment: 'retirement-community',
    };
  }
  const title = `${name} - Pricing, Photos and Floor Plans in ${titleize(address.city)}, ${titleize(address.state)}`;
  const description = `${name} ${toc ? toc.label : ''} located at ${address.line1} in ${titleize(address.city)}, ${titleize(address.state)}. See pricing and photos"`;
  let imageUrl = null;
  if (gallery.images && gallery.images.length > 0) {
    imageUrl = gallery.images[0].url;
  }
  let videoUrl = null;

  if (videoGallery.videos && videoGallery.videos.length > 0) {
    videoUrl = videoGallery.videos[0].url;
  }

  const ld = getSDForCommunity({ ...community });

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


      <link rel="canonical" href={url} />
      <script type="application/ld+json">{`${JSON.stringify(ld, stringifyReplacer)}`}</script>
    </Helmet>
  );
};

