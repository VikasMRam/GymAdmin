import React from 'react';
import Helmet from 'react-helmet';

import { tocs } from "sly/services/helpers/search";


export const getHelmetForSearchPage = ( { url, city, state, toc} ) => {
  let actualToc = tocs.find((elem)=> (elem.value === toc));
  let fullTitle = `See Search Results for ${actualToc.label} in ${city}, ${state}, and `;
  let fd = `This is a description for `;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      /*
       OG Description
       */
      <meta content={fd} property="og:description"/>
      <meta content={fullTitle} property="og:title"/>


      <meta content={fd} property="twitter:description"/>
      <meta content={fullTitle} property="twitter:title"/>
      <link rel={"canonical"} href={url}/>

    </Helmet>
  )
};



export const getHelmetForCommunityPage =  (community ) => {
  const { name, address,typeCare } = community;
  let toc = tocs.find((elem)=> (elem.label === typeCare[0]));

  let title = `"#{name} - Pricing & Photos - #{city}, #{state}"`;
  let description =   `${name} ${toc} located at ${address}. See pricing and photos"`;
  // TODO Add Image and Video
  return (
    <Helmet>
      <title>{`${name} - Pricing & Photos`}</title>
      <meta name="description" content={description}/>

    </Helmet>
  )
};

/*
=provide(:title, "#{get_title(@property)} - Seniorly")
=provide(:description, truncate(get_description(@property), length: 160, separator: ' '))
=provide(:page_type, "Community_#{@property.profile_type}")
=content_for :head_content do
  %script{:type => "application/ld+json"}= raw get_prop_sd(@property.api_info)
  -i = get_front_image(@property.search_info, @property.gallery)
  - if i
    %meta{:name=>"twitter:image:src", :content=>"#{i}"}
    %meta{:name=>"og:image", :content=>"#{i}"}
  -if @property.search_info["pCommunityVideo"]
    %meta{:name=>"og:video", :content=>"#{@property.search_info["pCommunityVideo"][0]['url']}"}
 */
