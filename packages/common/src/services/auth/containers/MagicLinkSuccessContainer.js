/* eslint-disable camelcase */
import React from 'react';
import { string } from 'prop-types';

import { useNotification } from 'sly/web/components/helpers/notification';
import { useAuth } from 'sly/web/services/api/withAuth';
import MagicLinkSuccess from 'sly/common/services/auth/components/MagicLink/MagicLinkSuccess';

const MagicLinkSuccessContainer = ({ email, redirect_to, ...props }) => {
  const { magicLink } = useAuth();
  const { notifyError, notifyInfo } = useNotification();

  const resendEmail = () => {
    magicLink({ email, redirect_to }).then(() => {
      notifyInfo('New magic link sent.');
    }).catch(() => {
      notifyError('Error sending magic link. Please try again');
    });
  };


  return (
    <MagicLinkSuccess resendEmail={resendEmail} email={email} {...props} />
  );
};

MagicLinkSuccessContainer.propTypes = {
  email: string,
  redirect_to: string,
};


export default MagicLinkSuccessContainer;
