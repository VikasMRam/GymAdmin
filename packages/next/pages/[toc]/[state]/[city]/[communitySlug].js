import CommunityDetailPageContainer from 'sly/web/profile/CommunityDetailPageContainer';
import { createApiClient } from 'sly/web/services/api';

// export default function CommunityDetailPage ({ community }) {
//   return (
//     <h1>
//       {community.name}
//     </h1>
//   );
// };

export default CommunityDetailPageContainer;

export async function getStaticProps({ params }) {
  const { api, store } = createApiClient();

  const placeholders = {
    id: params.communitySlug,
    include: 'similar-communities,questions,agents',
  };
  await store.dispatch(api.getCommunity.asAction(placeholders));

  return {
    props: {
      initialApiState: store.getState(),
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

