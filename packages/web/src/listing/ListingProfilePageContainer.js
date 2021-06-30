import React from 'react';
import { Redirect } from 'react-router-dom';
import { useLocation } from 'react-router';

import ListingProfilePage from './ListingProfilePage';

import useListing from 'sly/web/listing/hooks/useListing';
import { getLastSegment, replaceLastSegment } from 'sly/web/services/helpers/url';
import { Image, Flex } from 'sly/common/system';
import { assetPath } from 'sly/web/components/themes';


const ListingProfilePageContainer = () => {
  const location = useLocation() || {};

  const {
    listing,
    listingStatus,
  } = useListing();


  if (listingStatus === 404) {
    return <Redirect to={replaceLastSegment(location.pathname)} />;
  }

  if (!listing || !location.pathname.includes(listing.id)) {
    return (
      <Flex
        height="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <Image src={assetPath('images/homebase/loader.svg')} />
      </Flex>);
  }

  // If request url does not match resource url from api, perform 302 redirect
  if (location.pathname !== listing.url && location.pathname.includes(listing.id)) {
    return <Redirect to={listing.url} />;
  }

  return (
    <ListingProfilePage
      listing={listing}
      location={location}
    />
  );
};


export default ListingProfilePageContainer;

