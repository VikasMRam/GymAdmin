import React from 'react';
import { string } from 'prop-types';
import Button from 'sly/components/atoms/Button';
import SlyEvent from 'sly/services/helpers/events';

export default function BackToSearchButtonContainer({ communityId, ...props }) {
  return (
    <Button
      onClick={() => {
        SlyEvent.getInstance().sendEvent({
          action: 'click',
          category: 'backToSearch',
          label: communityId,
        });
      }}
      {...props}
    />
  );
}
BackToSearchButtonContainer.typeHydrationId = 'BackToSearchButtonContainer';
BackToSearchButtonContainer.propTypes = {
  communityId: string.isRequired,
};
