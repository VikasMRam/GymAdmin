import React from 'react';
import { object } from 'prop-types';
import Button from 'sly/components/atoms/Button';
import SlyEvent from 'sly/services/helpers/events';

export default function BackToSearchButtonContainer({ community, ...props }) {
  return (
    <Button
      onClick={() => {
        SlyEvent.getInstance().sendEvent({
          action: 'click',
          category: 'backToSearch',
          label: community.id,
        });
      }}
      {...props}
    />
  );
}
BackToSearchButtonContainer.typeHydrationId = 'BackToSearchButtonContainer';
BackToSearchButtonContainer.propTypes = {
  community: object.isRequired,
};
