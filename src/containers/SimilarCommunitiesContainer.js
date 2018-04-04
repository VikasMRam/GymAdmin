import { reduxForm } from 'redux-form';
import SimilarCommunitiesForm from 'sly/components/organisms/SimilarCommunitiesForm';

export default reduxForm({ 
  form: 'similarCommunities',
  initialValues: {
    similar_tags: [],
    similar_communities: [],
  },
})(SimilarCommunitiesForm);

