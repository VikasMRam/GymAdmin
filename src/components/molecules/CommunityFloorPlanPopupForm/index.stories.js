
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import CommunityFloorPlanPopupForm from 'sly/components/molecules/CommunityFloorPlanPopupForm';
import Modal from 'sly/components/molecules/Modal';
import { withPreventDefault } from 'sly/services/helpers/forms';
import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const { propInfo, floorPlans } = RhodaGoldmanPlaza;
const { typeCare } = propInfo;

const userDetails = {
  fullName: 'Ashley Clark',
  phone: '9999999999',
};

const defaultProps = {
  typeOfCare: typeCare[0],
  floorPlanInfo: floorPlans[3].info,
};

const initialValues = {
  notes: 'Hi Rachel, I would like more info about this Assisted living - 1 bedroom at Sagebrook.',
};

const CommunityFloorPlanPopupFormContainer = reduxForm({
  form: 'CommunityFloorPlanPopupForm',
  destroyOnUnmount: false,
  initialValues,
})(CommunityFloorPlanPopupForm);

storiesOf('Molecules|CommunityFloorPlanPopupForm', module)
  .add('default', () => (
    <Modal isOpen noPadding closeable onClose={action('closed')}>
      <CommunityFloorPlanPopupFormContainer
        {...defaultProps}
        handleSubmit={withPreventDefault(action('form submitted'))}
      />
    </Modal>
  ))
  .add('with User Details', () => (
    <Modal isOpen noPadding closeable onClose={action('closed')}>
      <CommunityFloorPlanPopupFormContainer
        {...defaultProps}
        userDetails={userDetails}
        handleSubmit={withPreventDefault(action('form submitted'))}
      />
    </Modal>
  ));
