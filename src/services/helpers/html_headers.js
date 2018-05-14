import React from 'react';
import Helmet from 'react-helmet';

import { host } from 'sly/config';
import { tocs } from "sly/services/helpers/search";




export const getHelmetForSearchPage = ( { url, city, state, toc} ) => {
  let actualToc = tocs.find((elem)=> (elem.value === toc));
  let title = `See Search Results for ${actualToc.label} in ${city}, ${state}, and `;
  let description = `Seniorly offers a comprehensive data search where we help maintain `;
  let c_url = `${host}/${url.path}`;
  let ld = {};
  ld["@context"] = "http://schema.org";
  ld["@type"] = "Webpage";
  ld["@headline"] = title;
  ld["url"] = c_url;

  return (
    <Helmet>
      <title>{title}</title>
      /*
       OG Description
       */
      <meta content={description} property="og:description"/>
      <meta content={title} property="og:title"/>
      /**
       Twitter description and title
      */
      <meta content={description} property="twitter:description"/>
      <meta content={title} property="twitter:title"/>
      <link rel={"canonical"} href={c_url}/>
      <script type={"application/ld+json"}>{`${JSON.stringify(ld,stringifyReplacer)}`}</script>

    </Helmet>
  )
};

let stringifyReplacer = (k,v)=>{
  if (k === 'hash' || k === 'key') {
    return undefined;
  }
  return v;
};

export const getHelmetForCommunityPage =  (community ) => {
  const { name, address, propInfo, url } = community;
  let toc = tocs.find((elem)=> (elem.label === propInfo.typeCare[0]));
  let title = `${name} - Pricing, Photos and Floor Plans`;
  let description =   `${name} ${toc} located at ${address}. See pricing and photos"`;

  let ld = getSDForCommunity({...community});

  // TODO Add Image and Video and structured data.
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description}/>
      /*
       OG Description
       */
      <meta content={description} property="og:description"/>
      <meta content={title} property="og:title"/>
      /**
       Twitter description and title
      */
      <meta content={description} property="twitter:description"/>
      <meta content={title} property="twitter:title"/>
      <link rel={"canonical"} href={url}/>
      <script type={"application/ld+json"}>{`${JSON.stringify(ld,stringifyReplacer)}`}</script>
    </Helmet>
  )
};

let getSDForCommunity = ( { name, url, address, latitude, longitude, reviewsValue, reviewsCount, size  }) =>{
  let ld = {};
  ld["@context"] = "http://schema.org";
  ld["@type"] = "LodgingBusiness";
  ld["name"] = name;
  ld["url"] =`${host}/${url}`;

  let addressLd = {};
  addressLd["@type"] = "PostalAddress";
  addressLd["streetAddress"] = address.line1;
  addressLd["addressLocality"] = address.city;
  addressLd["addressRegion"] = address.state;
  addressLd["addressCountry"] = address.country;
  ld["address"] =addressLd;

  let geo = {};
  geo["@type"] = "GeoCoordinates";
  geo["latitude"] = latitude;
  geo["longitude"] = longitude;
  ld["geo"] = geo;

  let aggregatedRating = {};
  aggregatedRating["@type"] = "AggregatedRating";
  aggregatedRating["ratingValue"]= reviewsValue;
  aggregatedRating["ratingCount"] = reviewsCount;
  ld["aggregatedRating"] = aggregatedRating;
  //TODO Price Range and Description
  ld["priceRange"] = "TODO";

  return ld;
};
