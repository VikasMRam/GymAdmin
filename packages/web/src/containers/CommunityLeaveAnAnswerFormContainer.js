import React, { useCallback } from 'react';
import { reduxForm, SubmissionError } from 'redux-form';
import { string, func, object } from 'prop-types';

import {
  createValidator,
  required,
} from 'sly/web/services/validation';
import CommunityLeaveAnAnswerForm from 'sly/web/components/organisms/CommunityLeaveAnAnswerForm';
import { usePrefetch, useQuery, useUser } from 'sly/web/services/api';

const validate = createValidator({
  answer: [required],
});

const ReduxForm = reduxForm({
  form: 'CommunityLeaveAnAnswerForm',
  validate,
})(CommunityLeaveAnAnswerForm);

const initialValues = {
  answer: '',
};

const CommunityLeaveAnAnswerFormContainer = (props) => {
  const { communitySlug, questionId, onSuccess } = props;

  const { info: { user: { status: userStatus } } } = useUser();

  const { fetch: refetchCommunity } = usePrefetch('getCommunity', {
    id: communitySlug,
    include: 'similar-communities,questions,agents',
  });

  const createAnswer = useQuery('createAnswer');

  const handleOnSubmit = useCallback((values) => {
    const payload = {
      communitySlug,
      questionId,
      answer: values.answer,
    };

    let errorMessage = 'Please Login to Answer this Question';

    if (userStatus === 401) {
      throw new SubmissionError({ answer: errorMessage });
    } else if (userStatus === 200) {
      return createAnswer(payload)
        .then(() => { onSuccess(); refetchCommunity(); })
        .catch(({ body }) => {
          if (body?.errors) {
            errorMessage = body.errors[0].detail;
          } else {
            console.error(body);
          }
          throw new SubmissionError({ answer: errorMessage });
        });
    }
    return null;
  }, [communitySlug, questionId, onSuccess]);

  return (
    <ReduxForm
      initialValues={initialValues}
      onSubmit={handleOnSubmit}
      {...props}
    />
  );
};

CommunityLeaveAnAnswerFormContainer.propTypes = {
  status: object,
  communitySlug: string.isRequired,
  leaveAnAnswer: func,
  onSuccess: func,
  questionId: string,
};

export default CommunityLeaveAnAnswerFormContainer;
