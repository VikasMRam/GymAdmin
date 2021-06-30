import { useParams } from 'react-router';

import { usePrefetch } from 'sly/web/services/api';

export default function useListing() {
  const { id } = useParams();
  const {
    requestInfo: {
      normalized: listing,
      status: listingStatus,
    },
  } = usePrefetch('getListing', {
    id,
    include: 'similar-listings,agent,community,reviews',
  });

  return {
    listing,
    listingStatus,
  };
}
