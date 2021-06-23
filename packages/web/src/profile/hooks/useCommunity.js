import { usePrefetch } from 'sly/web/services/api';

export default function useCommunity({ communitySlug, shouldBail }) {
  const {
    requestInfo: {
      normalized: community,
      status: communityStatus,
      headers: { location: communityLocation },
      ...requestInfo
    },
  } = usePrefetch('getCommunity', {
    id: communitySlug,
    include: 'similar-communities,questions,agents',
  }, { shouldBail });

  return {
    community,
    communityStatus,
    communityLocation,
    requestInfo,
  };
}
