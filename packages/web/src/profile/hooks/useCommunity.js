import { useParams } from 'react-router';

import { usePrefetch } from 'sly/web/services/api';

export default function useCommunity() {
  const { communitySlug } = useParams();
  const {
    requestInfo: {
      normalized: community,
      status: communityStatus,
      headers: { location: communityLocation },
    },
  } = usePrefetch('getCommunity', {
    id: communitySlug,
    include: 'similar-communities,questions,agents',
  });

  return {
    community,
    communityStatus,
    communityLocation,
  };
}
